/**
 * @file PlaylistCard.tsx
 * @description Enhanced Playlist Card Component with MagicUI
 */

import { ActionButton, MagicCard } from '@/shared/components/magicui';
import { Button, CardContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { PlayCircle } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';

export interface PlaylistCardProps {
  playlist: {
    url: string;
    title: string;
    description: string;
    roundIndex: number;
    roundId: string;
    type: 'round' | 'league';
  };
  selectedPlaylist: string | null;
  onPlaylistSelect: (url: string) => void;
  onOpenSpotify: (url: string) => void;
}

/**
 * Enhanced Playlist Card Component with MagicUI
 */
export const PlaylistCard: FC<PlaylistCardProps> = memo(
  ({
    playlist,
    selectedPlaylist,
    onPlaylistSelect,
    onOpenSpotify,
  }) => {
    return (
      <MagicCard
        className={cn(
          'hover:scale-[1.02] transition-all duration-300 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm group',
          selectedPlaylist === playlist.url &&
            'ring-2 ring-purple-500/30 border-purple-500/50',
        )}
      >
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {playlist.title}
                </h4>
                <p className="text-purple-300 text-sm font-medium">
                  {playlist.type === 'league'
                    ? 'League Collection'
                    : `Round ${playlist.roundIndex + 1}`}
                </p>
                {playlist.description && (
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {playlist.description}
                  </p>
                )}
              </div>
              <div className="text-2xl flex-shrink-0 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                {playlist.type === 'league' ? '🎼' : '🎵'}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <ActionButton
                onClick={() => onPlaylistSelect(playlist.url)}
                variant="primary"
                size="sm"
                shine
                className={cn(
                  'flex-1 h-9 bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-none shadow-lg px-3 py-2',
                  selectedPlaylist === playlist.url &&
                    'from-purple-700 to-teal-700 shadow-purple-500/25',
                )}
              >
                <div className="flex items-center justify-center gap-2 w-full">
                  <PlayCircle className="w-4 h-4" />
                  <span className="font-medium text-white text-sm">
                    {selectedPlaylist === playlist.url
                      ? 'Playing'
                      : 'Play Here'}
                  </span>
                </div>
              </ActionButton>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenSpotify(playlist.url)}
                className="border-green-500/30 text-green-300 hover:bg-green-500/10 hover:border-green-500/50"
              >
                Open in Spotify
              </Button>
            </div>
          </div>
        </CardContent>
      </MagicCard>
    );
  },
);

PlaylistCard.displayName = 'PlaylistCard';
