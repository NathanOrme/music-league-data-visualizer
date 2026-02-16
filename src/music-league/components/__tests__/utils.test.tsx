import type { League } from '@/shared/utils/dataProcessing';
import {
  getCategoryLeagues,
  getLeagueCategoryData,
  getPlaylistCategories,
  getRoundCategoryMapping,
  getTopStandings,
} from '../utils';

describe('Music League Utils', () => {
  const mockLeague: League = {
    id: 'league1',
    name: 'Test League',
    description: 'Test description',
    participants: [
      { name: 'Player 1', points: 100 },
      { name: 'Player 2', points: 90 },
    ],
    rounds: [],
    playlists: [],
    standings: [
      { rank: 1, name: 'Player 1', points: 100 },
      { rank: 2, name: 'Player 2', points: 90 },
    ],
    stats: {
      totalRounds: 5,
      totalParticipants: 2,
      totalVotes: 100,
    },
  };

  const mockLeaguesData: any = {
    '1001leagues': [mockLeague],
  };

  describe('getCategoryLeagues', () => {
    it('should return leagues array from valid data', () => {
      const result = getCategoryLeagues(
        '1001-leagues',
        mockLeaguesData,
      );
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return empty array for invalid category', () => {
      const result = getCategoryLeagues('invalid', mockLeaguesData);
      expect(result).toEqual([]);
    });

    it('should return empty array for null data', () => {
      const result = getCategoryLeagues('1001-leagues', null);
      expect(result).toEqual([]);
    });
  });

  describe('getLeagueCategoryData', () => {
    it('should return category data array', () => {
      const result = getLeagueCategoryData(mockLeaguesData);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle null leagues data', () => {
      const result = getLeagueCategoryData(null);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getPlaylistCategories', () => {
    it('should return playlist categories array', () => {
      const result = getPlaylistCategories();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return categories with required properties', () => {
      const result = getPlaylistCategories();
      result.forEach((category) => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('label');
        expect(category).toHaveProperty('description');
      });
    });
  });

  describe('getRoundCategoryMapping', () => {
    it('should return round category mapping', () => {
      const result = getRoundCategoryMapping();
      expect(typeof result).toBe('object');
    });

    it('should have expected category keys', () => {
      const result = getRoundCategoryMapping();
      expect(result).toHaveProperty('1001');
    });
  });

  describe('getTopStandings', () => {
    it('should return top standings from leagues', () => {
      const result = getTopStandings(mockLeaguesData);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle null leagues data', () => {
      const result = getTopStandings(null);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it('should limit results when limit parameter provided', () => {
      const result = getTopStandings(mockLeaguesData, 1);
      expect(result.length).toBeLessThanOrEqual(1);
    });
  });
});
