import { LeagueTypes } from '@/shared/types/leagueTypes';

import {
  buildCategoryRoute,
  buildLeagueRoute,
  getAllLeagues,
  getLeagueTypeFromRoute,
  getLeaguesForCategory,
  titleToSlug,
} from '../slugUtils';

describe('slugUtils', () => {
  describe('titleToSlug', () => {
    it('converts title to lowercase slug', () => {
      expect(titleToSlug('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(titleToSlug("It's A Test!")).toBe('its-a-test');
    });

    it('collapses multiple spaces/dashes', () => {
      expect(titleToSlug('Hello   World')).toBe('hello-world');
      expect(titleToSlug('Hello---World')).toBe('hello-world');
    });

    it('trims leading/trailing dashes', () => {
      expect(titleToSlug(' -Hello- ')).toBe('hello');
    });

    it('handles empty string', () => {
      expect(titleToSlug('')).toBe('');
    });
  });

  describe('getLeagueTypeFromRoute', () => {
    it('maps 1001-leagues to NormalLeagues', () => {
      expect(getLeagueTypeFromRoute('1001-leagues')).toBe(
        LeagueTypes.NormalLeagues,
      );
    });

    it('maps words to WordsLeagues', () => {
      expect(getLeagueTypeFromRoute('words')).toBe(
        LeagueTypes.WordsLeagues,
      );
    });

    it('maps coffee to CoffeeLeagues', () => {
      expect(getLeagueTypeFromRoute('coffee')).toBe(
        LeagueTypes.CoffeeLeagues,
      );
    });

    it('maps head-of-steam to HOSLeagues', () => {
      expect(getLeagueTypeFromRoute('head-of-steam')).toBe(
        LeagueTypes.HOSLeagues,
      );
    });

    it('returns undefined for unknown routes', () => {
      expect(getLeagueTypeFromRoute('unknown')).toBeUndefined();
    });
  });

  describe('buildLeagueRoute', () => {
    it('builds correct route path', () => {
      expect(buildLeagueRoute('1001-leagues', 'My Cool League')).toBe(
        '/music-league/1001-leagues/my-cool-league',
      );
    });
  });

  describe('buildCategoryRoute', () => {
    it('builds correct category route', () => {
      expect(buildCategoryRoute('words')).toBe('/music-league/words');
    });
  });

  describe('getLeaguesForCategory', () => {
    it('returns empty array for unknown category', () => {
      const data = {
        [LeagueTypes.NormalLeagues]: null,
        [LeagueTypes.WordsLeagues]: null,
        [LeagueTypes.CoffeeLeagues]: null,
        [LeagueTypes.HOSLeagues]: null,
      };
      expect(getLeaguesForCategory(data, 'unknown')).toEqual([]);
    });

    it('returns empty array when category has null data', () => {
      const data = {
        [LeagueTypes.NormalLeagues]: null,
        [LeagueTypes.WordsLeagues]: null,
        [LeagueTypes.CoffeeLeagues]: null,
        [LeagueTypes.HOSLeagues]: null,
      };
      expect(getLeaguesForCategory(data, '1001-leagues')).toEqual([]);
    });
  });

  describe('getAllLeagues', () => {
    it('returns empty array for all null data', () => {
      const data = {
        [LeagueTypes.NormalLeagues]: null,
        [LeagueTypes.WordsLeagues]: null,
        [LeagueTypes.CoffeeLeagues]: null,
        [LeagueTypes.HOSLeagues]: null,
      };
      expect(getAllLeagues(data)).toEqual([]);
    });

    it('flattens all league arrays', () => {
      const league1 = {
        title: 'L1',
        rounds: [],
        leagueStandings: [],
      };
      const league2 = {
        title: 'L2',
        rounds: [],
        leagueStandings: [],
      };
      const data = {
        [LeagueTypes.NormalLeagues]: [league1],
        [LeagueTypes.WordsLeagues]: [league2],
        [LeagueTypes.CoffeeLeagues]: null,
        [LeagueTypes.HOSLeagues]: null,
      };
      expect(getAllLeagues(data)).toEqual([league1, league2]);
    });
  });
});
