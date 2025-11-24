import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-ios-dark-secondary-background/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 border border-ios-dark-separator/50">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 text-center">
          <h3 className="text-lg font-semibold text-ios-dark-label font-sf-pro-display">{title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-2 text-center text-ios-dark-secondary-label text-sm">
          {children}
        </div>

        {/* Actions */}
        <div className="mt-6 border-t border-ios-dark-separator/50 flex divide-x divide-ios-dark-separator/50">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex-1 py-3 text-base font-medium transition-colors active:bg-ios-dark-separator/20 ${
                action.isDestructive
                  ? 'text-red-500'
                  : action.isPrimary
                    ? 'text-primary-blue font-semibold'
                    : 'text-primary-blue'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
