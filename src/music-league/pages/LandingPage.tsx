/**
 * @file LandingPage.tsx
 * @description Music League landing page with hero section, category cards, and quick stats.
 */

import {
  allCategories,
  type CategoryTheme,
} from '@/music-league/config/league-themes';
import { LeagueDataContext } from '@/music-league/contexts/LeagueDataContext';
import {
  accentGradientStyle,
  mlCard,
  mlLayout,
  mlText,
} from '@/music-league/styles/music-league-theme';
import {
  getAllLeagues,
  getLeaguesForCategory,
} from '@/music-league/utils/slugUtils';
import type { League } from '@/shared/utils/dataProcessing';
import {
  BarChart3,
  ChevronRight,
  Coffee,
  Disc3,
  ListMusic,
  Loader2,
  MessageSquare,
  Train,
  Users,
} from 'lucide-react';
import { type FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

const categoryIcon = (id: string) => {
  switch (id) {
    case '1001-leagues':
      return Disc3;
    case 'words':
      return MessageSquare;
    case 'coffee':
      return Coffee;
    case 'head-of-steam':
      return Train;
    default:
      return Disc3;
  }
};

const getParticipantCount = (leagues: League[]): number => {
  const names = new Set<string>();
  leagues.forEach((league) => {
    league.leagueStandings.forEach((standing) => {
      const legacyStanding = standing as { Name?: string };
      const name = standing.name || legacyStanding.Name;
      if (name) {
        names.add(name);
      }
    });
  });
  return names.size;
};

const LandingPage: FC = () => {
  const { leaguesData, loading, error } =
    useContext(LeagueDataContext);
  const categories = allCategories();

  const allLeaguesList = useMemo(
    () => getAllLeagues(leaguesData),
    [leaguesData],
  );

  const overallStats = useMemo(() => {
    const totalParticipants = getParticipantCount(allLeaguesList);
    const totalRounds = allLeaguesList.reduce(
      (sum, l) => sum + l.rounds.length,
      0,
    );
    const totalSongs = allLeaguesList.reduce(
      (sum, l) => sum + (l.submissions?.length || 0),
      0,
    );

    return {
      leagues: allLeaguesList.length,
      participants: totalParticipants,
      rounds: totalRounds,
      songs: totalSongs,
    };
  }, [allLeaguesList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
          <p className="text-sm text-zinc-500">
            Loading league data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className={mlText.h2}>Something went wrong</h2>
          <p className={mlText.body}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={mlLayout.container}>
      {/* Hero Section */}
      <header className="pt-12 pb-8 sm:pt-16 sm:pb-12 text-center">
        <h1 className={`${mlText.hero} mb-4`}>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Music League
          </span>
        </h1>
        <p className={`${mlText.body} max-w-2xl mx-auto mb-10`}>
          Discover leagues, explore playlists, and dive into the
          analytics of our music community.
        </p>

        {/* Overall Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <StatItem value={overallStats.leagues} label="Leagues" />
          <StatItem
            value={overallStats.participants}
            label="Players"
          />
          <StatItem value={overallStats.rounds} label="Rounds" />
          <StatItem value={overallStats.songs} label="Songs" />
        </div>
      </header>

      {/* Category Cards */}
      <section className="pb-12">
        <div className={mlLayout.grid.two}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              leagues={getLeaguesForCategory(
                leaguesData,
                cat.routePrefix,
              )}
            />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-12">
        <div className={mlLayout.grid.two}>
          <Link
            to="/music-league/playlists"
            className={`${mlCard.interactive} p-6 flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-[#1DB954]/10 flex items-center justify-center">
              <ListMusic className="w-6 h-6 text-[#1DB954]" />
            </div>
            <div className="flex-1">
              <h3 className={mlText.h4}>All Playlists</h3>
              <p className={mlText.caption}>
                Browse and listen to round playlists
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </Link>
          <Link
            to="/music-league/analytics"
            className={`${mlCard.interactive} p-6 flex items-center gap-4`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className={mlText.h4}>Analytics</h3>
              <p className={mlText.caption}>
                Charts and insights across all leagues
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const StatItem: FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div className="text-center">
    <div className={mlText.stat}>{value}</div>
    <div className={mlText.statLabel}>{label}</div>
  </div>
);

const CategoryCard: FC<{
  category: CategoryTheme;
  leagues: League[];
}> = ({ category, leagues }) => {
  const Icon = categoryIcon(category.id);
  const participants = getParticipantCount(leagues);
  const rounds = leagues.reduce((sum, l) => sum + l.rounds.length, 0);

  return (
    <Link
      to={`/music-league/${category.routePrefix}`}
      className={`${mlCard.interactive} overflow-hidden group`}
    >
      {/* Gradient accent bar */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${category.gradient[0]}, ${category.gradient[1]})`,
        }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={accentGradientStyle(category.gradient, 0.2)}
          >
            <Icon
              className="w-6 h-6"
              style={{ color: category.accent }}
            />
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </div>
        <h3 className={`${mlText.h3} mb-1`}>{category.name}</h3>
        <p className={`${mlText.caption} mb-4`}>
          {category.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <Disc3 className="w-3.5 h-3.5" />
            {leagues.length} league{leagues.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {participants} players
          </span>
          <span>{rounds} rounds</span>
        </div>
      </div>
    </Link>
  );
};

export default LandingPage;
