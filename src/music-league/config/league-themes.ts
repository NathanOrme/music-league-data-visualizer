/**
 * @file league-themes.ts
 * @description Per-category and per-league color theming configuration.
 * Each league category has a distinctive accent color, and each league
 * within a category gets a unique gradient for visual differentiation.
 */

import { LeagueTypes } from '@/shared/types/leagueTypes';

export interface LeagueTheme {
  slug: string;
  accent: string;
  gradient: [string, string];
}

export interface CategoryTheme {
  id: string;
  name: string;
  description: string;
  accent: string;
  accentMuted: string;
  gradient: [string, string];
  leagues: LeagueTheme[];
  routePrefix: string;
}

/**
 * Category theme configurations indexed by LeagueTypes
 */
export const categoryThemes: Record<LeagueTypes, CategoryTheme> = {
  [LeagueTypes.NormalLeagues]: {
    id: '1001-leagues',
    name: '1001 Leagues',
    description: 'The flagship league series',
    accent: '#3B82F6',
    accentMuted: '#1E3A5F',
    gradient: ['#1E40AF', '#3B82F6'],
    routePrefix: '1001-leagues',
    leagues: [
      {
        slug: 'under-the-sea',
        accent: '#2563EB',
        gradient: ['#1E40AF', '#3B82F6'],
      },
      {
        slug: 'electric-boogaloo',
        accent: '#6366F1',
        gradient: ['#4338CA', '#818CF8'],
      },
      {
        slug: 'with-a-vengeance',
        accent: '#0EA5E9',
        gradient: ['#0369A1', '#38BDF8'],
      },
      {
        slug: 'a-to-z',
        accent: '#8B5CF6',
        gradient: ['#6D28D9', '#A78BFA'],
      },
      {
        slug: 'situations',
        accent: '#06B6D4',
        gradient: ['#0E7490', '#22D3EE'],
      },
      {
        slug: 'the-return',
        accent: '#3B82F6',
        gradient: ['#1D4ED8', '#60A5FA'],
      },
    ],
  },
  [LeagueTypes.WordsLeagues]: {
    id: 'words',
    name: 'Words',
    description: 'Word-themed musical challenges',
    accent: '#10B981',
    accentMuted: '#134E4A',
    gradient: ['#047857', '#10B981'],
    routePrefix: 'words',
    leagues: [
      {
        slug: '1001-words',
        accent: '#10B981',
        gradient: ['#047857', '#34D399'],
      },
      {
        slug: '1001-words-2',
        accent: '#14B8A6',
        gradient: ['#0D9488', '#2DD4BF'],
      },
    ],
  },
  [LeagueTypes.CoffeeLeagues]: {
    id: 'coffee',
    name: 'Coffee & Tunes',
    description: 'Music over a warm cup',
    accent: '#F59E0B',
    accentMuted: '#78350F',
    gradient: ['#B45309', '#F59E0B'],
    routePrefix: 'coffee',
    leagues: [
      {
        slug: 'coffee-and-tunes',
        accent: '#F59E0B',
        gradient: ['#B45309', '#FBBF24'],
      },
    ],
  },
  [LeagueTypes.HOSLeagues]: {
    id: 'head-of-steam',
    name: 'Head of Steam',
    description: 'Steam-powered music battles',
    accent: '#F43F5E',
    accentMuted: '#881337',
    gradient: ['#BE123C', '#F43F5E'],
    routePrefix: 'head-of-steam',
    leagues: [
      {
        slug: 'head-of-steam-enthusiasts',
        accent: '#F43F5E',
        gradient: ['#BE123C', '#FB7185'],
      },
    ],
  },
};

/**
 * Get the category theme for a given route prefix
 */
export const getCategoryByRoute = (
  routePrefix: string,
): CategoryTheme | undefined => {
  return Object.values(categoryThemes).find(
    (cat) => cat.routePrefix === routePrefix,
  );
};

/**
 * Get the league theme by category route prefix and league slug
 */
export const getLeagueTheme = (
  routePrefix: string,
  leagueSlug: string,
): LeagueTheme | undefined => {
  const category = getCategoryByRoute(routePrefix);
  return category?.leagues.find((l) => l.slug === leagueSlug);
};

/**
 * Get all category themes as an ordered array
 */
export const allCategories = (): CategoryTheme[] =>
  Object.values(categoryThemes);
