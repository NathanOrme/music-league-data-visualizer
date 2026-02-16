/**
 * @file animations.ts
 * @description Animation and effect utilities for Music League components
 */

export const animations = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  bounce: 'animate-bounce-subtle',
  glow: 'animate-glow',
};

export const loading = {
  container: 'animate-pulse',
  skeleton: 'bg-white/10 rounded-lg',
  shimmer:
    'bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer',
} as const;
