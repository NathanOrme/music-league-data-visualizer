/**
 * @file StandingsView.tsx
 * @description Displays league standings with rankings and scores
 */

import { BlurFade, MagicCard } from '@/shared/components/magicui';
import { CardContent } from '@/shared/components/ui';
import type { League } from '@/shared/utils/dataProcessing';
import { Crown, Trophy } from 'lucide-react';
import type { FC } from 'react';

export interface StandingsViewProps {
  /** League data containing standings */
  league: League;
}

/**
 * Standings view component displaying league rankings
 */
export const StandingsView: FC<StandingsViewProps> = ({ league }) => {
  const standings = league.leagueStandings || [];

  if (standings.length === 0) {
    return (
      <BlurFade delay={0.2} inView>
        <MagicCard className="border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Standings Available
              </h3>
              <p className="text-gray-300">
                This league doesn't have standings data yet
              </p>
            </div>
          </CardContent>
        </MagicCard>
      </BlurFade>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Final Standings
          </h2>
          <div className="text-gray-400 text-sm">
            {standings.length} participants
          </div>
        </div>
      </BlurFade>

      {/* Podium - Top 3 */}
      {standings.length >= 3 && (
        <BlurFade delay={0.2} inView>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* 2nd Place */}
            <MagicCard className="border-gray-400/30 bg-gradient-to-br from-gray-400/10 to-gray-500/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="text-5xl mb-2">🥈</div>
                <div className="text-2xl font-bold text-gray-300">
                  {standings[1].position}
                </div>
                <div className="text-lg font-semibold text-white">
                  {standings[1].name}
                </div>
                {standings[1].song && (
                  <div className="text-sm text-gray-400 truncate">
                    &quot;{standings[1].song}&quot;
                  </div>
                )}
                <div className="text-xl font-bold text-gray-300">
                  {standings[1].points} pts
                </div>
              </CardContent>
            </MagicCard>

            {/* 1st Place */}
            <MagicCard className="border-yellow-400/40 bg-gradient-to-br from-yellow-400/20 to-orange-500/30 backdrop-blur-sm transform scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-yellow-300">
                  {standings[0].position}
                </div>
                <div className="text-xl font-bold text-white">
                  {standings[0].name}
                </div>
                {standings[0].song && (
                  <div className="text-sm text-gray-200 truncate">
                    &quot;{standings[0].song}&quot;
                  </div>
                )}
                <div className="text-2xl font-bold text-yellow-300">
                  {standings[0].points} pts
                </div>
              </CardContent>
            </MagicCard>

            {/* 3rd Place */}
            <MagicCard className="border-orange-400/30 bg-gradient-to-br from-orange-400/10 to-orange-500/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-3">
                <div className="text-5xl mb-2">🥉</div>
                <div className="text-2xl font-bold text-orange-300">
                  {standings[2].position}
                </div>
                <div className="text-lg font-semibold text-white">
                  {standings[2].name}
                </div>
                {standings[2].song && (
                  <div className="text-sm text-gray-400 truncate">
                    &quot;{standings[2].song}&quot;
                  </div>
                )}
                <div className="text-xl font-bold text-orange-300">
                  {standings[2].points} pts
                </div>
              </CardContent>
            </MagicCard>
          </div>
        </BlurFade>
      )}

      {/* Full Rankings List */}
      <BlurFade delay={0.3} inView>
        <MagicCard className="border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              {standings.map((standing, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    index === 0
                      ? 'bg-yellow-500/20 border border-yellow-500/30'
                      : index === 1
                        ? 'bg-gray-400/20 border border-gray-400/30'
                        : index === 2
                          ? 'bg-orange-400/20 border border-orange-400/30'
                          : 'bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`text-2xl font-bold min-w-[3rem] text-center ${
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                            ? 'text-gray-300'
                            : index === 2
                              ? 'text-orange-400'
                              : 'text-gray-400'
                      }`}
                    >
                      {standing.position}
                    </div>
                    <div className="flex-1">
                      <div className="text-base font-semibold text-white">
                        {standing.name}
                      </div>
                      {standing.song && (
                        <div className="text-sm text-gray-400 truncate max-w-md">
                          &quot;{standing.song}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      index === 0
                        ? 'text-yellow-400'
                        : index === 1
                          ? 'text-gray-300'
                          : index === 2
                            ? 'text-orange-400'
                            : 'text-purple-400'
                    }`}
                  >
                    {standing.points} pts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </MagicCard>
      </BlurFade>
    </div>
  );
};

export default StandingsView;
