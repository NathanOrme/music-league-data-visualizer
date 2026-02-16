/**
 * @file PlaylistCategoryContent.tsx
 * @description Playlist category content component for displaying round playlists
 */

import { musicLeagueStyles } from '@/music-league/styles/music-league.styles';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Skeleton,
} from '@/shared/components/ui';

import SpotifyPlayer from './SpotifyPlayer';
import type { PlaylistCategory } from './types';

import { getRoundCategoryMapping } from './utils';

import {
  processLeagueZip,
  type League,
} from '@/shared/utils/dataProcessing';
import { logger } from '@/shared/utils/logger';
import { memo, useEffect, useState, type FC } from 'react';

interface PlaylistCategoryContentProps {
  category: PlaylistCategory;
}

const PlaylistLoadingSkeleton: FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-48 bg-white/20" />
    <div className="space-y-3">
      {['first', 'second', 'third'].map((key) => (
        <Skeleton key={key} className="h-16 w-full bg-white/10" />
      ))}
    </div>
  </div>
);

/**
 * Playlist Category Content Component
 */
export const PlaylistCategoryContent: FC<PlaylistCategoryContentProps> =
  memo(({ category }) => {
    const [roundData, setRoundData] = useState<League[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const roundCategoryMapping = getRoundCategoryMapping();

    useEffect(() => {
      const loadRoundData = async () => {
        try {
          setLoading(true);
          setError(null);
          const { files, basePath } = roundCategoryMapping[category];
          const data = await Promise.all(
            files.map((file) => processLeagueZip(file, basePath)),
          );
          setRoundData(data);
        } catch (error) {
          logger.error('Failed to load round data:', error);
          setError(
            error instanceof Error
              ? error.message
              : 'Unknown error occurred',
          );
        } finally {
          setLoading(false);
        }
      };

      loadRoundData().catch((error) => {
        logger.error('Error loading round data:', error);
      });
    }, [category, roundCategoryMapping]);

    if (loading) {
      return <PlaylistLoadingSkeleton />;
    }

    if (error) {
      return (
        <p className={musicLeagueStyles.text.redError}>{error}</p>
      );
    }

    if (roundData.length === 0) {
      return (
        <p className={musicLeagueStyles.empty.message}>
          No round playlists available.
        </p>
      );
    }

    return (
      <Accordion type="multiple" className="space-y-3">
        {roundData.map((league) => (
          <AccordionItem
            key={league.title}
            value={league.title}
            className={musicLeagueStyles.dashboard.accordionItem}
          >
            <AccordionTrigger
              className={musicLeagueStyles.dashboard.accordionTrigger}
            >
              <h3 className="text-base font-semibold text-left">
                {league.title}
              </h3>
            </AccordionTrigger>
            <AccordionContent
              className={musicLeagueStyles.dashboard.accordionContent}
            >
              <Accordion type="multiple" className="space-y-2">
                {league.rounds?.map((round) => (
                  <AccordionItem
                    key={round.id}
                    value={round.id}
                    className={
                      musicLeagueStyles.dashboard.nestedAccordion
                    }
                  >
                    <AccordionTrigger
                      className={
                        musicLeagueStyles.dashboard
                          .nestedAccordionTrigger
                      }
                    >
                      <div
                        className={
                          musicLeagueStyles.icons.leftSection
                        }
                      >
                        <h4
                          className={
                            musicLeagueStyles.icons.roundSection
                          }
                        >
                          {round.name}
                        </h4>
                        <p className="text-xs text-white/70">
                          {round.description}
                        </p>
                        {(round.standings?.length ?? 0) > 0 && (
                          <p className="text-xs text-white/50">
                            Winner: {round.standings?.[0]?.song} by{' '}
                            {round.standings?.[0]?.name}
                          </p>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent
                      className={
                        musicLeagueStyles.dashboard
                          .nestedAccordionContent
                      }
                    >
                      {(round.standings?.length ?? 0) > 0 && (
                        <p
                          className={
                            musicLeagueStyles.rounds.winnerText
                          }
                        >
                          Winning Song: {round.standings?.[0]?.song}{' '}
                          by {round.standings?.[0]?.name}
                        </p>
                      )}
                      {round.playlist && (
                        <SpotifyPlayer playlistUrl={round.playlist} />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  });

PlaylistCategoryContent.displayName = 'PlaylistCategoryContent';
