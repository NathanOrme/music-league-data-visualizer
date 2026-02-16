/**
 * @file AnalyticsPage.tsx
 * @description Cross-league analytics dashboard with D3 visualizations.
 * Shows overall stats plus per-category breakdowns via tabs.
 */

import CategoryDonutChart from '@/music-league/components/charts/CategoryDonutChart';
import PointsDistributionChart from '@/music-league/components/charts/PointsDistributionChart';
import TopArtistsChart from '@/music-league/components/charts/TopArtistsChart';
import VotingActivityChart from '@/music-league/components/charts/VotingActivityChart';
import {
  allCategories,
  categoryThemes,
} from '@/music-league/config/league-themes';
import type { LeaguesData } from '@/music-league/contexts/LeagueDataContext';
import { LeagueDataContext } from '@/music-league/contexts/LeagueDataContext';
import {
  accentGradientStyle,
  mlCard,
  mlLayout,
  mlTabs,
  mlText,
} from '@/music-league/styles/music-league-theme';
import {
  getAllLeagues,
  getLeaguesForCategory,
} from '@/music-league/utils/slugUtils';
import type { League } from '@/shared/utils/dataProcessing';
import {
  BarChart3,
  Crown,
  Disc3,
  Loader2,
  Music,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { type FC, useContext, useMemo, useState } from 'react';

type AnalyticsTab = 'overall' | string;

const AnalyticsPage: FC = () => {
  const { leaguesData, loading } = useContext(LeagueDataContext);
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('overall');

  const categories = useMemo(() => allCategories(), []);

  const tabs = useMemo(
    () => [
      { value: 'overall', label: 'Overall', accent: '#A78BFA' },
      ...categories.map((cat) => ({
        value: cat.routePrefix,
        label: cat.name,
        accent: cat.accent,
      })),
    ],
    [categories],
  );

  const activeAccent =
    tabs.find((t) => t.value === activeTab)?.accent || '#A78BFA';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={mlLayout.container}>
      <header className="pt-10 pb-8">
        <h1 className={`${mlText.h1} mb-2 flex items-center gap-3`}>
          <BarChart3 className="w-8 h-8 text-purple-400" />
          Analytics
        </h1>
        <p className={mlText.body}>
          Insights and statistics across all leagues.
        </p>
      </header>

      {/* Tabs */}
      <div className={mlTabs.container}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={
              activeTab === tab.value ? mlTabs.tabActive : mlTabs.tab
            }
            style={
              activeTab === tab.value
                ? { borderBottomColor: tab.accent }
                : undefined
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pb-12">
        {activeTab === 'overall' ? (
          <OverallAnalytics leaguesData={leaguesData} />
        ) : (
          <CategoryAnalytics
            leaguesData={leaguesData}
            categoryRoute={activeTab}
            accent={activeAccent}
          />
        )}
      </div>
    </div>
  );
};

// ─── Overall Analytics ──────────────────────────────────────────────

const OverallAnalytics: FC<{ leaguesData: LeaguesData }> = ({
  leaguesData,
}) => {
  const allLeagues = useMemo(
    () => getAllLeagues(leaguesData),
    [leaguesData],
  );

  const stats = useMemo(() => computeStats(allLeagues), [allLeagues]);

  const categoryChartData = useMemo(() => {
    const categories = allCategories();
    return {
      submissions: categories.map((cat) => {
        const leagues = getLeaguesForCategory(
          leaguesData,
          cat.routePrefix,
        );
        return {
          name: cat.name,
          value: leagues.reduce(
            (sum, l) => sum + (l.submissions?.length || 0),
            0,
          ),
          color: cat.accent,
        };
      }),
      rounds: categories.map((cat) => {
        const leagues = getLeaguesForCategory(
          leaguesData,
          cat.routePrefix,
        );
        return {
          name: cat.name,
          value: leagues.reduce((sum, l) => sum + l.rounds.length, 0),
          color: cat.accent,
        };
      }),
    };
  }, [leaguesData]);

  const leaguePointsData = useMemo(
    () => computeLeaguePoints(allLeagues, leaguesData),
    [allLeagues, leaguesData],
  );

  const votingActivityData = useMemo(
    () => computeVotingActivity(allLeagues),
    [allLeagues],
  );

  const topWinners = useMemo(
    () => computeTopWinners(allLeagues),
    [allLeagues],
  );

  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<Disc3 className="w-5 h-5 text-blue-400" />}
            value={stats.leagues}
            label="Leagues"
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-emerald-400" />}
            value={stats.participants}
            label="Players"
          />
          <StatCard
            icon={<Target className="w-5 h-5 text-purple-400" />}
            value={stats.rounds}
            label="Rounds"
          />
          <StatCard
            icon={<Music className="w-5 h-5 text-pink-400" />}
            value={stats.songs}
            label="Songs"
          />
          <StatCard
            icon={<BarChart3 className="w-5 h-5 text-amber-400" />}
            value={stats.votes}
            label="Votes"
          />
        </div>
      </section>

      {/* Category Distribution Donuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDonutChart
          data={categoryChartData.submissions}
          title="Submissions by Category"
        />
        <CategoryDonutChart
          data={categoryChartData.rounds}
          title="Rounds by Category"
        />
      </div>

      {/* Voting Activity */}
      {votingActivityData.length > 0 && (
        <section>
          <h2 className={`${mlText.h3} mb-4`}>
            Voting & Submission Activity
          </h2>
          <VotingActivityChart
            data={votingActivityData}
            accentColor="#A78BFA"
          />
        </section>
      )}

      {/* Points per League */}
      {leaguePointsData.length > 0 && (
        <section>
          <h2 className={`${mlText.h3} mb-4`}>
            Average Points per Round by League
          </h2>
          <PointsDistributionChart data={leaguePointsData} />
        </section>
      )}

      {/* Top Artists */}
      <section>
        <h2 className={`${mlText.h3} mb-4`}>Top Submitted Artists</h2>
        <TopArtistsChart
          data={stats.topArtists}
          accentColor="#A78BFA"
        />
      </section>

      {/* Top Round Winners */}
      <WinnersTable winners={topWinners} accentColor="#F59E0B" />
    </div>
  );
};

