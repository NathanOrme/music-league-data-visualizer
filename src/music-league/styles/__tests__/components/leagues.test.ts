/**
 * @file leagues.test.ts
 * @description Tests for Music League league-specific component styles
 */

import { rounds, standings, tabs } from '../../components/leagues';

describe('Music League Leagues Components', () => {
  describe('standings styles', () => {
    it('should export standings constants as strings or objects', () => {
      expect(typeof standings.container).toBe('string');
      expect(typeof standings.item).toBe('string');
      expect(typeof standings.rank).toBe('object');
      expect(typeof standings.player).toBe('object');
    });

    it('should have container with spacing', () => {
      expect(standings.container).toBe('space-y-3');
    });

    it('should have item with glass effect', () => {
      expect(standings.item).toContain('p-4');
      expect(standings.item).toContain('bg-white/5');
      expect(standings.item).toContain('backdrop-blur-sm');
      expect(standings.item).toContain('border');
      expect(standings.item).toContain('border-white/10');
      expect(standings.item).toContain('rounded-xl');
      expect(standings.item).toContain('hover:bg-white/10');
      expect(standings.item).toContain('transition-all');
    });

    it('should have rank container styling', () => {
      expect(standings.rank.container).toContain('flex');
      expect(standings.rank.container).toContain('items-center');
      expect(standings.rank.container).toContain('justify-center');
      expect(standings.rank.container).toContain('w-8');
      expect(standings.rank.container).toContain('h-8');
      expect(standings.rank.container).toContain('rounded-full');
      expect(standings.rank.container).toContain('font-bold');
      expect(standings.rank.container).toContain('text-sm');
    });

    it('should have winner rank styling with gradient', () => {
      expect(standings.rank.winner).toContain('bg-gradient-to-r');
      expect(standings.rank.winner).toContain('from-yellow-500');
      expect(standings.rank.winner).toContain('to-orange-500');
      expect(standings.rank.winner).toContain('text-white');
    });

    it('should have default rank styling', () => {
      expect(standings.rank.default).toContain('bg-gray-600/50');
      expect(standings.rank.default).toContain('text-gray-300');
    });

    it('should have player name styling', () => {
      expect(standings.player.name).toContain('text-white');
      expect(standings.player.name).toContain('font-semibold');
    });

    it('should have player points styling', () => {
      expect(standings.player.points).toContain('text-gray-400');
      expect(standings.player.points).toContain('text-sm');
    });
  });

  describe('rounds styles', () => {
    it('should export rounds constants as strings', () => {
      Object.values(rounds).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have container with spacing', () => {
      expect(rounds.container).toBe('space-y-4');
    });

    it('should have item with glass effect', () => {
      expect(rounds.item).toContain('p-4');
      expect(rounds.item).toContain('bg-white/5');
      expect(rounds.item).toContain('backdrop-blur-sm');
      expect(rounds.item).toContain('border');
      expect(rounds.item).toContain('border-white/10');
      expect(rounds.item).toContain('rounded-xl');
    });

    it('should have title styling', () => {
      expect(rounds.title).toContain('text-lg');
      expect(rounds.title).toContain('font-semibold');
      expect(rounds.title).toContain('text-white');
      expect(rounds.title).toContain('mb-2');
    });

    it('should have name styling', () => {
      expect(rounds.name).toContain('text-gray-300');
      expect(rounds.name).toContain('mb-2');
    });

    it('should have winner styling', () => {
      expect(rounds.winner).toContain('text-sm');
      expect(rounds.winner).toContain('text-purple-300');
    });
  });

  describe('tabs styles', () => {
    it('should export tabs constants as strings', () => {
      Object.values(tabs).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have container with flex layout', () => {
      expect(tabs.container).toContain('flex');
      expect(tabs.container).toContain('space-x-2');
      expect(tabs.container).toContain('mb-6');
    });

    it('should have button with padding and transitions', () => {
      expect(tabs.button).toContain('px-4');
      expect(tabs.button).toContain('py-2');
      expect(tabs.button).toContain('rounded-lg');
      expect(tabs.button).toContain('transition-all');
      expect(tabs.button).toContain('duration-200');
    });
  });
});
