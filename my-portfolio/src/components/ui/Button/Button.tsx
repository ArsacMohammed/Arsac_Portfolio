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
    primary: 'btn-primary', // Using the new .btn-primary class from globals.css
    secondary: 'surface text-gray-50 hover:bg-gray-800 focus:ring-gray-500',
    outline: 'border border-accent bg-transparent hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'hover:bg-gray-800 focus:ring-gray-500',
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