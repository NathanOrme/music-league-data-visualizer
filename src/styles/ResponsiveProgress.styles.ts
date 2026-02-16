/**
 * @file ResponsiveProgress.styles.ts
 * @description Styles for the ResponsiveProgress component
 */

export const responsiveProgressStyles = {
  container:
    'glass.base() shadow-2xl shadow-black/50 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-3xl hover:shadow-black/60',

  content: {
    wrapper: 'layout.card()',
    textSection: 'flex-1',
    title:
      'font-bold text-white mb-2 drop-shadow-lg typography.gradient()',
    subtitle: 'text-white/80 mb-4',
    progressSection: 'flex-1 sm:max-w-xs',
  },

  progress: {
    container: 'relative mb-4',
    bar: 'bg-white/10 rounded-full border border-white/20',
    fill: 'h-full bg-gradient-to-r from-purple-600 to-teal-500 transition-all duration-500 ease-out',
    text: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold drop-shadow-lg',
  },
} as const;
