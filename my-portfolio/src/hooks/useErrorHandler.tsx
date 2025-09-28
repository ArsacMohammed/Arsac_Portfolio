import { useState, useCallback, useRef } from 'react'
import { 
  logError, 
  createErrorDetails, 
  getUserFriendlyError, 
  ErrorRecovery,
  withErrorHandling,
  type UserFriendlyError 
} from '../lib/errorHandling'

export interface AsyncState<T = any> {
  data: T | null
  loading: boolean
  error: Error | null
  userFriendlyError: UserFriendlyError | null
  retryCount: number
  canRetry: boolean
}

export interface UseErrorHandlerOptions {
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error, userFriendlyError: UserFriendlyError) => void
  onRetry?: (retryCount: number) => void
  onSuccess?: (data: any) => void
  enableAutoRetry?: boolean
  logErrors?: boolean
}

export interface UseErrorHandlerReturn<T = any> {
  state: AsyncState<T>
  execute: <R = T>(asyncFn: () => Promise<R>) => Promise<R | null>
  retry: () => Promise<void>
  reset: () => void
  clearError: () => void
  handleError: (error: Error) => void
  wrapAsync: <F extends (...args: any[]) => Promise<any>>(fn: F) => F
}

export function useErrorHandler<T = any>(
  options: UseErrorHandlerOptions = {}
): UseErrorHandlerReturn<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRetry,
    onSuccess,
    enableAutoRetry = false,
    logErrors = true
  } = options

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
    userFriendlyError: null,
    retryCount: 0,
    canRetry: true
  })

  const lastAsyncFnRef = useRef<(() => Promise<any>) | null>(null)
  const errorIdRef = useRef<string | null>(null)

  const handleError = useCallback((error: Error) => {
    const userFriendlyError = getUserFriendlyError(error)
    const errorDetails = createErrorDetails(error, 'async')
    
    if (logErrors) {
      logError(errorDetails)
    }

    errorIdRef.current = errorDetails.errorId

    setState(prev => ({
      ...prev,
      loading: false,
      error,
      userFriendlyError,
      canRetry: prev.retryCount < maxRetries
    }))

    if (onError) {
      onError(error, userFriendlyError)
    }
  }, [maxRetries, onError, logErrors])

  const execute = useCallback(async <R = T,>(
    asyncFn: () => Promise<R>
  ): Promise<R | null> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      userFriendlyError: null
    }))

    lastAsyncFnRef.current = asyncFn

    try {
      const result = await asyncFn()
      
      setState(prev => ({
        ...prev,
        data: result as T,
        loading: false,
        error: null,
        userFriendlyError: null,
        retryCount: 0
      }))

      if (errorIdRef.current) {
        ErrorRecovery.resetRetries(errorIdRef.current)
        errorIdRef.current = null
      }

      if (onSuccess) {
        onSuccess(result)
      }
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      if (enableAutoRetry && state.retryCount < maxRetries) {
        setTimeout(() => {
          retry()
        }, retryDelay * Math.pow(2, state.retryCount))
      } else {
        handleError(err)
      }
      return null
    }
  }, [state.retryCount, maxRetries, retryDelay, enableAutoRetry, handleError, onSuccess])

  const retry = useCallback(async (): Promise<void> => {
    if (!lastAsyncFnRef.current || state.retryCount >= maxRetries) {
      return
    }
    setState(prev => ({
      ...prev,
      retryCount: prev.retryCount + 1,
      loading: true,
      error: null,
      userFriendlyError: null
    }))

    if (errorIdRef.current) {
      ErrorRecovery.recordRetry(errorIdRef.current)
    }

    if (onRetry) {
      onRetry(state.retryCount + 1)
    }

    try {
      await execute(lastAsyncFnRef.current)
    } catch {
      // Error handled above
    }
  }, [state.retryCount, maxRetries, execute, onRetry])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      userFriendlyError: null,
      retryCount: 0,
      canRetry: true
    })
    lastAsyncFnRef.current = null
    if (errorIdRef.current) {
      ErrorRecovery.resetRetries(errorIdRef.current)
      errorIdRef.current = null
    }
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      userFriendlyError: null,
      canRetry: prev.retryCount < maxRetries
    }))
  }, [maxRetries])

  const wrapAsync = useCallback(<F extends (...args: any[]) => Promise<any>>(
    fn: F
  ): F => {
    return withErrorHandling(fn, handleError) as F
  }, [handleError])

  return {
    state,
    execute,
    retry,
    reset,
    clearError,
    handleError,
    wrapAsync
  }
}

// Specialized hooks

export function useApiCall<T = any>(options?: UseErrorHandlerOptions) {
  return useErrorHandler<T>({
    maxRetries: 2,
    retryDelay: 1000,
    enableAutoRetry: false,
    ...options
  })
}

export function useImageLoader(options?: UseErrorHandlerOptions) {
  return useErrorHandler<string>({
    maxRetries: 3,
    retryDelay: 500,
    enableAutoRetry: true,
    ...options
  })
}

export function useFormSubmission<T = any>(options?: UseErrorHandlerOptions) {
  return useErrorHandler<T>({
    maxRetries: 1,
    retryDelay: 0,
    enableAutoRetry: false,
    ...options
  })
}

// Hook managing an async queue

export function useAsyncQueue() {
  const [queue, setQueue] = useState<Array<{
    id: string
    promise: Promise<any>
    status: 'pending' | 'fulfilled' | 'rejected'
    result?: any
    error?: Error
  }>>([])

  const addToQueue = useCallback(async <T,>(
    id: string,
    asyncFn: () => Promise<T>
  ): Promise<T | null> => {
    const promise = asyncFn()
    setQueue(prev => [...prev, {
      id,
      promise,
      status: 'pending'
    }])
    try {
      const result = await promise
      setQueue(prev => prev.map(item =>
        item.id === id
          ? { ...item, status: 'fulfilled' as const, result }
          : item
      ))
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setQueue(prev => prev.map(item =>
        item.id === id
          ? { ...item, status: 'rejected' as const, error: err }
          : item
      ))
      return null
    }
  }, [])

  const clearQueue = useCallback(() => {
    setQueue([])
  }, [])

  const removeFromQueue = useCallback((id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id))
  }, [])

  return {
    queue,
    addToQueue,
    clearQueue,
    removeFromQueue,
    pendingCount: queue.filter(item => item.status === 'pending').length,
    completedCount: queue.filter(item => item.status === 'fulfilled').length,
    failedCount: queue.filter(item => item.status === 'rejected').length
  }
}
