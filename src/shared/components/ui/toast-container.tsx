/**
 * @file toast-container.tsx
 * @description Reusable toast container component with glass-morphism design
 */

import type { Toast } from '@/shared/hooks/useToast';
import { X } from 'lucide-react';
import type { FC } from 'react';

import { Alert, AlertDescription } from '@/shared/components/ui';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
}

/**
 * Toast container component with consistent styling
 */
export const ToastContainer: FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'bottom-right',
}) => {
  if (toasts.length === 0) {
    return null;
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const getToastStyles = (type: Toast['type']) => {
    const baseStyles =
      'min-w-80 max-w-md transition-all duration-300 ease-in-out backdrop-blur-md';

    switch (type) {
      case 'success':
        return `${baseStyles} border-green-500/20 bg-green-500/10`;
      case 'error':
        return `${baseStyles} border-red-500/20 bg-red-500/10`;
      case 'warning':
        return `${baseStyles} border-yellow-500/20 bg-yellow-500/10`;
      case 'info':
        return `${baseStyles} border-blue-500/20 bg-blue-500/10`;
      default:
        return `${baseStyles} border-gray-500/20 bg-gray-500/10`;
    }
  };

  const getTextColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 space-y-2`}
    >
      {toasts.map((toast) => (
        <Alert key={toast.id} className={getToastStyles(toast.type)}>
          <AlertDescription
            className={`flex items-center justify-between ${getTextColor(toast.type)}`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="ml-4 text-white/60 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};
