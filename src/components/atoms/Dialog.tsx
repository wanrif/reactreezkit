import { forwardRef, useEffect, useRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import useClickOutside from '@hooks/useClickOutside'
import { usePreventScroll } from '@hooks/usePreventScroll'
import { cn } from '@lib/utils'
import { useDialogs } from '@stores/app'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { AnimatePresence, motion, type Variants } from 'motion/react'

import { Button } from './Button'

// Animation variants
const dialogAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: -20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
  },
}

interface DialogPortalProps {
  children: ReactNode
  container?: HTMLElement | null
}

function DialogPortal({
  children,
  container = document.body,
}: DialogPortalProps) {
  return createPortal(children, container || document.body)
}

const dialogVariants = cva('w-full max-h-[90vh] overflow-y-auto ', {
  variants: {
    size: {
      sm: 'max-w-full sm:max-w-sm',
      md: 'max-w-full sm:max-w-md',
      lg: 'max-w-full sm:max-w-lg',
      xl: 'max-w-full sm:max-w-xl',
      '2xl': 'max-w-full sm:max-w-2xl',
      full: 'max-w-full sm:max-w-[95vw] h-[95vh]',
    },
    position: {
      center: '',
      top: '',
    },
  },
  defaultVariants: {
    size: 'md',
    position: 'center',
  },
})

interface DialogProps
  extends Omit<
      HTMLAttributes<HTMLDialogElement>,
      | 'title'
      | 'onDrag'
      | 'onDragEnd'
      | 'onDragStart'
      | 'onAnimationStart'
      | 'onAnimationEnd'
      | 'onTransitionEnd'
      | 'open'
    >,
    VariantProps<typeof dialogVariants> {
  /** The dialog name/key for managing state */
  name: string
  /** Dialog title */
  title?: ReactNode
  /** Dialog description */
  description?: ReactNode
  /** Whether to show close button */
  showCloseButton?: boolean
  /** Whether clicking outside closes the dialog */
  closeOnOutsideClick?: boolean
  /** Whether pressing Escape closes the dialog */
  closeOnEscape?: boolean
  /** Custom close handler */
  onClose?: () => void
  /** Footer content */
  footer?: ReactNode
  /** Dialog position: 'center' (default) or 'top' */
  position?: 'center' | 'top'
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      name,
      title,
      description,
      children,
      className,
      size,
      position = 'center',
      showCloseButton = true,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      onClose,
      footer,
      ...props
    },
    ref
  ) => {
    const { isDialogOpen, closeDialog } = useDialogs()
    const isOpen = isDialogOpen(name)
    const dialogRef = useRef<HTMLDialogElement>(null)

    // Prevent scrolling when dialog is open
    usePreventScroll({ isDisabled: !isOpen })

    // Ensure dialog is properly opened/closed
    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (isOpen && !dialog.open) {
        dialog.showModal()
        // Prevent auto-focus on first interactive element
        dialog.focus()
      } else if (!isOpen && dialog.open) {
        dialog.close()
      }
    }, [isOpen])

    // Handle close
    const handleClose = () => {
      if (onClose) {
        onClose()
      } else {
        closeDialog(name)
      }
    }

    // Close on outside click
    useClickOutside(dialogRef as React.RefObject<HTMLElement>, () => {
      if (closeOnOutsideClick) {
        handleClose()
      }
    })

    // Close on Escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, closeOnEscape])

    // This prevents background scrolling when dialog is open
    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (isOpen) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }

      const handleCancel = (e: Event) => {
        e.preventDefault()
        if (isOpen) {
          closeDialog(name)
        }
      }

      dialog.addEventListener('cancel', handleCancel)
      return () => {
        dialog.removeEventListener('cancel', handleCancel)
        document.body.classList.remove('overflow-hidden')
      }
    }, [dialogRef, isOpen])

    return (
      <DialogPortal>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.dialog
              ref={(node) => {
                dialogRef.current = node
                if (typeof ref === 'function') {
                  ref(node)
                } else if (ref) {
                  ref.current = node
                }
              }}
              onClick={(e) => {
                if (e.target === dialogRef.current && closeOnOutsideClick) {
                  handleClose()
                }
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={dialogAnimationVariants}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 1,
              }}
              className={cn(
                position === 'center'
                  ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : 'fixed top-8 left-1/2 -translate-x-1/2',
                'transform rounded-xl border border-gray-200 bg-white p-0 shadow-2xl dark:border-gray-800 dark:bg-gray-900',
                'backdrop:bg-black/50 backdrop:backdrop-blur-xs dark:backdrop:bg-black/70',
                'open:flex open:flex-col focus:outline-none'
              )}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? `${name}-title` : undefined}
              aria-describedby={description ? `${name}-description` : undefined}
              {...props}
            >
              <div
                className={cn(dialogVariants({ size, position, className }))}
              >
                {/* Header */}
                {(title || showCloseButton) && (
                  <div className="relative flex items-start justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                    <div className="flex-1">
                      {title && (
                        <h2
                          id={`${name}-title`}
                          className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                        >
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p
                          id={`${name}-description`}
                          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                        >
                          {description}
                        </p>
                      )}
                    </div>

                    {showCloseButton && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                        className="absolute top-4 right-4 h-6 w-6 rounded-xs p-0 opacity-70 transition-opacity hover:opacity-100"
                        aria-label="Close dialog"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6 text-gray-500 dark:text-gray-100">
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                    {footer}
                  </div>
                )}
              </div>
            </motion.dialog>
          )}
        </AnimatePresence>
      </DialogPortal>
    )
  }
)

Dialog.displayName = 'Dialog'

export { Dialog, type DialogProps }
