/**
 * @file SkeletonLoader.styles.ts
 * @description Styles for the SkeletonLoader component
 */

export const skeletonLoaderStyles = {
  // Updated glass-morphism base style
  base: 'bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse',

  // Fallback patterns for different use cases
  variants: {
    text: 'h-4 bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse rounded',
    title:
      'h-6 bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse rounded',
    avatar:
      'rounded-full bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse',
    card: 'bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse rounded-lg',
    button:
      'h-10 bg-white/10 backdrop-blur-sm border border-white/5 animate-pulse rounded-md',
  },

  sizes: {
    xs: 'h-3',
    sm: 'h-4',
    md: 'h-5',
    lg: 'h-6',
    xl: 'h-8',
  },

  patterns: {
    lines: 'space-y-3',
    grid: 'grid gap-4',
    card: 'p-4 space-y-4',
  },
} as const;
