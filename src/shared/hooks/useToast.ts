/**
 * @file useToast.ts
 * @description Reusable toast notification hook for consistent notifications across the app
 */

import { useCallback, useState } from 'react';

// Toast notification types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // Optional custom duration in ms
}

interface UseToastReturn {
  toasts: Toast[];
  addToast: (
    message: string,
    type: ToastType,
    duration?: number,
  ) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

/**
 * Custom hook for managing toast notifications
 * @param defaultDuration - Default duration for toast auto-removal (default: 5000ms)
 */
export const useToast = (defaultDuration = 5000): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  /**
   * Adds a new toast notification
   */
  const addToast = useCallback(
    (
      message: string,
      type: ToastType,
      duration: number = defaultDuration,
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after specified duration
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) =>
            prev.filter((toast) => toast.id !== id),
          );
        }, duration);
      }
    },
    [defaultDuration],
  );

  /**
   * Removes a specific toast notification
   */
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Clears all toast notifications
   */
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };
};
