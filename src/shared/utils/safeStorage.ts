/**
 * Safe localStorage utilities with proper error handling and validation
 */
import { logger } from './logger';

/**
 * Safely get an item from localStorage with error handling
 * @param key - The storage key
 * @param defaultValue - Default value to return if key doesn't exist or parsing fails
 * @returns The stored value or default value
 */
export function safeGetStorageItem<T>(
  key: string,
  defaultValue: T,
): T {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }

    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }

    // Try to parse JSON, fall back to string
    try {
      return JSON.parse(item);
    } catch {
      // If JSON parsing fails, return the string value
      return item as unknown as T;
    }
  } catch (error) {
    // Handle potential SecurityError or QuotaExceededError
    if (process.env.NODE_ENV === 'development') {
      logger.warn(
        `Failed to read from localStorage key "${key}":`,
        error,
      );
    }
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage with error handling
 * @param key - The storage key
 * @param value - The value to store
 * @returns Success boolean
 */
export function safeSetStorageItem<T>(
  key: string,
  value: T,
): boolean {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    // Check approximate size before attempting to store
    const approximateSize = key.length + stringValue.length;
    const approximateSizeKB = approximateSize / 1024;

    // Warn about large entries
    if (approximateSizeKB > 1000) {
      // > 1MB
      logger.warn(
        `Large localStorage entry detected for "${key}": ${approximateSizeKB.toFixed(2)}KB`,
      );
    }

    window.localStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    // Always log localStorage failures for debugging cache issues
    const errorMsg =
      error instanceof Error ? error.message : 'Unknown error';

    if (
      errorMsg.includes('QuotaExceededError') ||
      errorMsg.includes('quota')
    ) {
      logger.error(
        `localStorage quota exceeded for key "${key}". Consider clearing cache or reducing data size.`,
        error,
      );
    } else {
      logger.warn(
        `Failed to write to localStorage key "${key}":`,
        error,
      );
    }

    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The storage key
 * @returns Success boolean
 */
export function safeRemoveStorageItem(key: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logger.warn(
        `Failed to remove from localStorage key "${key}":`,
        error,
      );
    }
    return false;
  }
}

/**
 * Validate theme value
 * @param value - The value to validate
 * @returns Valid theme or null
 */
export function validateTheme(
  value: unknown,
): 'dark' | 'light' | 'system' | null {
  if (
    typeof value === 'string' &&
    ['dark', 'light', 'system'].includes(value)
  ) {
    return value as 'dark' | 'light' | 'system';
  }
  return null;
}
