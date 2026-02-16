/**
 * @file buttons.ts
 * @description Button style variants and patterns
 */

/**
 * Button style configuration object containing base styles, sizes, variants, and special patterns
 * @constant
 */
export const buttonStyles = {
  // Base button styles
  base: 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',

  // Size variants
  sizes: {
    sm: 'h-9 px-3',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  },

  // Color variants
  variants: {
    primary:
      'bg-gradient-to-r from-purple-600 to-teal-500 text-white hover:from-purple-700 hover:to-teal-600 shadow-lg',
    secondary:
      'border border-white/20 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm',
    ghost: 'hover:bg-white/10 text-white',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    // Consolidated Music League variants
    musicLeaguePrimary:
      'group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl',
    musicLeagueSecondary:
      'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:border-white/30 font-medium px-6 py-3 rounded-xl transition-all duration-300',
    musicLeagueGhost:
      'text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200',
  },

  // Tab button variants (from music-league)
  tabs: {
    active: 'bg-purple-600/80 text-white border-purple-500/50',
    inactive: 'text-gray-300 hover:text-white hover:bg-white/10',
  },

  // Interactive effects
  effects: {
    scale: 'hover:scale-105 transform transition-all duration-200',
    icon: 'w-6 h-6 mr-2 group-hover:animate-pulse',
  },

  // Special button patterns
  glassmorphism:
    'backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200',
  wikipedia:
    'bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors duration-200',
} as const;

/**
 * Icon button style configuration object for compact button implementations
 * @constant
 */
export const iconButtonStyles = {
  base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  glass:
    'h-8 w-8 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white border border-white/20',
  transparent:
    'h-8 w-8 hover:bg-white/10 text-white/70 hover:text-white',
} as const;

/**
 * Type representing available button style variants
 */
export type ButtonVariant = keyof typeof buttonStyles.variants;

/**
 * Type representing available button sizes
 */
export type ButtonSize = keyof typeof buttonStyles.sizes;
