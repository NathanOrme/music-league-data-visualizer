/**
 * @file patterns.ts
 * @description Common design patterns and utility classes used throughout the application
 */

export const glassmorphism = {
  base: 'backdrop-blur-xl bg-black/20 border-white/10',
  card: 'backdrop-blur-xl bg-black/20 border border-white/10 shadow-xl',
  overlay: 'backdrop-blur-md bg-black/30',
  container:
    'backdrop-blur-lg bg-gradient-to-br from-black/20 to-gray-900/20 border border-white/10',

  // Consolidated Music League glass variants
  musicLeague: {
    primary:
      'bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-teal-900/50 backdrop-blur-xl border border-white/10',
    secondary: 'bg-white/10 backdrop-blur-sm border border-white/20',
  },
} as const;

export const transitions = {
  default: 'transition-all duration-200',
  fast: 'transition-all duration-100',
  slow: 'transition-all duration-300',
  hover:
    'transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
} as const;

export const shadows = {
  sm: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 8px 16px rgba(0,0,0,0.15)',
  xl: '0 8px 32px rgba(0,0,0,0.3)',
  glass: '0 8px 32px rgba(0,0,0,0.3)',
} as const;

export const spacingPatterns = {
  container: 'px-4 sm:px-6 lg:px-8',
  section: 'py-8 md:py-12 lg:py-16',
  card: 'p-4 sm:p-6',
} as const;

export const responsive = {
  grid: {
    mobile: 'grid-cols-2',
    tablet: 'sm:grid-cols-3 md:grid-cols-4',
    desktop: 'lg:grid-cols-5 xl:grid-cols-6',
    full: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  },
  text: {
    title: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    subtitle: 'text-lg sm:text-xl md:text-2xl',
    body: 'text-sm sm:text-base',
  },
} as const;

export type GlassmorphismVariant = keyof typeof glassmorphism;
export type TransitionVariant = keyof typeof transitions;
export type ShadowVariant = keyof typeof shadows;
export type SpacingPatternVariant = keyof typeof spacingPatterns;
