/**
 * @file types.ts
 * @description TypeScript type definitions for Music League components
 */

import { type LeagueTypes } from '@/shared/types/leagueTypes';

import type { League } from '@/shared/utils/dataProcessing';
import type { ReactNode } from 'react';

/**
 * League category interface for dashboard display
 */
export interface LeagueCategory {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  leagueCount: number;
  totalParticipants: number;
  color: string;
  leagues: League[];
}

/**
 * Leagues data structure by type
 */
export interface LeaguesData {
  [LeagueTypes.NormalLeagues]?: League[];
  [LeagueTypes.WordsLeagues]?: League[];
  [LeagueTypes.CoffeeLeagues]?: League[];
  [LeagueTypes.HOSLeagues]?: League[];
}

/**
 * Top standing interface for leaderboards
 */
export interface TopStanding {
  rank: number;
  name: string;
  points: number;
  league: string;
}

/**
 * Navigation state for dashboard routing
 */
export type NavigationState = {
  view:
    | 'home'
    | 'leagues'
    | 'playlists'
    | 'league-details'
    | 'explore-data';
  selectedCategory?: string;
  selectedCategoryId?: string; // Added for category tracking
  selectedLeague?: League;
  breadcrumb: string[];
};

/**
 * Playlist category type for playlist navigation
 */
export type PlaylistCategory = '1001' | 'words' | 'coffee' | 'hos';

/**
 * Tab selection type for league details
 */
export type LeagueTabSelection = 'standings' | 'rounds' | 'analysis';

/**
 * Playlist category configuration
 */
export interface PlaylistCategoryConfig {
  id: PlaylistCategory;
  name: string;
  icon: ReactNode;
  description: string;
  color: string;
}

/**
 * Round category mapping configuration
 */
export interface RoundCategoryMapping {
  files: string[];
  basePath: string;
  label: string;
}