// ─── Per-Category Analytics ─────────────────────────────────────────

const CategoryAnalytics: FC<{
  leaguesData: LeaguesData;
  categoryRoute: string;
  accent: string;
}> = ({ leaguesData, categoryRoute, accent }) => {
  const category = useMemo(
    () =>
      Object.values(categoryThemes).find(
        (c) => c.routePrefix === categoryRoute,
      ),
    [categoryRoute],
  );

  const leagues = useMemo(
    () => getLeaguesForCategory(leaguesData, categoryRoute),
    [leaguesData, categoryRoute],
  );

  const stats = useMemo(() => computeStats(leagues), [leagues]);

  const leaguePointsData = useMemo(() => {
    return leagues
      .filter((league) => league.leagueStandings.length > 0)
      .map((league) => {
        const totalPoints = league.leagueStandings.reduce(
          (sum, s) => sum + s.points,
          0,
        );
        const avgPoints =
          league.rounds.length > 0
            ? totalPoints / league.rounds.length
            : 0;
        return {
          league:
            league.title.length > 20
              ? league.title.substring(0, 20) + '...'
              : league.title,
          avgPoints: Math.round(avgPoints * 10) / 10,
          color: accent,
        };
      });
  }, [leagues, accent]);

  const votingActivityData = useMemo(
    () => computeVotingActivity(leagues),
    [leagues],
  );

  const topWinners = useMemo(
    () => computeTopWinners(leagues),
    [leagues],
  );

  // Per-league submission donut
  const leagueSubmissionDonut = useMemo(
    () =>
      leagues.map((l, i) => ({
        name:
          l.title.length > 18
            ? l.title.substring(0, 18) + '...'
            : l.title,
        value: l.submissions?.length || 0,
        color: interpolateColor(accent, i, leagues.length),
      })),
    [leagues, accent],
  );

  // Per-league standings comparison: top scorer from each league
  const topScorers = useMemo(() => {
    return leagues
      .filter((l) => l.leagueStandings.length > 0)
      .map((l) => ({
        league: l.title,
        name: l.leagueStandings[0].name,
        points: l.leagueStandings[0].points,
      }));
  }, [leagues]);

  if (!category || leagues.length === 0) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className={mlText.body}>
          No data available for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Category Header */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={accentGradientStyle(category.gradient, 0.1)}
      >
        <h2 className={mlText.h2} style={{ color: accent }}>
          {category.name}
        </h2>
        <p className={`${mlText.body} mt-1`}>
          {category.description}
        </p>
      </div>

      {/* Stat Cards */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            icon={
              <Disc3 className="w-5 h-5" style={{ color: accent }} />
            }
            value={stats.leagues}
            label="Leagues"
          />
          <StatCard
            icon={
              <Users className="w-5 h-5" style={{ color: accent }} />
            }
            value={stats.participants}
            label="Players"
          />
          <StatCard
            icon={
              <Target className="w-5 h-5" style={{ color: accent }} />
            }
            value={stats.rounds}
            label="Rounds"
          />
          <StatCard
            icon={
              <Music className="w-5 h-5" style={{ color: accent }} />
            }
            value={stats.songs}
            label="Songs"
          />
          <StatCard
            icon={
              <BarChart3
                className="w-5 h-5"
                style={{ color: accent }}
              />
            }
            value={stats.votes}
            label="Votes"
          />
        </div>
      </section>

      {/* Per-League Submissions Donut + Top Scorers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leagueSubmissionDonut.length > 1 && (
          <CategoryDonutChart
            data={leagueSubmissionDonut}
            title="Submissions by League"
          />
        )}
        {topScorers.length > 0 && (
          <div className={mlCard.base + ' p-5'}>
            <h3 className={`${mlText.h4} mb-4 text-center`}>
              Top Scorer per League
            </h3>
            <div className="divide-y divide-white/[0.06]">
              {topScorers.map((scorer) => (
                <div
                  key={scorer.league}
                  className="flex items-center gap-3 py-3"
                >
                  <Crown
                    className="w-4 h-4 shrink-0"
                    style={{ color: accent }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {scorer.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {scorer.league}
                    </p>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: accent }}
                  >
                    {scorer.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voting Activity */}
      {votingActivityData.length > 0 && (
        <section>
          <h2 className={`${mlText.h3} mb-4`}>
            Voting & Submission Activity
          </h2>
          <VotingActivityChart
            data={votingActivityData}
            accentColor={accent}
          />
        </section>
      )}

      {/* Points per League */}
      {leaguePointsData.length > 1 && (
        <section>
          <h2 className={`${mlText.h3} mb-4`}>
            Average Points per Round
          </h2>
          <PointsDistributionChart data={leaguePointsData} />
        </section>
      )}

      {/* Top Artists */}
      <section>
        <h2 className={`${mlText.h3} mb-4`}>Top Submitted Artists</h2>
        <TopArtistsChart
          data={stats.topArtists}
          accentColor={accent}
        />
      </section>

      {/* Top Round Winners */}
      <WinnersTable winners={topWinners} accentColor={accent} />
    </div>
  );
};

