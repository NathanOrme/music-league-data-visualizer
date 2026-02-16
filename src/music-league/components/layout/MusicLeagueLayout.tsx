/**
 * @file MusicLeagueLayout.tsx
 * @description Shared layout wrapper for all Music League pages.
 * Provides the sub-navigation and data provider context.
 */

import { LeagueDataProvider } from '@/music-league/contexts/LeagueDataContext';
import { mlLayout } from '@/music-league/styles/music-league-theme';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MusicLeagueNav } from './MusicLeagueNav';

/**
 * MusicLeagueLayout wraps all music league routes with:
 * - LeagueDataProvider (data context)
 * - Sub-navigation bar
 * - Consistent page styling
 */
export const MusicLeagueLayout: FC = () => {
  return (
    <LeagueDataProvider>
      <div className={mlLayout.page}>
        <MusicLeagueNav />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </LeagueDataProvider>
  );
};
