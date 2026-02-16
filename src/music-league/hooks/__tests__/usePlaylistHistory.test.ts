/**
 * @file usePlaylistHistory.test.ts
 * @description Tests for usePlaylistHistory hook
 */

import { act, renderHook } from '@testing-library/react';
import {
  usePlaylistHistory,
  type PlaylistHistoryItem,
} from '../usePlaylistHistory';

const STORAGE_KEY = 'music-league-playlist-history';

describe('usePlaylistHistory', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should start with empty array when no history exists', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      expect(result.current.recentPlaylists).toEqual([]);
    });

    it('should load existing history from localStorage', () => {
      const mockHistory: PlaylistHistoryItem[] = [
        {
          id: 'playlist-1',
          leagueId: 'league-1',
          leagueName: 'Test League',
          playlistName: 'Test Playlist',
          playedAt: Date.now(),
        },
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));

      const { result } = renderHook(() => usePlaylistHistory());

      expect(result.current.recentPlaylists).toEqual(mockHistory);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      localStorage.setItem(STORAGE_KEY, 'invalid json');

      const { result } = renderHook(() => usePlaylistHistory());

      expect(result.current.recentPlaylists).toEqual([]);
      expect(consoleError).toHaveBeenCalledWith(
        'Failed to load playlist history:',
        expect.any(Error),
      );

      consoleError.mockRestore();
    });
  });

  describe('addToHistory', () => {
    it('should add playlist to history', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      const newPlaylist: PlaylistHistoryItem = {
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'Test League',
        playlistName: 'Test Playlist',
        playedAt: 0, // Will be overwritten
      };

      act(() => {
        result.current.addToHistory(newPlaylist);
      });

      expect(result.current.recentPlaylists).toHaveLength(1);
      expect(result.current.recentPlaylists[0]).toMatchObject({
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'Test League',
        playlistName: 'Test Playlist',
      });
      expect(
        result.current.recentPlaylists[0].playedAt,
      ).toBeGreaterThan(0);
    });

    it('should add playlist to front of history', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      const playlist1: PlaylistHistoryItem = {
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'League 1',
        playlistName: 'Playlist 1',
        playedAt: 0,
      };

      const playlist2: PlaylistHistoryItem = {
        id: 'playlist-2',
        leagueId: 'league-2',
        leagueName: 'League 2',
        playlistName: 'Playlist 2',
        playedAt: 0,
      };

      act(() => {
        result.current.addToHistory(playlist1);
      });

      act(() => {
        result.current.addToHistory(playlist2);
      });

      expect(result.current.recentPlaylists[0].id).toBe('playlist-2');
      expect(result.current.recentPlaylists[1].id).toBe('playlist-1');
    });

    it('should move existing playlist to front if added again', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      const playlist1: PlaylistHistoryItem = {
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'League 1',
        playlistName: 'Playlist 1',
        playedAt: 0,
      };

      const playlist2: PlaylistHistoryItem = {
        id: 'playlist-2',
        leagueId: 'league-2',
        leagueName: 'League 2',
        playlistName: 'Playlist 2',
        playedAt: 0,
      };

      act(() => {
        result.current.addToHistory(playlist1);
        result.current.addToHistory(playlist2);
      });

      expect(result.current.recentPlaylists).toHaveLength(2);

      // Add playlist1 again
      act(() => {
        result.current.addToHistory(playlist1);
      });

      expect(result.current.recentPlaylists).toHaveLength(2);
      expect(result.current.recentPlaylists[0].id).toBe('playlist-1');
      expect(result.current.recentPlaylists[1].id).toBe('playlist-2');
    });

    it('should limit history to 10 items', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      // Add 15 playlists
      for (let i = 1; i <= 15; i++) {
        act(() => {
          result.current.addToHistory({
            id: `playlist-${i}`,
            leagueId: `league-${i}`,
            leagueName: `League ${i}`,
            playlistName: `Playlist ${i}`,
            playedAt: 0,
          });
        });
      }

      expect(result.current.recentPlaylists).toHaveLength(10);
      expect(result.current.recentPlaylists[0].id).toBe(
        'playlist-15',
      );
      expect(result.current.recentPlaylists[9].id).toBe('playlist-6');
    });

    it('should persist to localStorage', () => {
      const { result } = renderHook(() => usePlaylistHistory());

      const newPlaylist: PlaylistHistoryItem = {
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'Test League',
        playlistName: 'Test Playlist',
        playedAt: 0,
      };

      act(() => {
        result.current.addToHistory(newPlaylist);
      });

      const stored = localStorage.getItem(STORAGE_KEY);
      expect(stored).not.toBeNull();

      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toMatchObject({
        id: 'playlist-1',
        leagueId: 'league-1',
      });
    });

    it('should handle localStorage write errors gracefully', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const setItemSpy = jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('Quota exceeded');
        });

      const { result } = renderHook(() => usePlaylistHistory());

      const newPlaylist: PlaylistHistoryItem = {
        id: 'playlist-1',
        leagueId: 'league-1',
        leagueName: 'Test League',
        playlistName: 'Test Playlist',
        playedAt: 0,
      };

      act(() => {
        result.current.addToHistory(newPlaylist);
      });

      // Should still update state even if localStorage fails
      expect(result.current.recentPlaylists).toHaveLength(1);
      expect(consoleError).toHaveBeenCalledWith(
        'Failed to save playlist history:',
        expect.any(Error),
      );

      setItemSpy.mockRestore();
      consoleError.mockRestore();
    });
  });

  describe('clearHistory', () => {
    it('should clear all history', () => {
      const mockHistory: PlaylistHistoryItem[] = [
        {
          id: 'playlist-1',
          leagueId: 'league-1',
          leagueName: 'Test League',
          playlistName: 'Test Playlist',
          playedAt: Date.now(),
        },
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));

      const { result } = renderHook(() => usePlaylistHistory());

      expect(result.current.recentPlaylists).toHaveLength(1);

      act(() => {
        result.current.clearHistory();
      });

      expect(result.current.recentPlaylists).toEqual([]);
    });

    it('should remove history from localStorage', () => {
      const mockHistory: PlaylistHistoryItem[] = [
        {
          id: 'playlist-1',
          leagueId: 'league-1',
          leagueName: 'Test League',
          playlistName: 'Test Playlist',
          playedAt: Date.now(),
        },
      ];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockHistory));

      const { result } = renderHook(() => usePlaylistHistory());

      act(() => {
        result.current.clearHistory();
      });

      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });

    it('should handle localStorage remove errors gracefully', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const removeItemSpy = jest
        .spyOn(Storage.prototype, 'removeItem')
        .mockImplementation(() => {
          throw new Error('Storage error');
        });

      const { result } = renderHook(() => usePlaylistHistory());

      act(() => {
        result.current.clearHistory();
      });

      // Should still clear state even if localStorage fails
      expect(result.current.recentPlaylists).toEqual([]);
      expect(consoleError).toHaveBeenCalledWith(
        'Failed to clear playlist history:',
        expect.any(Error),
      );

      removeItemSpy.mockRestore();
      consoleError.mockRestore();
    });
  });
});
