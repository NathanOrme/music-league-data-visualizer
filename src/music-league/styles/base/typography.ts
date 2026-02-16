/**
 * @file typography.ts
 * @description Typography styles for Music League components
 */

export const text = {
  hero: 'text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300',
  heading: 'text-2xl md:text-3xl font-bold text-white',
  subheading: 'text-lg font-semibold text-gray-200',
  body: 'text-gray-300',
  muted: 'text-gray-500',
  accent:
    'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400',
} as const;
