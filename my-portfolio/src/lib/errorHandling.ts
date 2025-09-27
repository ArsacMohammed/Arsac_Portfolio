// Error handling utilities and logging functions

export interface ErrorDetails {
  message: string
  stack?: string
  componentStack?: string
  errorId: string
  timestamp: string
  userAgent: string
  url: string
  level: 'page' | 'section' | 'component' | 'async'
  userId?: string
  sessionId?: string
  buildVersion?: string
}

export interface UserFriendlyError {
  title: string
  message: string
  action?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
}

// Error classification and user-friendly messages
export const ERROR_MESSAGES: Record<string, UserFriendlyError> = {
  // Network errors
  NETWORK_ERROR: {
    title: 'Connection Problem',
    message: 'Unable to connect to our servers. Please check your internet connection and try again.',
    action: 'Check your connection and retry',
    severity: 'medium'
  },
  TIMEOUT_ERROR: {
    title: 'Request Timeout',
    message: 'The request took too long to complete. Please try again.',
    action: 'Try again',
    severity: 'medium'
  },
  
  // API errors
  API_ERROR: {
    title: 'Service Unavailable',
    message: 'Our service is temporarily unavailable. Please try again in a few moments.',
    action: 'Try again later',
    severity: 'high'
  },
  VALIDATION_ERROR: {
    title: 'Invalid Input',
    message: 'Please check your input and try again.',
    action: 'Correct the input',
    severity: 'low'
  },
  
  // Component errors
  RENDER_ERROR: {
    title: 'Display Error',
    message: 'There was a problem displaying this content.',
    action: 'Refresh the page',
    severity: 'medium'
  },
  ANIMATION_ERROR: {
    title: 'Animation Error',
    message: 'Some animations may not work properly, but the content is still accessible.',
    action: 'Continue browsing',
    severity: 'low'
  },
  
  // Resource errors
  IMAGE_LOAD_ERROR: {
    title: 'Image Load Failed',
    message: 'Some images failed to load. Please check your connection.',
    action: 'Refresh the page',
    severity: 'low'
  },
  SCRIPT_LOAD_ERROR: {
    title: 'Resource Load Error',
    message: 'Some features may not work properly due to loading issues.',
    action: 'Refresh the page',
    severity: 'medium'
  },
  
  // Generic fallback
  UNKNOWN_ERROR: {
    title: 'Unexpected Error',
    message: 'Something unexpected happened. Please try refreshing the page.',
    action: 'Refresh the page',
    severity: 'medium'
  }
}

// Error classification function
export function classifyError(error: Error): string {
  const message = error.message.toLowerCase()
  const stack = error.stack?.toLowerCase() || ''
  
  // Network-related errors
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return 'NETWORK_ERROR'
  }
  
  if (message.includes('timeout') || message.includes('aborted')) {
    return 'TIMEOUT_ERROR'
  }
  
  // API-related errors
  if (message.includes('api') || message.includes('server') || message.includes('http')) {
    return 'API_ERROR'
  }
  
  if (message.includes('validation') || message.includes('invalid')) {
    return 'VALIDATION_ERROR'
  }
  
  // Component/React errors
  if (stack.includes('react') || message.includes('render') || message.includes('component')) {
    return 'RENDER_ERROR'
  }
  
  if (message.includes('animation') || stack.includes('framer') || stack.includes('gsap')) {
    return 'ANIMATION_ERROR'
  }
  
  // Resource loading errors
  if (message.includes('image') || message.includes('img')) {
    return 'IMAGE_LOAD_ERROR'
  }
  
  if (message.includes('script') || message.includes('chunk') || message.includes('module')) {
    return 'SCRIPT_LOAD_ERROR'
  }
  
  return 'UNKNOWN_ERROR'
}

// Generate unique error ID
export function generateErrorId(): string {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Create detailed error object
export function createErrorDetails(
  error: Error,
  level: ErrorDetails['level'] = 'component',
  additionalInfo?: Partial<ErrorDetails>
): ErrorDetails {
  return {
    message: error.message,
    stack: error.stack,
    errorId: generateErrorId(),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    level,
    buildVersion: process.env.REACT_APP_VERSION || 'unknown',
    ...additionalInfo
  }
}

// Error logging function
export function logError(errorDetails: ErrorDetails): void {
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 Error [${errorDetails.level.toUpperCase()}]`)
    console.error('Error ID:', errorDetails.errorId)
    console.error('Message:', errorDetails.message)
    console.error('Timestamp:', errorDetails.timestamp)
    console.error('URL:', errorDetails.url)
    if (errorDetails.stack) {
      console.error('Stack:', errorDetails.stack)
    }
    console.groupEnd()
  }
  
  // Production logging - send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example integrations:
    
    // Sentry
    // Sentry.captureException(new Error(errorDetails.message), {
    //   tags: { level: errorDetails.level },
    //   extra: errorDetails
    // })
    
    // Custom API endpoint
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorDetails)
    // }).catch(() => {
    //   // Silently fail if error logging fails
    // })
    
    // For now, store in localStorage as fallback
    try {
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]')
      existingErrors.push(errorDetails)
      
      // Keep only last 10 errors to prevent storage bloat
      const recentErrors = existingErrors.slice(-10)
      localStorage.setItem('app_errors', JSON.stringify(recentErrors))
    } catch {
      // Silently fail if localStorage is not available
    }
  }
}

// Get user-friendly error message
export function getUserFriendlyError(error: Error): UserFriendlyError {
  const errorType = classifyError(error)
  return ERROR_MESSAGES[errorType] || ERROR_MESSAGES.UNKNOWN_ERROR
}

// Error recovery utilities
export class ErrorRecovery {
  private static retryAttempts = new Map<string, number>()
  private static maxRetries = 3
  
  static canRetry(errorId: string): boolean {
    const attempts = this.retryAttempts.get(errorId) || 0
    return attempts < this.maxRetries
  }
  
  static recordRetry(errorId: string): void {
    const attempts = this.retryAttempts.get(errorId) || 0
    this.retryAttempts.set(errorId, attempts + 1)
  }
  
  static resetRetries(errorId: string): void {
    this.retryAttempts.delete(errorId)
  }
  
  static clearOldRetries(): void {
    // Clear retry attempts older than 5 minutes
    // This is a simple implementation - in production you'd want timestamp tracking
    this.retryAttempts.clear()
  }
}

// Global error handler for unhandled promise rejections
export function setupGlobalErrorHandling(): void {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    const errorDetails = createErrorDetails(error, 'async')
    logError(errorDetails)
    
    // Prevent the default browser behavior (logging to console)
    event.preventDefault()
  })
  
  // Handle global JavaScript errors
  window.addEventListener('error', (event) => {
    const error = event.error || new Error(event.message)
    const errorDetails = createErrorDetails(error, 'page', {
      componentStack: `at ${event.filename}:${event.lineno}:${event.colno}`
    })
    logError(errorDetails)
  })
  
  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const target = event.target as HTMLElement
      const error = new Error(`Resource failed to load: ${target.tagName}`)
      const errorDetails = createErrorDetails(error, 'component', {
        componentStack: `Resource: ${target.outerHTML.slice(0, 100)}...`
      })
      logError(errorDetails)
    }
  }, true) // Use capture phase to catch resource errors
}

// Utility to wrap async functions with error handling
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorHandler?: (error: Error) => void
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      const errorDetails = createErrorDetails(err, 'async')
      logError(errorDetails)
      
      if (errorHandler) {
        errorHandler(err)
      } else {
        throw err
      }
    }
  }) as T
}