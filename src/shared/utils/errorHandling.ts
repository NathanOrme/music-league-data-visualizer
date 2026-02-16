/**
 * Centralized error handling utilities
 * Provides consistent error handling patterns across the application
 */
import { useCallback } from 'react';

import { logger } from './logger';

export interface ErrorInfo {
  message: string;
  type: 'network' | 'validation' | 'api' | 'unknown';
  details?: string;
  statusCode?: number;
}

export interface ErrorHandlerOptions {
  showToUser?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

/**
 * Maps common error types to user-friendly messages
 */
const ERROR_MESSAGES = {
  network:
    'Connection error. Please check your internet connection and try again.',
  validation: 'Please check your input and try again.',
  api: 'Server error. Please try again later.',
  unknown: 'Something went wrong. Please try again.',
  timeout: 'Request timed out. Please try again.',
  unauthorized: 'You are not authorized to perform this action.',
  forbidden: 'Access denied.',
  notFound: 'The requested resource was not found.',
  serverError: 'Internal server error. Please try again later.',
} as const;

/**
 * Determines error type based on error object
 */
export function categorizeError(error: unknown): ErrorInfo['type'] {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number } };
    const status = axiosError.response?.status;

    if (status >= 400 && status < 500) {
      return 'validation';
    }
    if (status >= 500) {
      return 'api';
    }
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const networkError = error as { code: string };
    if (
      networkError.code === 'NETWORK_ERROR' ||
      networkError.code === 'ERR_NETWORK'
    ) {
      return 'network';
    }
  }

  return 'unknown';
}

/**
 * Extracts error message from various error types
 */
export function extractErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    // Axios error with response data
    if ('response' in error) {
      const axiosError = error as {
        response: { data: { message?: string } };
      };
      return axiosError.response?.data?.message || 'Request failed';
    }

    // Standard Error object
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown error occurred';
}

/**
 * Gets user-friendly error message based on error type
 */
export function getUserFriendlyMessage(
  error: unknown,
  fallback?: string,
): string {
  const errorType = categorizeError(error);
  const baseMessage = ERROR_MESSAGES[errorType];

  if (fallback) {
    return fallback;
  }

  // For validation errors, try to use the actual message if it's user-friendly
  if (errorType === 'validation') {
    const actualMessage = extractErrorMessage(error);
    if (
      actualMessage.length < 100 &&
      !actualMessage.includes('Error:')
    ) {
      return actualMessage;
    }
  }

  return baseMessage;
}

/**
 * Comprehensive error handler
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {},
): ErrorInfo {
  const {
    showToUser = true,
    logError = process.env.NODE_ENV === 'development',
    fallbackMessage,
  } = options;

  const errorType = categorizeError(error);
  const rawMessage = extractErrorMessage(error);
  const userMessage = getUserFriendlyMessage(error, fallbackMessage);

  const errorInfo: ErrorInfo = {
    message: showToUser ? userMessage : rawMessage,
    type: errorType,
    details: rawMessage !== userMessage ? rawMessage : undefined,
  };

  // Add status code if available
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number } };
    errorInfo.statusCode = axiosError.response?.status;
  }

  // Log error in development
  if (logError) {
    logger.error(
      '🚨 Error Details:',

      '\nType:',
      errorType,

      '\nUser Message:',
      userMessage,

      '\nRaw Message:',
      rawMessage,

      '\nOriginal Error:',
      error,
    );
  }

  return errorInfo;
}

/**
 * React hook for consistent error handling in components
 */
export function useErrorHandler() {
  /**
   * Handles errors in React components
   * @param error The error to handle
   * @param context Optional context description of where the error occurred
   * @returns A user-friendly error message
   */
  const handleComponentError = useCallback(
    (error: unknown, context?: string): string => {
      const errorInfo = handleError(error, {
        showToUser: true,
        logError: true,
        fallbackMessage: context ? `Failed to ${context}` : undefined,
      });

      return errorInfo.message;
    },
    [], // Empty dependency array since handleError is pure and doesn't depend on external state
  );

  return { handleComponentError };
}

/**
 * Async wrapper that handles errors consistently
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string,
): Promise<{ data?: T; error?: ErrorInfo }> {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    const errorInfo = handleError(error, {
      showToUser: true,
      logError: true,
      fallbackMessage: context ? `Failed to ${context}` : undefined,
    });

    return { error: errorInfo };
  }
}

/**
 * Validation error creator for consistent error formats
 */
export function createValidationError(message: string): ErrorInfo {
  return {
    message,
    type: 'validation',
  };
}

/**
 * API error creator for consistent error formats
 */
export function createApiError(
  message: string,
  statusCode?: number,
): ErrorInfo {
  return {
    message,
    type: 'api',
    statusCode,
  };
}
