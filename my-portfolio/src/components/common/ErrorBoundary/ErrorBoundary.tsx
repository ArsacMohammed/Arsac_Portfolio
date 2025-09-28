import { Component } from 'react'
import type {ErrorInfo, ReactNode} from 'react';
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from '../../ui'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showDetails?: boolean
  level?: 'page' | 'section' | 'component'
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
  errorId: string
}

class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0
  private maxRetries = 3

  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return {
      hasError: true,
      error,
      errorId
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    this.logError(error, errorInfo)
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      level: this.props.level || 'component'
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Error Details:', errorDetails)
      console.groupEnd()
    }

    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    // errorTrackingService.captureException(error, errorDetails)
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: ''
      })
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private renderErrorDetails = () => {
    if (!this.props.showDetails || process.env.NODE_ENV !== 'development') {
      return null
    }

    return (
      <motion.details
        className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 0.3 }}
      >
        <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
          <Bug className="inline w-4 h-4 mr-2" />
          Error Details (Development Only)
        </summary>
        <div className="mt-2 space-y-2 text-sm">
          <div>
            <strong>Error ID:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{this.state.errorId}</code>
          </div>
          <div>
            <strong>Message:</strong> <code className="bg-red-100 dark:bg-red-900 px-1 rounded text-red-800 dark:text-red-200">{this.state.error?.message}</code>
          </div>
          {this.state.error?.stack && (
            <div>
              <strong>Stack Trace:</strong>
              <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs overflow-auto max-h-32 mt-1">
                {this.state.error.stack}
              </pre>
            </div>
          )}
        </div>
      </motion.details>
    )
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI based on level
      const isPageLevel = this.props.level === 'page'
      const isSectionLevel = this.props.level === 'section'

      return (
        <motion.div
          className={`
            flex flex-col items-center justify-center p-8 text-center
            ${isPageLevel ? 'min-h-screen bg-gray-50 dark:bg-gray-900' : ''}
            ${isSectionLevel ? 'min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg' : ''}
            ${!isPageLevel && !isSectionLevel ? 'min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-md' : ''}
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-red-500 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <AlertTriangle size={isPageLevel ? 64 : isSectionLevel ? 48 : 32} />
          </motion.div>

          <motion.h2
            className={`font-bold text-gray-900 dark:text-gray-100 mb-2 ${
              isPageLevel ? 'text-2xl' : isSectionLevel ? 'text-xl' : 'text-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Oops! Something went wrong
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isPageLevel 
              ? "We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."
              : isSectionLevel
              ? "This section encountered an error. You can try refreshing or continue browsing other parts of the site."
              : "This component failed to load properly. Please try again."
            }
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {this.retryCount < this.maxRetries && (
              <Button
                onClick={this.handleRetry}
                variant="primary"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Try Again ({this.maxRetries - this.retryCount} left)
              </Button>
            )}

            {!isPageLevel && (
              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Home size={16} />
                Go Home
              </Button>
            )}

            {isPageLevel && (
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Reload Page
              </Button>
            )}
          </motion.div>

          {this.renderErrorDetails()}

          <motion.p
            className="text-xs text-gray-500 dark:text-gray-500 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Error ID: {this.state.errorId}
          </motion.p>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary