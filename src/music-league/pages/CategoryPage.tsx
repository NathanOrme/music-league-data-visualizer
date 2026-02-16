/**
 * @file CategoryPage.tsx
 * @description Shows all leagues within a category with accent-colored cards.
 */

import {
  getCategoryByRoute,
  getLeagueTheme,
} from '@/music-league/config/league-themes';
import { LeagueDataContext } from '@/music-league/contexts/LeagueDataContext';
import { usePrivacyMode } from '@/music-league/hooks/usePrivacyMode';
import {
  accentGradientStyle,
  mlCard,
  mlLayout,
  mlText,
} from '@/music-league/styles/music-league-theme';
import {
  buildLeagueRoute,
  getLeaguesForCategory,
  titleToSlug,
} from '@/music-league/utils/slugUtils';
import type { League } from '@/shared/utils/dataProcessing';
import {
  ChevronRight,
  Crown,
  Disc3,
  Loader2,
  Music,
  Users,
} from 'lucide-react';
import { type FC, useContext, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

const CategoryPage: FC = () => {
  const { category: categoryRoute } = useParams<{
    category: string;
  }>();
  const { leaguesData, loading } = useContext(LeagueDataContext);
  const { displayName } = usePrivacyMode();

  const category = categoryRoute
    ? getCategoryByRoute(categoryRoute)
    : undefined;

  const leagues = useMemo(
    () =>
      categoryRoute
        ? getLeaguesForCategory(leaguesData, categoryRoute)
        : [],
    [leaguesData, categoryRoute],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (!category || !categoryRoute) {
    return <Navigate to="/music-league" replace />;
  }

  return (
    <div className={mlLayout.container}>
      {/* Category Header */}
      <header className="pt-10 pb-8">
        <div
          className="rounded-2xl p-8 sm:p-10 mb-8"
          style={accentGradientStyle(category.gradient, 0.12)}
        >
          <h1
            className={`${mlText.h1} mb-2`}
            style={{ color: category.accent }}
          >
            {category.name}
          </h1>
          <p className={mlText.body}>{category.description}</p>
          <div className="flex items-center gap-6 mt-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Disc3 className="w-4 h-4" />
              {leagues.length} league{leagues.length !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Music className="w-4 h-4" />
              {leagues.reduce(
                (sum, l) => sum + l.rounds.length,
                0,
              )}{' '}
              rounds
            </span>
          </div>
        </div>
      </header>

      {/* League Cards */}
      <section className="pb-12">
        <div className={mlLayout.grid.three}>
          {leagues.map((league) => (
            <LeagueCard
              key={league.title}
              league={league}
              categoryRoute={categoryRoute}
              displayName={displayName}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const LeagueCard: FC<{
  league: League;
  categoryRoute: string;
  displayName: (name: string) => string;
}> = ({ league, categoryRoute, displayName }) => {
  const slug = titleToSlug(league.title);
  const theme = getLeagueTheme(categoryRoute, slug);
  const accent = theme?.accent || '#3B82F6';
  const gradient =
    theme?.gradient || (['#1E40AF', '#3B82F6'] as [string, string]);

  const winner = league.leagueStandings[0];
  const participantCount =
    league.competitors?.length || league.leagueStandings.length;

  return (
    <Link
      to={buildLeagueRoute(categoryRoute, league.title)}
      className={`${mlCard.interactive} overflow-hidden group`}
    >
      {/* Gradient top bar */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
        }}
      />
      <div className="p-5">
        <h3
          className={`${mlText.h3} mb-3 group-hover:text-white transition-colors`}
        >
          {league.title}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {participantCount}
          </span>
          <span>{league.rounds.length} rounds</span>
          {league.submissions && (
            <span>{league.submissions.length} songs</span>
          )}
        </div>

        {/* Winner */}
        {winner && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
            style={accentGradientStyle(gradient, 0.1)}
          >
            <Crown
              className="w-3.5 h-3.5"
              style={{ color: accent }}
            />
            <span className="text-zinc-300 font-medium">
              {displayName(winner.name)}
            </span>
            <span className="text-zinc-500">{winner.points} pts</span>
          </div>
        )}

        {/* Arrow */}
        <div className="flex justify-end mt-4">
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryPage;
