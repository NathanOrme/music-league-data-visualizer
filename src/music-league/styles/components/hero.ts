/**
 * @file hero.ts
 * @description Hero section styles for Music League components
 */

export const hero = {
  container:
    'relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-teal-900/50 backdrop-blur-xl border border-white/10 p-8 mb-8',
  background:
    'absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 opacity-30',
  content: 'relative z-10',
  title:
    'text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-4',
  subtitle: 'text-xl text-gray-300 mb-8 max-w-2xl',
  stats: 'grid grid-cols-2 md:grid-cols-4 gap-4 mb-8',
  statCard:
    'bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20',
  statNumber:
    'text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300',
  statLabel: 'text-sm text-gray-400 uppercase tracking-wide',
} as const;
