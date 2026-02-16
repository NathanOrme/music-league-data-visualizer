/**
 * @file PlaylistsPage.tsx
 * @description Dedicated playlists browsing page with embedded Spotify player.
 */

import { SpotifyPlayer } from '@/music-league/components/SpotifyPlayer';
import { LeagueDataContext } from '@/music-league/contexts/LeagueDataContext';
import {
  mlButton,
  mlCard,
  mlLayout,
  mlText,
} from '@/music-league/styles/music-league-theme';
import { getAllLeagues } from '@/music-league/utils/slugUtils';
import { ExternalLink, ListMusic, Loader2, Play } from 'lucide-react';
import { type FC, useContext, useMemo, useState } from 'react';

interface PlaylistItem {
  leagueTitle: string;
  playlistName: string;
  playlistUrl: string;
  type: 'main' | 'round';
}

const PlaylistsPage: FC = () => {
  const { leaguesData, loading } = useContext(LeagueDataContext);
  const [featuredUrl, setFeaturedUrl] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const allLeagues = useMemo(
    () => getAllLeagues(leaguesData),
    [leaguesData],
  );

  const playlists = useMemo(() => {
    const items: PlaylistItem[] = [];
    allLeagues.forEach((league) => {
      if (league.urls?.mainPlaylist) {
        items.push({
          leagueTitle: league.title,
          playlistName: `${league.title} - Complete`,
          playlistUrl: league.urls.mainPlaylist,
          type: 'main',
        });
      }
      league.rounds.forEach((round) => {
        const url =
          round.playlist ||
          (round as { spotifyPlaylistUrl?: string })
            .spotifyPlaylistUrl;
        if (url) {
          items.push({
            leagueTitle: league.title,
            playlistName: round.name,
            playlistUrl: url,
            type: 'round',
          });
        }
      });
    });
    return items;
  }, [allLeagues]);

  const filteredPlaylists = useMemo(() => {
    if (filter === 'all') {
      return playlists;
    }
    return playlists.filter((p) => p.leagueTitle === filter);
  }, [playlists, filter]);

  const playlistsByLeague = useMemo(() => {
    const grouped: Record<string, PlaylistItem[]> = {};
    filteredPlaylists.forEach((p) => {
      if (!grouped[p.leagueTitle]) {
        grouped[p.leagueTitle] = [];
      }
      grouped[p.leagueTitle].push(p);
    });
    return grouped;
  }, [filteredPlaylists]);

  const leagueNames = useMemo(
    () =>
      Array.from(new Set(playlists.map((p) => p.leagueTitle))).sort(),
    [playlists],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={mlLayout.container}>
      <header className="pt-10 pb-6">
        <h1 className={`${mlText.h1} mb-2`}>Playlists</h1>
        <p className={mlText.body}>
          Browse and listen to playlists from every league and round.
        </p>
      </header>

      {/* Featured Player */}
      {featuredUrl && (
        <section className="mb-8">
          <SpotifyPlayer
            playlistUrl={featuredUrl}
            title="Now Playing"
          />
        </section>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setFilter('all')}
          className={
            filter === 'all' ? mlButton.primary : mlButton.ghost
          }
        >
          All
        </button>
        {leagueNames.map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={
              filter === name ? mlButton.primary : mlButton.ghost
            }
          >
            {name}
          </button>
        ))}
      </div>

      {/* Playlists by League */}
      <div className="space-y-6 pb-12">
        {Object.entries(playlistsByLeague).map(
          ([leagueTitle, items]) => (
            <section key={leagueTitle}>
              <h3 className={`${mlText.h4} mb-3 text-zinc-300`}>
                {leagueTitle}
              </h3>
              <div className={mlCard.base}>
                <div className="divide-y divide-white/[0.06]">
                  {items.map((playlist) => (
                    <div
                      key={playlist.playlistUrl}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors"
                    >
                      <button
                        onClick={() =>
                          setFeaturedUrl(playlist.playlistUrl)
                        }
                        className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
                        aria-label={`Play ${playlist.playlistName}`}
                      >
                        <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {playlist.playlistName}
                        </p>
                        {playlist.type === 'main' && (
                          <span className="text-xs text-[#1DB954]">
                            Complete Collection
                          </span>
                        )}
                      </div>
                      <a
                        href={playlist.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-[#1DB954] transition-colors"
                        aria-label={`Open ${playlist.playlistName} in Spotify`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ),
        )}

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-16">
            <ListMusic className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className={mlText.body}>No playlists available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistsPage;
