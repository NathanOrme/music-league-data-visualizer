import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * @param inputs - Array of class value inputs (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated CSS class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
