/**
 * @file responsive.ts
 * @description Responsive utilities for Music League components
 */

export const responsive = {
  hideOnMobile: 'hidden md:block',
  showOnMobile: 'block md:hidden',
  mobileGrid: 'grid-cols-1 sm:grid-cols-2',
  tabletGrid: 'md:grid-cols-2 lg:grid-cols-3',
  desktopGrid: 'xl:grid-cols-4 2xl:grid-cols-5',
} as const;
