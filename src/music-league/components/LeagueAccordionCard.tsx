/**
 * @file LeagueAccordionCard.tsx
 * @description Playful accordion card for league display
 *
 * Features:
 * - Single-expand behavior (only one open at a time)
 * - Collapsed: Title, participant count, round count, playlist button
 * - Expanded: Top 3 standings, last 3 rounds, playlist links
 * - Touch-optimized with 48px+ touch targets
 * - Bouncy animations with colorful shadows
 */

import {
  accordionStyles,
  badgeStyles,
  buttonStyles,
  cardStyles,
  cn,
  emojis,
} from '@/music-league/styles/playful-design-system';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui';
import type { League } from '@/shared/utils/dataProcessing';
import { ChevronDown, ExternalLink, Trophy } from 'lucide-react';
import { type FC } from 'react';

interface LeagueAccordionCardProps {
  league: League;
  isOpen?: boolean;
  onToggle?: () => void;
}

/**
 * LeagueAccordionCard Component
 *
 * Displays a league in an expandable card format with:
 * - Header: Title, badges (participants, rounds), expand icon
 * - Content: Podium (top 3), recent rounds, playlist links
 */
export const LeagueAccordionCard: FC<LeagueAccordionCardProps> = ({
  league,
  isOpen = false,
}) => {
  const participantCount =
    league.competitors?.length || league.leagueStandings.length;
  const roundCount = league.rounds.length;
  const top3 = league.leagueStandings.slice(0, 3);
  const normalizedTop3 = top3.map((standing) => {
    const legacyStanding = standing as {
      Name?: string;
      Score?: number;
    };
    return {
      ...standing,
      name: standing.name || legacyStanding.Name || 'Unknown',
      points: standing.points ?? legacyStanding.Score ?? 0,
    };
  });
  const recentRounds = league.rounds.slice(-3).reverse();

  // Extract playlist URL from league.urls or rounds
  const mainPlaylistUrl = league.urls?.mainPlaylist;
  const hasPlaylists =
    mainPlaylistUrl || league.rounds.some((r) => r.playlist);

  return (
    <div className={cn(cardStyles.coral, 'overflow-hidden')}>
      <Accordion
        type="single"
        collapsible
        value={isOpen ? 'item' : undefined}
      >
        <AccordionItem value="item" className="border-none">
          {/* Card Header - Always Visible */}
          <AccordionTrigger className={accordionStyles.trigger}>
            <div className="flex-1 min-w-0">
              {/* League Title */}
              <h3 className="text-xl md:text-2xl font-bold text-[#f0f0f0] mb-3 break-words">
                {league.title}
              </h3>

              {/* Badges - Mobile optimized with proper touch targets */}
              <div className="flex flex-wrap gap-3">
                <span className={badgeStyles.participants}>
                  {emojis.participants} {participantCount}
                </span>
                <span className={badgeStyles.rounds}>
                  {emojis.rounds} {roundCount}
                </span>
                {hasPlaylists && (
                  <span className={badgeStyles.playlists}>
                    {emojis.playlists} Playlists
                  </span>
                )}
              </div>
            </div>

            {/* Expand Icon - Proper touch target */}
            <div className={accordionStyles.chevron}>
              <ChevronDown
                className={cn(
                  'transition-transform duration-300 text-[#FF6B6B]',
                  isOpen && 'rotate-180',
                  'h-6 w-6',
                )}
                aria-hidden="true"
              />
            </div>
          </AccordionTrigger>

          {/* Expanded Content */}
          <AccordionContent className={accordionStyles.content}>
            <div className="space-y-6">
              {/* Top 3 Podium */}
              {top3.length > 0 && (
                <section>
                  <h4 className="text-lg font-bold text-[#2D3142] mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-[#FFE66D]" />
                    Top Performers
                  </h4>
                  <div className="space-y-2">
                    {normalizedTop3.map((standing, index) => (
                      <div
                        key={
                          standing.name || standing.position || index
                        }
                        className="flex items-center justify-between p-3 bg-[#2a2a2a]/60 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {index === 0
                              ? '🥇'
                              : index === 1
                                ? '🥈'
                                : '🥉'}
                          </span>
                          <div>
                            <p className="font-semibold text-[#f0f0f0]">
                              {standing.name}
                            </p>
                            <p className="text-sm text-[#b0b0b0]">
                              {standing.points} points
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#FF6B6B]">
                            #{index + 1}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Rounds */}
              {recentRounds.length > 0 && (
                <section>
                  <h4 className="text-lg font-bold text-[#2D3142] mb-4">
                    Recent Rounds
                  </h4>
                  <div className="space-y-2">
                    {recentRounds.map((round) => (
                      <div
                        key={round.id}
                        className="flex items-center justify-between p-3 bg-[#2a2a2a]/80 border-2 border-[#4ECDC4] rounded-xl"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-[#f0f0f0]">
                            {round.name}
                          </p>
                          <p className="text-sm text-[#b0b0b0]">
                            {round.standings[0]?.name ||
                              (
                                round.standings[0] as {
                                  Name?: string;
                                }
                              )?.Name ||
                              'No winner yet'}
                          </p>
                        </div>
                        {round.playlist && (
                          <a
                            href={round.playlist}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonStyles.spotify,
                              'shrink-0',
                            )}
                            aria-label={`Listen to ${round.name} on Spotify`}
                          >
                            {emojis.playlists}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Main Playlist Link */}
              {mainPlaylistUrl && (
                <section>
                  <a
                    href={mainPlaylistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonStyles.primary,
                      'w-full flex items-center justify-center gap-2',
                    )}
                  >
                    {emojis.playlists} View Full League Playlist
                    <ExternalLink
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </section>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
