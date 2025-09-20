import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../../lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : 'button'
  
  const variants = {
    primary: 'bg-blue-600 text-white shadow hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-700 dark:hover:bg-gray-800',
    ghost: 'hover:bg-gray-100 focus:ring-gray-500 dark:hover:bg-gray-800',
    destructive: 'bg-red-600 text-white shadow hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm', 
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg'
  }

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Comp>
  )
})

Button.displayName = 'Button'

export default Button



// Button Component:
// 5 variants: primary, secondary, outline, ghost, destructive
// 4 sizes: sm, md, lg, xl
// Loading state with spinner
// Accessibility: proper focus states and ARIA
// Polymorphic: can render as any element with asChild