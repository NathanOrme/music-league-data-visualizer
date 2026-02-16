/**
 * @file categories.ts
 * @description League category styles for Music League components
 */

export const categories = {
  '1001': {
    gradient:
      'bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20',
    border: 'border-purple-500/30',
    icon: 'text-purple-400',
    accent: 'text-purple-300',
  },
  words: {
    gradient:
      'bg-gradient-to-br from-blue-600/20 via-teal-600/20 to-green-600/20',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    accent: 'text-blue-300',
  },
  coffee: {
    gradient:
      'bg-gradient-to-br from-orange-600/20 via-yellow-600/20 to-red-600/20',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
    accent: 'text-orange-300',
  },
  hos: {
    gradient:
      'bg-gradient-to-br from-teal-600/20 via-green-600/20 to-blue-600/20',
    border: 'border-teal-500/30',
    icon: 'text-teal-400',
    accent: 'text-teal-300',
  },
} as const;
