/**
 * @file LeagueCategoryView.tsx
 * @description League category view component showing leagues within a specific category
 */
import { ArrowRight, Users } from 'lucide-react';
import { memo } from 'react';

import { Card, CardContent } from '@/shared/components/ui';

import { musicLeagueStyles } from '@/music-league/styles/music-league.styles';
import type { League } from '@/shared/utils/dataProcessing';
import type { FC } from 'react';
import type { LeagueCategory } from './types';

interface LeagueCategoryViewProps {
  category: LeagueCategory;
  onNavigateToLeague: (league: League) => void;
}

/**
 * League Category View Component
 */
export const LeagueCategoryView: FC<LeagueCategoryViewProps> = memo(
  ({ category, onNavigateToLeague }) => (
    <section className="space-y-4">
      <Card className={musicLeagueStyles.glass.primary}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-purple-400 text-3xl">
              {category.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {category.name}
              </h2>
              <p className="text-gray-300">{category.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">
                {category.leagueCount}
              </div>
              <div className="text-gray-400 text-sm">Leagues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">
                {category.totalParticipants}
              </div>
              <div className="text-gray-400 text-sm">
                Participants
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {category.leagues.reduce(
                  (sum, league) => sum + (league.rounds?.length || 0),
                  0,
                )}
              </div>
              <div className="text-gray-400 text-sm">
                Total Rounds
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {category.leagues.map((league, index) => (
          <Card
            key={`${league.title}-${index}`}
            className={musicLeagueStyles.glass.secondary}
          >
            <CardContent className="p-4">
              <button
                type="button"
                className="flex items-center justify-between cursor-pointer w-full text-left"
                onClick={() => onNavigateToLeague(league)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {league.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {league.competitors?.length || 0} participants •{' '}
                      {league.rounds?.length || 0} rounds
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  ),
);

LeagueCategoryView.displayName = 'LeagueCategoryView';
