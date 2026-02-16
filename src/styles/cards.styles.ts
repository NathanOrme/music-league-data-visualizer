/**
 * @file cards.ts
 * @description Card component styles and variants
 */

export const cardStyles = {
  // Base card styles
  base: 'rounded-lg border bg-card text-card-foreground shadow-sm',

  // Glass-morphism card variants
  glass: {
    base: 'backdrop-blur-xl bg-black/20 border-white/10 shadow-xl rounded-lg overflow-hidden',
    interactive:
      'cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
    static: 'backdrop-blur-xl bg-black/20 border-white/10 shadow-xl',
  },

  // Album card specific styles
  album: {
    container:
      'w-full min-h-[280px] sm:min-h-[320px] relative cursor-pointer flex flex-col backdrop-blur-xl bg-black/20 border-white/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl overflow-hidden',
    art: 'aspect-square bg-cover bg-center bg-gray-600 border-b border-white/10 flex-1',
    content: 'p-3 sm:p-4 flex flex-col gap-2 flex-1',
    title:
      'text-white font-semibold text-sm sm:text-base line-clamp-2',
    artist: 'text-gray-300 text-xs sm:text-sm line-clamp-1',
    footer: 'mt-auto flex items-center justify-between',
    chip: 'px-2 py-1 rounded text-xs bg-white/20 text-white border border-white/20',
  },

  // Event card styles
  event: {
    container:
      'backdrop-blur-xl bg-black/20 border border-white/10 rounded-lg p-4 sm:p-6 shadow-xl',
    header:
      'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4',
    title: 'text-lg sm:text-xl font-bold text-white',
    date: 'text-sm text-gray-300',
    content: 'space-y-3',
    description: 'text-gray-200 text-sm sm:text-base',
  },

  // Form card styles
  form: {
    container:
      'backdrop-blur-lg bg-gradient-to-br from-black/20 to-gray-900/20 border border-white/10 rounded-lg p-6 shadow-xl',
    header: 'text-center mb-6',
    title: 'text-2xl font-bold text-white mb-2',
    subtitle: 'text-gray-300',
  },

  // Consolidated Music League card styles
  musicLeague: {
    base: 'group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl',
    hover:
      'hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-blue-500/10',
    content: 'p-6',
    header: 'flex items-start justify-between mb-4',
    title: 'text-xl font-bold text-white mb-2',
    subtitle: 'text-gray-400 text-sm',
    body: 'text-gray-300 mb-4',
    footer:
      'flex items-center justify-between pt-4 border-t border-white/10',
    category:
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-200 border border-purple-500/30',
  },
} as const;

export const cardAnimations = {
  hover:
    'hover:-translate-y-1 hover:shadow-xl transition-all duration-200',
  fade: 'opacity-0 animate-in fade-in-50 duration-300',
  slideUp:
    'transform translate-y-4 animate-in slide-in-from-bottom-4 duration-300',
} as const;

export type CardVariant = keyof typeof cardStyles;
export type CardGlassVariant = keyof typeof cardStyles.glass;
