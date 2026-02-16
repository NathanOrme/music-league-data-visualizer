/**
 * @file leagues.ts
 * @description League-specific component styles
 */

export const standings = {
  container: 'space-y-3',
  item: 'p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all',
  rank: {
    container:
      'flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm',
    winner:
      'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    default: 'bg-gray-600/50 text-gray-300',
  },
  player: {
    name: 'text-white font-semibold',
    points: 'text-gray-400 text-sm',
  },
};

export const rounds = {
  container: 'space-y-4',
  item: 'p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl',
  title: 'text-lg font-semibold text-white mb-2',
  name: 'text-gray-300 mb-2',
  winner: 'text-sm text-purple-300',
};

export const tabs = {
  container: 'flex space-x-2 mb-6',
  button: 'px-4 py-2 rounded-lg transition-all duration-200',
};
