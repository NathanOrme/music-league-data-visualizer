/**
 * @file utils.tsx
 * @description Utility functions for Music League components
 */

import { LeagueTypes } from '@/shared/types/leagueTypes';
import {
  coffeeLeagueFiles,
  headOfSteamLeagueFiles,
  leagueFiles,
  wordsLeagueFiles,
} from '@/shared/utils/dataProcessing';

import type { League } from '@/shared/utils/dataProcessing';
import { Beer, Coffee, FileText, MapPin } from 'lucide-react';
import type {
  LeagueCategory,
  LeaguesData,
  PlaylistCategory,
  RoundCategoryMapping,
  TopStanding,
} from './types';

/**
 * Helper function to get league category data from real league data
 */
export const getLeagueCategoryData = (
  leaguesData: LeaguesData | null,
): LeagueCategory[] => {
  const categories: LeagueCategory[] = [];

  if (!leaguesData) {
    return categories;
  }

  if (leaguesData[LeagueTypes.NormalLeagues]?.length) {
    categories.push({
      id: '1001-leagues',
      name: '1001 Leagues',
      icon: <MapPin className="h-5 w-5" />,
      description: 'Classic album discovery leagues',
      leagueCount: leaguesData[LeagueTypes.NormalLeagues].length,
      totalParticipants: leaguesData[
        LeagueTypes.NormalLeagues
      ].reduce(
        (sum: number, league: League) =>
          sum + (league.competitors?.length ?? 0),
        0,
      ),
      color: 'from-purple-500 to-blue-500',
      leagues: leaguesData[LeagueTypes.NormalLeagues],
    });
  }

  if (leaguesData[LeagueTypes.WordsLeagues]?.length) {
    categories.push({
      id: 'words-leagues',
      name: '1001 Words Leagues',
      icon: <FileText className="h-5 w-5" />,
      description: 'Word-based music discovery',
      leagueCount: leaguesData[LeagueTypes.WordsLeagues].length,
      totalParticipants: leaguesData[LeagueTypes.WordsLeagues].reduce(
        (sum: number, league: League) =>
          sum + (league.competitors?.length ?? 0),
        0,
      ),
      color: 'from-green-500 to-teal-500',
      leagues: leaguesData[LeagueTypes.WordsLeagues],
    });
  }

  if (leaguesData[LeagueTypes.CoffeeLeagues]?.length) {
    categories.push({
      id: 'coffee-tunes',
      name: 'Coffee &amp; Tunes',
      icon: <Coffee className="h-5 w-5" />,
      description: 'Cozy music exploration',
      leagueCount: leaguesData[LeagueTypes.CoffeeLeagues].length,
      totalParticipants: leaguesData[
        LeagueTypes.CoffeeLeagues
      ].reduce(
        (sum: number, league: League) =>
          sum + (league.competitors?.length ?? 0),
        0,
      ),
      color: 'from-orange-500 to-red-500',
      leagues: leaguesData[LeagueTypes.CoffeeLeagues],
    });
  }

  if (leaguesData[LeagueTypes.HOSLeagues]?.length) {
    categories.push({
      id: 'head-of-steam',
      name: 'Head of Steam',
      icon: <Beer className="h-5 w-5" />,
      description: 'Pub music enthusiasts',
      leagueCount: leaguesData[LeagueTypes.HOSLeagues].length,
      totalParticipants: leaguesData[LeagueTypes.HOSLeagues].reduce(
        (sum: number, league: League) =>
          sum + (league.competitors?.length ?? 0),
        0,
      ),
      color: 'from-yellow-500 to-orange-500',
      leagues: leaguesData[LeagueTypes.HOSLeagues],
    });
  }

  return categories;
};

/**
 * Helper function to get top standings from real league data
 */
export const getTopStandings = (
  leaguesData: LeaguesData | null,
): TopStanding[] => {
  const overallMap = new Map<string, number>();

  // Add null check to prevent "Cannot convert undefined or null to object" errors
  if (!leaguesData) {
    return [];
  }

  // Collect standings from all leagues using the same logic as getCombinedOverallStandings
  Object.values(leaguesData).forEach(
    (leagues: League[] | undefined) => {
      if (leagues && Array.isArray(leagues)) {
        leagues.forEach((league: League) => {
          league.leagueStandings?.forEach((standing) => {
            const currentPoints = overallMap.get(standing.name) || 0;
            overallMap.set(
              standing.name,
              currentPoints + standing.points,
            );
          });
        });
      }
    },
  );

  // Convert map to array and sort by points
  const allStandings = Array.from(overallMap.entries()).map(
    ([name, points]) => ({
      rank: 0, // Will be set after sorting
      name,
      points,
      league: 'Combined',
    }),
  );

  // Sort by points and assign ranks, return top 5
  return allStandings
    .toSorted((a, b) => b.points - a.points)
    .slice(0, 5)
    .map((standing, index) => ({ ...standing, rank: index + 1 }));
};

/**
 * Get leagues for a specific category
 */
export const getCategoryLeagues = (
  categoryId: string,
  leaguesData: LeaguesData | null,
): League[] => {
  const categoryMapping = {
    '1001-leagues': LeagueTypes.NormalLeagues,
    'words-leagues': LeagueTypes.WordsLeagues,
    'coffee-tunes': LeagueTypes.CoffeeLeagues,
    'head-of-steam': LeagueTypes.HOSLeagues,
  };

  const leagueType =
    categoryMapping[categoryId as keyof typeof categoryMapping];
  return leaguesData?.[leagueType] || [];
};

/**
 * Round category mapping configuration
 */
export const getRoundCategoryMapping = (): Record<
  PlaylistCategory,
  RoundCategoryMapping
> => ({
  '1001': {
    files: leagueFiles.map((file) => file.fileName),
    basePath: '/league-zip',
    label: '1001 Leagues Under The Sea',
  },
  words: {
    files: wordsLeagueFiles.map((file) => file.fileName),
    basePath: '/words-zip',
    label: 'Words Leagues',
  },
  coffee: {
    files: coffeeLeagueFiles.map((file) => file.fileName),
    basePath: '/coffee-zip',
    label: 'Coffee &amp; Tunes Leagues',
  },
  hos: {
    files: headOfSteamLeagueFiles.map((file) => file.fileName),
    basePath: '/hos-zip',
    label: 'Head of Steam Enthusiasts',
  },
});

/**
 * Get playlist categories configuration
 */
export const getPlaylistCategories = () => [
  {
    id: '1001' as const,
    label: '1001 Leagues',
    icon: '🎵',
    description: 'Classic album discovery playlists',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'words' as const,
    label: 'Words Leagues',
    icon: '📝',
    description: 'Word-based music playlists',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'coffee' as const,
    label: 'Coffee &amp; Tunes',
    icon: '☕',
    description: 'Cozy music exploration playlists',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'hos' as const,
    label: 'Head of Steam',
    icon: '🍺',
    description: 'Pub music enthusiast playlists',
    color: 'from-yellow-500 to-orange-500',
  },
];
