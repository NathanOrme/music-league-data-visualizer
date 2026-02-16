/**
 * @file QuickPlaylistSection.tsx
 * @description Quick access section for recent and random playlists
 */

import { MagicCard } from '@/shared/components/magicui';
import { Button } from '@/shared/components/ui/button';
import type { League } from '@/shared/utils/dataProcessing';
import { Dices, ListMusic, Music } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PlaylistHistoryItem } from '../hooks/usePlaylistHistory';
import type { LeagueCategory } from './types';

/**
 * Props for QuickPlaylistSection component
 */
export interface QuickPlaylistSectionProps {
  /** List of recently played playlists */
  recentPlaylists: PlaylistHistoryItem[];
  /** Available league categories for random selection */
  leagueCategories: LeagueCategory[];
  /** Callback when a playlist is played */
  onPlayPlaylist: (
    playlistId: string,
    historyItem: PlaylistHistoryItem,
  ) => void;
  /** Callback when user clicks to view all playlists */
  onViewAllPlaylists: () => void;
}

/**
 * Internal playlist card item interface
 */
interface PlaylistCardData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

/**
 * Component for quick access to recent and random playlists
 */
export const QuickPlaylistSection: React.FC<
  QuickPlaylistSectionProps
> = ({
  recentPlaylists,
  leagueCategories,
  onPlayPlaylist,
  onViewAllPlaylists,
}) => {
  /**
   * Handle playing a random playlist from available leagues
   */
  const handleRandomPlaylist = () => {
    // Collect all leagues with playlists
    const allLeagues: League[] = [];
    leagueCategories.forEach((category) => {
      allLeagues.push(...category.leagues);
    });

    if (allLeagues.length === 0) {
      return;
    }

    // Select random league
    const randomLeague =
      allLeagues[Math.floor(Math.random() * allLeagues.length)];

    // Get all playlists from the league (league-level + round-level)
    const playlists: string[] = [];

    // Add main league playlist if exists
    if (randomLeague.urls?.mainPlaylist) {
      playlists.push(randomLeague.urls.mainPlaylist);
    }

    // Add round playlists
    randomLeague.rounds.forEach((round) => {
      if (round.playlist) {
        playlists.push(round.playlist);
      }
    });

    if (playlists.length === 0) {
      return;
    }

    // Select random playlist
    const randomPlaylist =
      playlists[Math.floor(Math.random() * playlists.length)];

    // Create history item
    const historyItem: PlaylistHistoryItem = {
      id: randomPlaylist,
      leagueId: randomLeague.title,
      leagueName: randomLeague.title,
      playlistName:
        randomLeague.urls?.mainPlaylist === randomPlaylist
          ? `${randomLeague.title} - Main Playlist`
          : 'Round Playlist',
      playedAt: Date.now(),
    };

    onPlayPlaylist(randomPlaylist, historyItem);
  };

  /**
   * Handle clicking on a recent playlist card
   */
  const handleRecentClick = (playlist: PlaylistHistoryItem) => {
    onPlayPlaylist(playlist.id, playlist);
  };

  /**
   * Render empty state when no recent playlists
   */
  const renderEmptyState = () => (
    <div className="text-center py-8">
      <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-400 mb-4">
        No recent playlists yet. Start listening to build your
        history!
      </p>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleRandomPlaylist}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Dices className="mr-2 h-4 w-4" />
          Random Playlist
        </Button>
        <Button
          onClick={onViewAllPlaylists}
          variant="outline"
          className="border-white/10 hover:bg-white/5"
        >
          <ListMusic className="mr-2 h-4 w-4" />
          All Playlists
        </Button>
      </div>
    </div>
  );

  /**
   * Render recent playlist cards
   */
  const renderRecentCards = () => {
    const displayedPlaylists = recentPlaylists.slice(0, 3);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedPlaylists.map((playlist) => (
            <MagicCard
              key={playlist.id}
              className="bg-gray-900/70 border border-white/5 rounded-xl shadow-lg backdrop-blur-sm cursor-pointer hover:border-purple-500/50 transition-all duration-200"
              onClick={() => handleRecentClick(playlist)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Music className="h-8 w-8 text-purple-400" />
                  <div className="text-xs text-gray-400">
                    {new Date(playlist.playedAt).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                  {playlist.playlistName}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-1">
                  {playlist.leagueName}
                </p>
              </div>
            </MagicCard>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <Button
            onClick={handleRandomPlaylist}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Dices className="mr-2 h-4 w-4" />
            Random Playlist
          </Button>
          <Button
            onClick={onViewAllPlaylists}
            variant="outline"
            className="border-white/10 hover:bg-white/5"
          >
            <ListMusic className="mr-2 h-4 w-4" />
            All Playlists
          </Button>
        </div>
      </>
    );
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Music className="h-6 w-6 text-purple-400" />
          Quick Play
        </h2>
      </div>

      {recentPlaylists.length === 0
        ? renderEmptyState()
        : renderRecentCards()}
    </section>
  );
};
