/**
 * @file PlaylistsGallery.tsx
 * @description Cleaner playlists view with embedded player and accordion grouping
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

export const PlaylistsGallery: FC<PlaylistsGalleryProps> = ({ leagues }) => {
  const [featuredPlaylist, setFeaturedPlaylist] = useState<PlaylistItem | null>(
    null,
  );

  const allPlaylists = useMemo(() => {
    const playlists: PlaylistItem[] = [];

    leagues.forEach((league) => {
      if (league.urls?.mainPlaylist) {
        playlists.push({
          leagueTitle: league.title,
          playlistName: `${league.title} - Complete`,
          playlistUrl: league.urls.mainPlaylist,
          type: 'main',
        });
      }

      league.rounds.forEach((round) => {
        const playlistUrl =
          round.playlist ||
          (round as { spotifyPlaylistUrl?: string }).spotifyPlaylistUrl;
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

  const playlistsByLeague = allPlaylists.reduce(
    (acc, playlist) => {
      if (!acc[playlist.leagueTitle]) {
        acc[playlist.leagueTitle] = [];
      }
      acc[playlist.leagueTitle]!.push(playlist);
      return acc;
    },
    {} as Record<string, PlaylistItem[]>,
  );

  const defaultOpenLeagues =
    Object.keys(playlistsByLeague).length === 1
      ? Object.keys(playlistsByLeague)
      : [];

  useEffect(() => {
    if (allPlaylists.length === 0) {
      if (featuredPlaylist) {
        setFeaturedPlaylist(null);
      }
      return;
    }

    const featuredStillAvailable = featuredPlaylist
      ? allPlaylists.some(
          (playlist) => playlist.playlistUrl === featuredPlaylist.playlistUrl,
        )
      : false;

    if (!featuredPlaylist || !featuredStillAvailable) {
      setFeaturedPlaylist(allPlaylists[0] ?? null);
    }
  }, [allPlaylists, featuredPlaylist]);

  if (allPlaylists.length === 0) {
    return (
      <div className="px-4 py-20 text-center">
        <Music className="mx-auto mb-4 h-16 w-16 text-[#BFC0C0]" />
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

      <section>
        <h3 className={cn(textStyles.heading, 'mb-4')}>
          {emojis.playlists} Browse All Playlists
        </h3>
        <Accordion
          type="multiple"
          defaultValue={defaultOpenLeagues}
          className="space-y-4"
        >
          {Object.entries(playlistsByLeague).map(([leagueTitle, playlists]) => (
            <AccordionItem
              key={leagueTitle}
              value={leagueTitle}
              className="overflow-hidden rounded-[20px] border-3 border-[#4ECDC4] bg-[#2a2a2a] shadow-lg shadow-[#4ECDC4]/20"
            >
              <AccordionTrigger className={accordionStyles.trigger}>
                <div className="flex w-full items-center justify-between">
                  <h4 className={textStyles.subheading}>{leagueTitle}</h4>
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
                      className="group flex items-center justify-between rounded-xl bg-[#2a2a2a]/60 p-3 transition-colors hover:bg-[#2a2a2a]/80"
                    >
                      <button
                        onClick={() => setFeaturedPlaylist(playlist)}
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
                          onClick={() => setFeaturedPlaylist(playlist)}
                          className={cn(buttonStyles.icon, 'h-10 w-10')}
                          aria-label={`Play ${playlist.playlistName}`}
                        >
                          ▶️
                        </button>
                        <a
                          href={playlist.playlistUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(buttonStyles.spotify, 'h-10 w-10')}
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
          ))}
        </Accordion>
      </section>
    </div>
  );
};