// ─── Shared Components ──────────────────────────────────────────────

const StatCard: FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <div className={`${mlCard.base} p-5 text-center`}>
    <div className="flex justify-center mb-2">{icon}</div>
    <div className={mlText.stat}>{value}</div>
    <div className={mlText.statLabel}>{label}</div>
  </div>
);

const WinnersTable: FC<{
  winners: [string, number][];
  accentColor: string;
}> = ({ winners, accentColor }) => {
  if (winners.length === 0) {
    return null;
  }

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <section>
      <h2 className={`${mlText.h3} mb-4 flex items-center gap-2`}>
        <Trophy className="w-5 h-5" style={{ color: accentColor }} />
        Most Round Wins
      </h2>
      <div className={mlCard.base}>
        <div className="divide-y divide-white/[0.06]">
          {winners.map(([name, wins], index) => {
            const barWidth = (wins / (winners[0]?.[1] || 1)) * 100;

            return (
              <div
                key={name}
                className="flex items-center gap-4 px-5 py-3 relative"
              >
                <div
                  className="absolute inset-0 rounded-lg opacity-[0.04]"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: accentColor,
                  }}
                />
                <span className="relative w-6 text-center">
                  {index < 3 ? (
                    <span className="text-base">{medals[index]}</span>
                  ) : (
                    <span className="text-xs font-medium text-zinc-500">
                      {index + 1}
                    </span>
                  )}
                </span>
                <span className="relative flex-1 text-sm font-medium text-white">
                  {name}
                </span>
                <span className="relative text-sm text-zinc-400">
                  {wins} win{wins !== 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Data Helpers ───────────────────────────────────────────────────

function computeStats(leagues: League[]) {
  const participants = new Set<string>();
  let totalRounds = 0;
  let totalSongs = 0;
  let totalVotes = 0;

  leagues.forEach((league) => {
    league.leagueStandings.forEach((s) => {
      if (s.name) {
        participants.add(s.name);
      }
    });
    totalRounds += league.rounds.length;
    totalSongs += league.submissions?.length || 0;
    totalVotes += league.votes?.length || 0;
  });

  const artistCounts: Record<string, number> = {};
  leagues.forEach((league) => {
    league.submissions?.forEach((s) => {
      const artist = s['Artist(s)'];
      if (artist) {
        artistCounts[artist] = (artistCounts[artist] || 0) + 1;
      }
    });
  });
  const topArtists = Object.entries(artistCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);

  return {
    leagues: leagues.length,
    participants: participants.size,
    rounds: totalRounds,
    songs: totalSongs,
    votes: totalVotes,
    topArtists,
  };
}

function computeLeaguePoints(
  allLeagues: League[],
  leaguesData: Record<string, League[] | null>,
) {
  const leagueTypeToColor: Record<string, string> = {};
  Object.entries(categoryThemes).forEach(([key, theme]) => {
    leagueTypeToColor[key] = theme.accent;
  });

  return allLeagues
    .filter((league) => league.leagueStandings.length > 0)
    .map((league) => {
      const totalPoints = league.leagueStandings.reduce(
        (sum, s) => sum + s.points,
        0,
      );
      const avgPoints =
        league.rounds.length > 0
          ? totalPoints / league.rounds.length
          : 0;

      const leagueType = findLeagueType(leaguesData, league);
      const color = leagueType
        ? leagueTypeToColor[leagueType] || '#A78BFA'
        : '#A78BFA';

      return {
        league:
          league.title.length > 20
            ? league.title.substring(0, 20) + '...'
            : league.title,
        avgPoints: Math.round(avgPoints * 10) / 10,
        color,
      };
    });
}

function computeVotingActivity(leagues: League[]) {
  const maxRounds = Math.max(
    ...leagues.map((l) => l.rounds.length),
    0,
  );
  const points: {
    round: string;
    votes: number;
    submissions: number;
  }[] = [];

  for (let i = 0; i < Math.min(maxRounds, 30); i++) {
    let votes = 0;
    let submissions = 0;

    leagues.forEach((league) => {
      const round = league.rounds[i];
      if (!round) {
        return;
      }
      const roundVotes =
        league.votes?.filter((v) => v['Round ID'] === round.id) || [];
      const roundSubs =
        league.submissions?.filter(
          (s) => s['Round ID'] === round.id,
        ) || [];
      votes += roundVotes.length;
      submissions += roundSubs.length;
    });

    points.push({ round: `R${i + 1}`, votes, submissions });
  }

  return points;
}

function computeTopWinners(leagues: League[]): [string, number][] {
  const winCounts: Record<string, number> = {};
  leagues.forEach((league) => {
    league.rounds.forEach((round) => {
      const winner = round.standings?.[0];
      if (winner?.name) {
        winCounts[winner.name] = (winCounts[winner.name] || 0) + 1;
      }
    });
  });
  return Object.entries(winCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}

function findLeagueType(
  leaguesData: Record<string, League[] | null>,
  league: League,
): string | undefined {
  for (const [key, leagues] of Object.entries(leaguesData)) {
    if (Array.isArray(leagues) && leagues.includes(league)) {
      return key;
    }
  }
  return undefined;
}

/**
 * Generate slightly varied colors for per-league items within a category.
 * Shifts hue/lightness slightly for each league.
 */
function interpolateColor(
  baseHex: string,
  index: number,
  total: number,
): string {
  if (total <= 1) {
    return baseHex;
  }

  // Parse hex
  const r = parseInt(baseHex.slice(1, 3), 16);
  const g = parseInt(baseHex.slice(3, 5), 16);
  const b = parseInt(baseHex.slice(5, 7), 16);

  // Shift each channel slightly
  const shift = (index / (total - 1) - 0.5) * 60;
  const clamp = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)));

  return `#${clamp(r + shift)
    .toString(16)
    .padStart(2, '0')}${clamp(g - shift * 0.5)
    .toString(16)
    .padStart(2, '0')}${clamp(b + shift * 0.3)
    .toString(16)
    .padStart(2, '0')}`;
}

export default AnalyticsPage;
