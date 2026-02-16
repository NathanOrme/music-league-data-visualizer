import { glass } from '@/styles/utilities';

/**
 * @file FormCard.styles.ts
 * @description Styles for form card components throughout the application
 */

export const formCardStyles = {
  // Base form card containers
  container: {
    default: () =>
      `w-full max-w-md mx-auto ${glass.card()} rounded-lg shadow-xl`,
    large: () =>
      `w-full max-w-2xl mx-auto ${glass.card()} rounded-lg shadow-xl`,
    fullWidth: () => `w-full ${glass.card()} rounded-lg shadow-xl`,
  },

  // Form headers
  header: {
    container: 'layout.card() border-b border-white/10',
    title: 'text-xl font-bold text-white mb-2 typography.gradient()',
    subtitle: 'text-gray-300 text-sm',
  },

  // Form content areas
  content: {
    container: 'layout.card() space-y-4',
    section: 'space-y-3',
    row: 'flex gap-3',
    column: 'flex flex-col gap-3',
  },

  // Form inputs
  input: {
    base: 'w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
    textarea:
      'w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none',
    select:
      'w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
    checkbox:
      'rounded border-white/20 bg-black/30 text-purple-500 focus:ring-purple-500 focus:ring-offset-0',
    radio:
      'border-white/20 bg-black/30 text-purple-500 focus:ring-purple-500 focus:ring-offset-0',
  },

  // Form labels
  label: {
    base: 'block text-sm font-medium text-gray-300 mb-1',
    required:
      'block text-sm font-medium text-gray-300 mb-1 after:content-["*"] after:text-red-400 after:ml-1',
    inline: 'text-sm font-medium text-gray-300',
  },

  // Form buttons
  button: {
    primary:
      'w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-2 px-4 rounded-md hover:from-purple-700 hover:to-teal-600 transition-all duration-200 font-medium',
    secondary:
      'w-full border border-white/20 text-white py-2 px-4 rounded-md hover:bg-white/10 transition-all duration-200 font-medium',
    danger:
      'w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-200 font-medium',
    ghost:
      'text-gray-300 hover:text-white hover:bg-white/10 py-2 px-4 rounded-md transition-all duration-200',
  },

  // Form footer
  footer: {
    container: 'layout.card() border-t border-white/10 bg-black/10',
    actions: 'flex gap-3 justify-end',
    fullWidth: 'flex gap-3 w-full',
  },

  // Form validation states
  validation: {
    error: 'border-red-500/50 focus:ring-red-500',
    success: 'border-green-500/50 focus:ring-green-500',
    errorMessage: 'text-red-400 text-xs mt-1',
    successMessage: 'text-green-400 text-xs mt-1',
  },

  // Form groups
  group: {
    base: 'space-y-2',
    inline: 'flex items-center gap-2',
    horizontal:
      'sm:flex sm:items-center sm:gap-4 space-y-2 sm:space-y-0',
  },

  // Loading states
  loading: {
    overlay:
      'absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg',
    spinner: 'h-6 w-6 animate-spin text-purple-400',
    text: 'ml-2 text-white/70',
  },
} as const;
