/**
 * @file usePlaylistHistory.ts
 * @description Hook for managing playlist history with localStorage persistence
 */

import { logger } from '@/shared/utils/logger';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'music-league-playlist-history';
const MAX_HISTORY_ITEMS = 10;

export interface PlaylistHistoryItem {
  id: string;
  leagueId: string;
  leagueName: string;
  playlistName: string;
  playedAt: number;
}

export const usePlaylistHistory = () => {
  const [recentPlaylists, setRecentPlaylists] = useState<
    PlaylistHistoryItem[]
  >([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentPlaylists(JSON.parse(stored));
      }
    } catch (error) {
      logger.error('Failed to load playlist history:', error);
    }
  }, []);

  // Add to history
  const addToHistory = useCallback(
    (playlist: PlaylistHistoryItem) => {
      setRecentPlaylists((prev) => {
        // Remove if already exists
        const filtered = prev.filter((p) => p.id !== playlist.id);

        // Add to front with current timestamp
        const updated = [
          { ...playlist, playedAt: Date.now() },
          ...filtered,
        ];

        // Limit to MAX_HISTORY_ITEMS
        const limited = updated.slice(0, MAX_HISTORY_ITEMS);

        // Save to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
        } catch (error) {
          logger.error('Failed to save playlist history:', error);
        }

        return limited;
      });
    },
    [],
  );

  // Clear history
  const clearHistory = useCallback(() => {
    setRecentPlaylists([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      logger.error('Failed to clear playlist history:', error);
    }
  }, []);

  return { recentPlaylists, addToHistory, clearHistory };
};
