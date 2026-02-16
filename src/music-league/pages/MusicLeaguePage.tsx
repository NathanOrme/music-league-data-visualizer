/**
 * @file MusicLeaguePage.tsx
 * @description Entry point for the Music League multi-page experience.
 * Uses internal routing with a shared layout wrapper.
 */

import { MusicLeagueLayout } from '@/music-league/components/layout/MusicLeagueLayout';
import { SEOHelmet } from '@/shared/utils/seo';
import { lazy, Suspense, type FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const LandingPage = lazy(
  () => import('@/music-league/pages/LandingPage'),
);
const CategoryPage = lazy(
  () => import('@/music-league/pages/CategoryPage'),
);
const LeagueDetailPage = lazy(
  () => import('@/music-league/pages/LeagueDetailPage'),
);
const PlaylistsPage = lazy(
  () => import('@/music-league/pages/PlaylistsPage'),
);
const AnalyticsPage = lazy(
  () => import('@/music-league/pages/AnalyticsPage'),
);

const LoadingFallback: FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      <p className="text-sm text-zinc-500">Loading...</p>
    </div>
  </div>
);

export default function MusicLeaguePage() {
  return (
    <>
      <SEOHelmet
        pageKey="music-league"
        path="/music-league"
        appName="Music League Community"
        appDescription="Explore music leagues, discover curated playlists, and celebrate the best music picks in our community experience created by Nathan Orme"
        appCategory="WebApplication"
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<MusicLeagueLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="playlists" element={<PlaylistsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route
              path=":category/:leagueSlug"
              element={<LeagueDetailPage />}
            />
          </Route>
          {/* Redirect old URL */}
          <Route
            path="*"
            element={<Navigate to="/music-league" replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
}
