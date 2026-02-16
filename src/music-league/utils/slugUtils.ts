/**
 * @file slugUtils.ts
 * @description Utilities for generating URL-safe slugs from league titles
 * and resolving leagues from URL parameters.
 */

import { categoryThemes } from '@/music-league/config/league-themes';
import type { LeaguesData } from '@/music-league/contexts/LeagueDataContext';
import { LeagueTypes } from '@/shared/types/leagueTypes';
import type { League } from '@/shared/utils/dataProcessing';

/**
 * Convert a league title to a URL-safe slug
 */
export const titleToSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Map a route prefix to its LeagueTypes enum value
 */
const routePrefixToLeagueType: Record<string, LeagueTypes> = {
  '1001-leagues': LeagueTypes.NormalLeagues,
  words: LeagueTypes.WordsLeagues,
  coffee: LeagueTypes.CoffeeLeagues,
  'head-of-steam': LeagueTypes.HOSLeagues,
};

/**
 * Get the LeagueTypes enum value for a route prefix
 */
export const getLeagueTypeFromRoute = (
  routePrefix: string,
): LeagueTypes | undefined => {
  return routePrefixToLeagueType[routePrefix];
};

/**
 * Find a league by its category route prefix and slug
 */
export const findLeagueBySlug = (
  leaguesData: LeaguesData,
  categoryRoute: string,
  leagueSlug: string,
): League | undefined => {
  const leagueType = getLeagueTypeFromRoute(categoryRoute);
  if (!leagueType) {
    return undefined;
  }

  const leagues = leaguesData[leagueType];
  if (!Array.isArray(leagues)) {
    return undefined;
  }

  return leagues.find(
    (league) => titleToSlug(league.title) === leagueSlug,
  );
};

/**
 * Get all leagues for a given category route prefix
 */
export const getLeaguesForCategory = (
  leaguesData: LeaguesData,
  categoryRoute: string,
): League[] => {
  const leagueType = getLeagueTypeFromRoute(categoryRoute);
  if (!leagueType) {
    return [];
  }

  const leagues = leaguesData[leagueType];
  return Array.isArray(leagues) ? leagues : [];
};

/**
 * Get all leagues across all categories as a flat array
 */
export const getAllLeagues = (leaguesData: LeaguesData): League[] => {
  const leagues: League[] = [];
  Object.values(leaguesData).forEach((leagueArray) => {
    if (Array.isArray(leagueArray)) {
      leagues.push(...leagueArray);
    }
  });
  return leagues;
};

/**
 * Get the league theme index for color lookup.
 * Returns the index of this league within its category's theme config.
 */
export const getLeagueThemeIndex = (
  categoryRoute: string,
  leagueSlug: string,
): number => {
  const category = Object.values(categoryThemes).find(
    (cat) => cat.routePrefix === categoryRoute,
  );
  if (!category) {
    return 0;
  }
  const index = category.leagues.findIndex(
    (l) => l.slug === leagueSlug,
  );
  return index >= 0 ? index : 0;
};

/**
 * Build the route path for a league
 */
export const buildLeagueRoute = (
  categoryRoute: string,
  leagueTitle: string,
): string => {
  return `/music-league/${categoryRoute}/${titleToSlug(leagueTitle)}`;
};

/**
 * Build the route path for a category
 */
export const buildCategoryRoute = (categoryRoute: string): string => {
  return `/music-league/${categoryRoute}`;
};
