/**
 * @file layout.ts
 * @description Layout utilities for Music League components
 */

export const layout = {
  page: 'min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black overflow-hidden',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6',
  section: 'mb-8',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  gridCols1: 'space-y-4',
  cardContent: 'p-0',
  centeredContent: 'text-center',
} as const;
