/**
 * @file PlaylistsGallery.tsx
 * @description Cleaner playlists view with embedded player and accordion grouping
 *
 * Features:
 * - Embedded Spotify player for featured playlist
 * - Accordion-based league grouping to reduce clutter
 * - Compact list view instead of card grid
 * - Direct Spotify links
 */

import { SpotifyPlayer } from '@/music-league/components/SpotifyPlayer';
import {
  accordionStyles,
  badgeStyles,
  buttonStyles,
  cn,
  emojis,
  textStyles,
} from '@/music-league/styles/playful-design-system';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui';
import type { League } from '@/shared/utils/dataProcessing';
import { ChevronDown, ExternalLink, Music } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';

interface PlaylistsGalleryProps {
  leagues: League[];
}

interface PlaylistItem {
  leagueTitle: string;
  playlistName: string;
  playlistUrl: string;
  type: 'main' | 'round';
}

/**
 * PlaylistsGallery Component
 *
 * Cleaner, less cluttered playlist browser with:
 * - Featured playlist player
 * - Accordion-grouped leagues
 * - Compact list view
 */
export const PlaylistsGallery: FC<PlaylistsGalleryProps> = ({
  leagues,
}) => {
  const [featuredPlaylist, setFeaturedPlaylist] =
    useState<PlaylistItem | null>(null);

  // Extract all playlists from leagues
  const allPlaylists = useMemo(() => {
    const playlists: PlaylistItem[] = [];

    leagues.forEach((league) => {
      // Main league playlist
      if (league.urls?.mainPlaylist) {
        playlists.push({
          leagueTitle: league.title,
          playlistName: `${league.title} - Complete`,
          playlistUrl: league.urls.mainPlaylist,
          type: 'main',
        });
      }

      // Round playlists (support legacy field names just in case)
      league.rounds.forEach((round) => {
        const playlistUrl =
          round.playlist ||
          (round as { spotifyPlaylistUrl?: string })
            .spotifyPlaylistUrl;
        const playlistName =
          round.name ||
          (round as { roundName?: string }).roundName ||
          'Round playlist';

        if (playlistUrl) {
          playlists.push({
            leagueTitle: league.title,
            playlistName,
            playlistUrl,
            type: 'round',
          });
        }
      });
    });

    return playlists;
  }, [leagues]);

  // Group playlists by league
  const playlistsByLeague = allPlaylists.reduce(
    (acc, playlist) => {
      if (!acc[playlist.leagueTitle]) {
        acc[playlist.leagueTitle] = [];
      }
      acc[playlist.leagueTitle].push(playlist);
      return acc;
    },
    {} as Record<string, PlaylistItem[]>,
  );

  const defaultOpenLeagues =
    Object.keys(playlistsByLeague).length === 1
      ? Object.keys(playlistsByLeague)
      : [];

  // Keep featured playlist in sync with the filtered list
  useEffect(() => {
    if (allPlaylists.length === 0) {
      if (featuredPlaylist) {
        setFeaturedPlaylist(null);
      }
      return;
    }

    const featuredStillAvailable = featuredPlaylist
      ? allPlaylists.some(
          (playlist) =>
            playlist.playlistUrl === featuredPlaylist.playlistUrl,
        )
      : false;

    if (!featuredPlaylist || !featuredStillAvailable) {
      setFeaturedPlaylist(allPlaylists[0]);
    }
  }, [allPlaylists, featuredPlaylist]);

  // Empty state
  if (allPlaylists.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <Music className="h-16 w-16 mx-auto text-[#BFC0C0] mb-4" />
        <h3 className={cn(textStyles.heading, 'mb-2')}>
          No Playlists Available
        </h3>
        <p className={textStyles.body}>
          Check back later for curated playlists from league rounds!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Player */}
      {featuredPlaylist && (
        <section>
          <h3 className={cn(textStyles.heading, 'mb-4')}>
            {emojis.music} Now Playing
          </h3>
          <SpotifyPlayer
            playlistUrl={featuredPlaylist.playlistUrl}
            title={featuredPlaylist.playlistName}
            description={featuredPlaylist.leagueTitle}
          />
        </section>
      )}

      {/* Playlists by League - Accordion */}
      <section>
        <h3 className={cn(textStyles.heading, 'mb-4')}>
          {emojis.playlists} Browse All Playlists
        </h3>
        <Accordion
          type="multiple"
          defaultValue={defaultOpenLeagues}
          className="space-y-4"
        >
          {Object.entries(playlistsByLeague).map(
            ([leagueTitle, playlists]) => (
              <AccordionItem
                key={leagueTitle}
                value={leagueTitle}
                className="bg-[#2a2a2a] rounded-[20px] border-3 border-[#4ECDC4] shadow-lg shadow-[#4ECDC4]/20 overflow-hidden"
              >
                <AccordionTrigger className={accordionStyles.trigger}>
                  <div className="flex items-center justify-between w-full">
                    <h4 className={textStyles.subheading}>
                      {leagueTitle}
                    </h4>
                    <span className={badgeStyles.playlists}>
                      {emojis.playlists} {playlists.length}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(accordionStyles.chevron, 'h-6 w-6')}
                  />
                </AccordionTrigger>
                <AccordionContent className={accordionStyles.content}>
                  <div className="space-y-2">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.playlistUrl}
                        className="flex items-center justify-between p-3 bg-[#2a2a2a]/60 rounded-xl hover:bg-[#2a2a2a]/80 transition-colors group"
                      >
                        <button
                          onClick={() =>
                            setFeaturedPlaylist(playlist)
                          }
                          className="flex-1 text-left"
                        >
                          <p
                            className={cn(
                              textStyles.label,
                              'group-hover:text-[#4ECDC4]',
                            )}
                          >
                            {playlist.playlistName}
                          </p>
                          {playlist.type === 'main' && (
                            <span className="text-xs text-[#FF6B6B]">
                              ★ Complete Collection
                            </span>
                          )}
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setFeaturedPlaylist(playlist)
                            }
                            className={cn(
                              buttonStyles.icon,
                              'w-10 h-10',
                            )}
                            aria-label={`Play ${playlist.playlistName}`}
                          >
                            ▶️
                          </button>
                          <a
                            href={playlist.playlistUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonStyles.spotify,
                              'w-10 h-10',
                            )}
                            aria-label={`Open ${playlist.playlistName} in Spotify`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </section>
    </div>
  );
};
