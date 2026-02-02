/**
 * @file LeagueAccordionCard.tsx
 * @description Playful accordion card for league display
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

  const mainPlaylistUrl = league.urls?.mainPlaylist;
  const hasPlaylists = mainPlaylistUrl || league.rounds.some((r) => r.playlist);

  return (
    <div className={cn(cardStyles.coral, 'overflow-hidden')}>
      <Accordion type="single" collapsible value={isOpen ? 'item' : undefined}>
        <AccordionItem value="item" className="border-none">
          <AccordionTrigger className={accordionStyles.trigger}>
            <div className="min-w-0 flex-1">
              <h3 className="mb-3 text-xl font-bold break-words text-[#f0f0f0] md:text-2xl">
                {league.title}
              </h3>

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

            <div className={accordionStyles.chevron}>
              <ChevronDown
                className={cn(
                  'text-[#FF6B6B] transition-transform duration-300',
                  isOpen && 'rotate-180',
                  'h-6 w-6',
                )}
                aria-hidden="true"
              />
            </div>
          </AccordionTrigger>

          <AccordionContent className={accordionStyles.content}>
            <div className="space-y-6">
              {top3.length > 0 && (
                <section>
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#2D3142]">
                    <Trophy className="h-5 w-5 text-[#FFE66D]" />
                    Top Performers
                  </h4>
                  <div className="space-y-2">
                    {normalizedTop3.map((standing, index) => (
                      <div
                        key={standing.name || standing.position || index}
                        className="flex items-center justify-between rounded-xl bg-[#2a2a2a]/60 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
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

              {recentRounds.length > 0 && (
                <section>
                  <h4 className="mb-4 text-lg font-bold text-[#2D3142]">
                    Recent Rounds
                  </h4>
                  <div className="space-y-2">
                    {recentRounds.map((round) => (
                      <div
                        key={round.id}
                        className="flex items-center justify-between rounded-xl border-2 border-[#4ECDC4] bg-[#2a2a2a]/80 p-3"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-[#f0f0f0]">
                            {round.name}
                          </p>
                          <p className="text-sm text-[#b0b0b0]">
                            {round.standings[0]?.name ||
                              (round.standings[0] as { Name?: string })?.Name ||
                              'No winner yet'}
                          </p>
                        </div>
                        {round.playlist && (
                          <a
                            href={round.playlist}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(buttonStyles.spotify, 'shrink-0')}
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

              {mainPlaylistUrl && (
                <section>
                  <a
                    href={mainPlaylistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonStyles.primary,
                      'flex w-full items-center justify-center gap-2',
                    )}
                  >
                    {emojis.playlists} View Full League Playlist
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
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
