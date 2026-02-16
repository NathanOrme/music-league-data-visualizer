/**
 * @file LeaguesView.tsx
 * @description Leagues view component with modern design
 */

import { musicLeagueStyles } from '@/music-league/styles/music-league.styles';
import { ArrowRight, Music } from 'lucide-react';
import { type FC, memo } from 'react';

import type { LeagueCategory } from './types';

interface LeaguesViewProps {
  leagueCategories: LeagueCategory[];
  onNavigateToCategory: (
    categoryId: string,
    categoryName: string,
  ) => void;
}

/**
 * Leagues View Component
 */
export const LeaguesView: FC<LeaguesViewProps> = memo(
  ({ leagueCategories, onNavigateToCategory }) => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className={musicLeagueStyles.text.hero}>
          League Categories
        </h1>
        <p className={musicLeagueStyles.text.body}>
          Choose from our diverse collection of music league
          categories, each with its own unique theme and community.
        </p>
      </div>

      {/* Categories Grid */}
      <div className={musicLeagueStyles.layout.grid}>
        {leagueCategories.map((category) => {
          const categoryStyles =
            musicLeagueStyles.categories[
              category.id as keyof typeof musicLeagueStyles.categories
            ];

          return (
            <button
              type="button"
              key={category.id}
              onClick={() =>
                onNavigateToCategory(category.id, category.name)
              }
              className={`${musicLeagueStyles.cards.base} ${musicLeagueStyles.cards.hover} ${categoryStyles?.gradient} ${categoryStyles?.border} cursor-pointer transform hover:scale-105 transition-all duration-300 text-left`}
            >
              <div className={musicLeagueStyles.cards.content}>
                {/* Category Icon &amp; Badge */}
                <div className={musicLeagueStyles.cards.header}>
                  <div className={`text-4xl ${categoryStyles?.icon}`}>
                    {category.icon}
                  </div>
                  <div className={musicLeagueStyles.cards.category}>
                    {category.leagueCount} leagues
                  </div>
                </div>

                {/* Category Info */}
                <h3 className={musicLeagueStyles.cards.title}>
                  {category.name}
                </h3>
                <p
                  className={`${musicLeagueStyles.cards.body} line-clamp-3`}
                >
                  {category.description}
                </p>

                {/* Stats &amp; Action */}
                <div className={musicLeagueStyles.cards.footer}>
                  <div className="flex flex-col space-y-1">
                    <span
                      className={`${categoryStyles?.accent} text-sm font-medium`}
                    >
                      {category.totalParticipants} participants
                    </span>
                    <span className={musicLeagueStyles.text.muted}>
                      {category.leagues.length > 0
                        ? `${category.leagues[0].name} +${category.leagues.length - 1} more`
                        : 'No leagues yet'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={musicLeagueStyles.buttons.ghost}>
                      Explore
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {leagueCategories.length === 0 && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className={musicLeagueStyles.text.subheading}>
            No categories available
          </h3>
          <p className={musicLeagueStyles.text.muted}>
            Categories will appear here once league data is loaded.
          </p>
        </div>
      )}
    </div>
  ),
);

LeaguesView.displayName = 'LeaguesView';

export default LeaguesView;
