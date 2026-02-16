/**
 * @file LeagueDetailPage.tsx
 * @description Individual league detail page with tabbed navigation.
 * Shows Overview, Rounds, Standings, and Analytics for a specific league.
 */

import PrivacyToggle from '@/music-league/components/PrivacyToggle';
import {
  getCategoryByRoute,
  getLeagueTheme,
} from '@/music-league/config/league-themes';
import { LeagueDataContext } from '@/music-league/contexts/LeagueDataContext';
import { usePrivacyMode } from '@/music-league/hooks/usePrivacyMode';
import {
  accentGradientStyle,
  mlBadge,
  mlButton,
  mlCard,
  mlLayout,
  mlTable,
  mlTabs,
  mlText,
} from '@/music-league/styles/music-league-theme';
import {
  buildCategoryRoute,
  findLeagueBySlug,
} from '@/music-league/utils/slugUtils';
import type { League, Standing } from '@/shared/utils/dataProcessing';
import {
  ChevronLeft,
  Crown,
  ExternalLink,
  Loader2,
  Music,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { type FC, useContext, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

type LeagueTab = 'overview' | 'rounds' | 'standings';

const LeagueDetailPage: FC = () => {
  const { category: categoryRoute, leagueSlug } = useParams<{
    category: string;
    leagueSlug: string;
  }>();
  const { leaguesData, loading } = useContext(LeagueDataContext);
  const [activeTab, setActiveTab] = useState<LeagueTab>('overview');
  const { privacyMode, setPrivacyMode, displayName } =
    usePrivacyMode();

  const category = categoryRoute
    ? getCategoryByRoute(categoryRoute)
    : undefined;

  const league = useMemo(
    () =>
      categoryRoute && leagueSlug
        ? findLeagueBySlug(leaguesData, categoryRoute, leagueSlug)
        : undefined,
    [leaguesData, categoryRoute, leagueSlug],
  );

  const theme = useMemo(
    () =>
      categoryRoute && leagueSlug
        ? getLeagueTheme(categoryRoute, leagueSlug)
        : undefined,
    [categoryRoute, leagueSlug],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (!category || !league || !categoryRoute) {
    return <Navigate to="/music-league" replace />;
  }

  const accent = theme?.accent || category.accent;
  const gradient = theme?.gradient || category.gradient;
  const participantCount =
    league.competitors?.length || league.leagueStandings.length;

  const tabs: { value: LeagueTab; label: string }[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'rounds', label: 'Rounds' },
    { value: 'standings', label: 'Standings' },
  ];

  return (
    <div className={mlLayout.container}>
      {/* Back link */}
      <div className="pt-6 pb-2">
        <Link
          to={buildCategoryRoute(categoryRoute)}
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {category.name}
        </Link>
      </div>

      {/* League Hero */}
      <header
        className="rounded-2xl p-8 sm:p-10 mb-8"
        style={accentGradientStyle(gradient, 0.12)}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <span
              className={mlBadge.accent}
              style={{
                backgroundColor: `${accent}20`,
                color: accent,
              }}
            >
              {category.name}
            </span>
            <h1 className={`${mlText.h1} mt-3 mb-2`}>
              {league.title}
            </h1>
            <div className="flex items-center gap-5 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {participantCount} players
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                {league.rounds.length} rounds
              </span>
              {league.submissions && (
                <span className="flex items-center gap-1.5">
                  <Music className="w-4 h-4" />
                  {league.submissions.length} songs
                </span>
              )}
            </div>
          </div>
          {league.urls?.mainPlaylist && (
            <a
              href={league.urls.mainPlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className={mlButton.spotify}
            >
              <Music className="w-4 h-4" />
              Full Playlist
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </header>

      {/* Tabs + Privacy Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-1">
        <div className={mlTabs.container + ' !mb-0'}>
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={
                activeTab === tab.value
                  ? mlTabs.tabActive
                  : mlTabs.tab
              }
              style={
                activeTab === tab.value
                  ? { borderBottomColor: accent }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <PrivacyToggle mode={privacyMode} onChange={setPrivacyMode} />
      </div>

      {/* Tab Content */}
      <div className="pb-12">
        {activeTab === 'overview' && (
          <OverviewTab
            league={league}
            accent={accent}
            gradient={gradient}
            displayName={displayName}
          />
        )}
        {activeTab === 'rounds' && (
          <RoundsTab
            league={league}
            accent={accent}
            gradient={gradient}
            displayName={displayName}
          />
        )}
        {activeTab === 'standings' && (
          <StandingsTab
            league={league}
            accent={accent}
            gradient={gradient}
            displayName={displayName}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Overview Tab - Podium + recent rounds + quick links
 */
const OverviewTab: FC<{
  league: League;
  accent: string;
  gradient: [string, string];
  displayName: (name: string) => string;
}> = ({ league, accent, displayName }) => {
  const top3 = league.leagueStandings.slice(0, 3);
  const recentRounds = league.rounds.slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Podium */}
      {top3.length >= 3 && (
        <section>
          <h2 className={`${mlText.h3} mb-5 flex items-center gap-2`}>
            <Trophy className="w-5 h-5" style={{ color: accent }} />
            Top Performers
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* 2nd place */}
            <PodiumCard
              standing={top3[1]}
              rank={2}
              accent={accent}
              displayName={displayName}
            />
            {/* 1st place */}
            <PodiumCard
              standing={top3[0]}
              rank={1}
              accent={accent}
              displayName={displayName}
              featured
            />
            {/* 3rd place */}
            <PodiumCard
              standing={top3[2]}
              rank={3}
              accent={accent}
              displayName={displayName}
            />
          </div>
        </section>
      )}

      {/* Recent Rounds */}
      {recentRounds.length > 0 && (
        <section>
          <h2 className={`${mlText.h3} mb-4 flex items-center gap-2`}>
            <Target className="w-5 h-5" style={{ color: accent }} />
            Recent Rounds
          </h2>
          <div className={mlCard.base}>
            <div className="divide-y divide-white/[0.06]">
              {recentRounds.map((round) => (
                <div
                  key={round.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {round.name}
                    </p>
                    {round.description && (
                      <p className="text-xs text-zinc-500 truncate mt-0.5">
                        {round.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {round.standings?.[0] && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-yellow-400" />
                        {displayName(round.standings[0].name)}
                      </span>
                    )}
                    {round.playlist && (
                      <a
                        href={round.playlist}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1DB954] hover:text-[#1ED760] transition-colors"
                        aria-label={`Play ${round.name} playlist`}
                      >
                        <Music className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const PodiumCard: FC<{
  standing: Standing;
  rank: number;
  accent: string;
  displayName: (name: string) => string;
  featured?: boolean;
}> = ({ standing, rank, accent, displayName, featured = false }) => {
  const medals = ['', '🥇', '🥈', '🥉'];

  return (
    <div
      className={`${mlCard.base} p-4 sm:p-5 text-center ${featured ? 'ring-1 sm:scale-[1.02]' : ''}`}
      style={
        featured
          ? { ['--tw-ring-color' as string]: `${accent}40` }
          : undefined
      }
    >
      <div className="text-2xl sm:text-3xl mb-2">{medals[rank]}</div>
      <p className="text-sm sm:text-base font-semibold text-white truncate">
        {displayName(standing.name)}
      </p>
      <p
        className="text-lg sm:text-xl font-bold mt-1"
        style={{ color: accent }}
      >
        {standing.points} pts
      </p>
      {standing.song && (
        <p className="text-xs text-zinc-500 truncate mt-1">
          {standing.song}
        </p>
      )}
    </div>
  );
};

/**
 * Rounds Tab - All rounds in a list
 */
const RoundsTab: FC<{
  league: League;
  accent: string;
  gradient: [string, string];
  displayName: (name: string) => string;
}> = ({ league, accent, displayName }) => {
  const rounds = league.rounds;

  if (rounds.length === 0) {
    return (
      <div className="text-center py-16">
        <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className={mlText.body}>No rounds available yet</p>
      </div>
    );
  }

  return (
    <div className={mlCard.base}>
      <div className="divide-y divide-white/[0.06]">
        {rounds.map((round, index) => {
          const submissions =
            league.submissions?.filter(
              (s) => s['Round ID'] === round.id,
            ) || [];
          const winner = round.standings?.[0];

          return (
            <div
              key={round.id}
              className={`${mlTable.row} flex-wrap sm:flex-nowrap`}
            >
              <div
                className="w-8 text-center text-xs font-medium"
                style={{ color: accent }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {round.name}
                </p>
                {round.description && (
                  <p className="text-xs text-zinc-500 truncate">
                    {round.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{submissions.length} songs</span>
                {winner && (
                  <span className="flex items-center gap-1">
                    <Crown className="w-3 h-3 text-yellow-400" />
                    {displayName(winner.name)}
                  </span>
                )}
                {round.playlist && (
                  <a
                    href={round.playlist}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1DB954] hover:text-[#1ED760]"
                    aria-label={`Play ${round.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Standings Tab - Full leaderboard
 */
const StandingsTab: FC<{
  league: League;
  accent: string;
  gradient: [string, string];
  displayName: (name: string) => string;
}> = ({ league, accent, displayName }) => {
  const standings = league.leagueStandings;
  const maxPoints = standings[0]?.points || 1;

  if (standings.length === 0) {
    return (
      <div className="text-center py-16">
        <Trophy className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className={mlText.body}>No standings available yet</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className={`${mlText.h3} flex items-center gap-2`}>
          <Trophy className="w-5 h-5" style={{ color: accent }} />
          Final Standings
        </h2>
        <span className={mlText.caption}>
          {standings.length} participants
        </span>
      </div>

      <div className={mlCard.base}>
        <div className="divide-y divide-white/[0.06]">
          {standings.map((standing, index) => {
            const barWidth = (standing.points / maxPoints) * 100;
            const isTop3 = index < 3;
            const medals = ['🥇', '🥈', '🥉'];

            return (
              <div
                key={standing.name + index}
                className={`${mlTable.row} relative`}
              >
                {/* Position indicator bar */}
                <div
                  className="absolute inset-0 rounded-lg opacity-[0.04]"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: accent,
                  }}
                />
                <div className="relative flex items-center gap-4 w-full">
                  <div className="w-8 text-center">
                    {isTop3 ? (
                      <span className="text-lg">{medals[index]}</span>
                    ) : (
                      <span className="text-sm font-medium text-zinc-500">
                        {standing.position}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {displayName(standing.name)}
                    </p>
                    {standing.song && (
                      <p className="text-xs text-zinc-500 truncate">
                        {standing.song}
                      </p>
                    )}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={
                      isTop3
                        ? { color: accent }
                        : { color: '#A1A1AA' }
                    }
                  >
                    {standing.points} pts
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeagueDetailPage;
