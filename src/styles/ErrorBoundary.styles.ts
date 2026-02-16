/**
 * @file ErrorBoundary.styles.ts
 * @description Styles for the ErrorBoundary component
 */

export const errorBoundaryStyles = {
  // Main container
  container:
    'min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4',

  // Error card
  card: 'max-w-md mx-auto text-center glass.base() shadow-2xl shadow-black/50',

  // Button
  button:
    'bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600',
} as const;
