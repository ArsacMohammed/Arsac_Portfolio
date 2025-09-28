import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../../lib/utils'
import Button from '../Button/Button'

interface ModalProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  showCloseButton = true
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] min-h-token-screen'
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-token-modal translate-x-[-50%] translate-y-[-50%] gap-token-4 border border-gray-200 bg-white p-token-6 shadow-token-lg duration-200 dark:border-gray-800 dark:bg-gray-900',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'rounded-token-xl',
            sizes[size]
          )}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between">
              {title && (
                <Dialog.Title className="text-token-lg font-token-semibold">
                  {title}
                </Dialog.Title>
              )}
              {showCloseButton && (
                <Dialog.Close asChild>
                  <Button variant="ghost" size="sm" className="h-token-8 w-token-8 p-0">
                    <X className="h-token-4 w-token-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </Dialog.Close>
              )}
            </div>
          )}
          
          {description && (
            <Dialog.Description className="text-token-sm text-gray-600 dark:text-gray-400">
              {description}
            </Dialog.Description>
          )}
          
          <div className="max-h-[70vh] overflow-auto">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// Trigger component for easy usage
const ModalTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog.Trigger asChild>
    {children}
  </Dialog.Trigger>
)

export { Modal, ModalTrigger }



// Modal Component:
// Accessible: uses Radix UI Dialog primitives
// Animated: smooth entrance/exit animations
// 5 sizes: from sm to full screen
// Backdrop blur for modern effect
// Keyboard navigation and focus management