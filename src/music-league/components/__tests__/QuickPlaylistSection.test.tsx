/**
 * @file QuickPlaylistSection.test.tsx
 * @description Tests for QuickPlaylistSection component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Music } from 'lucide-react';
import type { PlaylistHistoryItem } from '../../hooks/usePlaylistHistory';
import { QuickPlaylistSection } from '../QuickPlaylistSection';
import type { LeagueCategory } from '../types';

describe('QuickPlaylistSection', () => {
  const mockOnPlayPlaylist = jest.fn();
  const mockOnViewAllPlaylists = jest.fn();

  const mockRecentPlaylists: PlaylistHistoryItem[] = [
    {
      id: 'playlist-1',
      leagueId: 'league-1',
      leagueName: 'Test League 1',
      playlistName: 'Test Playlist 1',
      playedAt: Date.now() - 1000,
    },
    {
      id: 'playlist-2',
      leagueId: 'league-2',
      leagueName: 'Test League 2',
      playlistName: 'Test Playlist 2',
      playedAt: Date.now() - 2000,
    },
    {
      id: 'playlist-3',
      leagueId: 'league-3',
      leagueName: 'Test League 3',
      playlistName: 'Test Playlist 3',
      playedAt: Date.now() - 3000,
    },
  ];

  const mockLeagueCategories: LeagueCategory[] = [
    {
      id: 'category-1',
      name: 'Test Category',
      icon: <Music />,
      description: 'Test Description',
      leagueCount: 1,
      totalParticipants: 10,
      color: 'purple',
      leagues: [
        {
          title: 'Test League',
          rounds: [
            {
              id: 'round-1',
              created: '2024-01-01',
              name: 'Round 1',
              description: 'Test Round',
              playlist: 'spotify:playlist:test1',
              standings: [],
            },
            {
              id: 'round-2',
              created: '2024-01-02',
              name: 'Round 2',
              description: 'Test Round 2',
              playlist: 'spotify:playlist:test2',
              standings: [],
            },
          ],
          leagueStandings: [],
          urls: {
            mainPlaylist: 'spotify:playlist:main',
          },
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Empty State', () => {
    it('should render empty state when no recent playlists', () => {
      render(
        <QuickPlaylistSection
          recentPlaylists={[]}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      expect(
        screen.getByText(/No recent playlists yet/i),
      ).toBeInTheDocument();
      expect(screen.getByText('Random Playlist')).toBeInTheDocument();
      expect(screen.getByText('All Playlists')).toBeInTheDocument();
    });

    it('should call onViewAllPlaylists when All Playlists button clicked in empty state', async () => {
      const user = userEvent.setup();

      render(
        <QuickPlaylistSection
          recentPlaylists={[]}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const allPlaylistsButton = screen.getByText('All Playlists');
      await user.click(allPlaylistsButton);

      expect(mockOnViewAllPlaylists).toHaveBeenCalledTimes(1);
    });

    it('should call onPlayPlaylist when Random Playlist button clicked in empty state', async () => {
      const user = userEvent.setup();

      render(
        <QuickPlaylistSection
          recentPlaylists={[]}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const randomButton = screen.getByText('Random Playlist');
      await user.click(randomButton);

      expect(mockOnPlayPlaylist).toHaveBeenCalledTimes(1);
      expect(mockOnPlayPlaylist).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          id: expect.any(String),
          leagueId: expect.any(String),
          leagueName: expect.any(String),
          playlistName: expect.any(String),
          playedAt: expect.any(Number),
        }),
      );
    });
  });

  describe('Recent Playlists Display', () => {
    it('should render recent playlists section title', () => {
      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      expect(screen.getByText('Quick Play')).toBeInTheDocument();
    });

    it('should render up to 3 recent playlists', () => {
      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      expect(screen.getByText('Test Playlist 1')).toBeInTheDocument();
      expect(screen.getByText('Test Playlist 2')).toBeInTheDocument();
      expect(screen.getByText('Test Playlist 3')).toBeInTheDocument();
    });

    it('should display league names for recent playlists', () => {
      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      expect(screen.getByText('Test League 1')).toBeInTheDocument();
      expect(screen.getByText('Test League 2')).toBeInTheDocument();
      expect(screen.getByText('Test League 3')).toBeInTheDocument();
    });

    it('should only display first 3 playlists when more than 3 available', () => {
      const manyPlaylists: PlaylistHistoryItem[] = [
        ...mockRecentPlaylists,
        {
          id: 'playlist-4',
          leagueId: 'league-4',
          leagueName: 'Test League 4',
          playlistName: 'Test Playlist 4',
          playedAt: Date.now() - 4000,
        },
        {
          id: 'playlist-5',
          leagueId: 'league-5',
          leagueName: 'Test League 5',
          playlistName: 'Test Playlist 5',
          playedAt: Date.now() - 5000,
        },
      ];

      render(
        <QuickPlaylistSection
          recentPlaylists={manyPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      expect(screen.getByText('Test Playlist 1')).toBeInTheDocument();
      expect(screen.getByText('Test Playlist 2')).toBeInTheDocument();
      expect(screen.getByText('Test Playlist 3')).toBeInTheDocument();
      expect(
        screen.queryByText('Test Playlist 4'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Test Playlist 5'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Playlist Interaction', () => {
    it('should call onPlayPlaylist when a recent playlist card is clicked', async () => {
      const user = userEvent.setup();

      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const playlistCard = screen
        .getByText('Test Playlist 1')
        .closest('div');
      if (playlistCard) {
        await user.click(playlistCard);
      }

      expect(mockOnPlayPlaylist).toHaveBeenCalledTimes(1);
      expect(mockOnPlayPlaylist).toHaveBeenCalledWith(
        'playlist-1',
        mockRecentPlaylists[0],
      );
    });

    it('should call onViewAllPlaylists when All Playlists button clicked', async () => {
      const user = userEvent.setup();

      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const allPlaylistsButton = screen.getByText('All Playlists');
      await user.click(allPlaylistsButton);

      expect(mockOnViewAllPlaylists).toHaveBeenCalledTimes(1);
    });

    it('should call onPlayPlaylist with random playlist when Random button clicked', async () => {
      const user = userEvent.setup();

      // Mock Math.random to make test deterministic
      const mockRandom = jest
        .spyOn(Math, 'random')
        .mockReturnValue(0);

      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const randomButton = screen.getByText('Random Playlist');
      await user.click(randomButton);

      expect(mockOnPlayPlaylist).toHaveBeenCalledTimes(1);
      expect(mockOnPlayPlaylist).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          leagueId: 'Test League',
          leagueName: 'Test League',
        }),
      );

      mockRandom.mockRestore();
    });
  });

  describe('Random Playlist Logic', () => {
    it('should not call onPlayPlaylist when no leagues available', async () => {
      const user = userEvent.setup();

      render(
        <QuickPlaylistSection
          recentPlaylists={[]}
          leagueCategories={[]}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const randomButton = screen.getByText('Random Playlist');
      await user.click(randomButton);

      expect(mockOnPlayPlaylist).not.toHaveBeenCalled();
    });

    it('should not call onPlayPlaylist when leagues have no playlists', async () => {
      const user = userEvent.setup();

      const categoriesWithoutPlaylists: LeagueCategory[] = [
        {
          id: 'category-1',
          name: 'Test Category',
          icon: <Music />,
          description: 'Test Description',
          leagueCount: 1,
          totalParticipants: 10,
          color: 'purple',
          leagues: [
            {
              title: 'Test League',
              rounds: [],
              leagueStandings: [],
            },
          ],
        },
      ];

      render(
        <QuickPlaylistSection
          recentPlaylists={[]}
          leagueCategories={categoriesWithoutPlaylists}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const randomButton = screen.getByText('Random Playlist');
      await user.click(randomButton);

      expect(mockOnPlayPlaylist).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels for buttons', () => {
      render(
        <QuickPlaylistSection
          recentPlaylists={mockRecentPlaylists}
          leagueCategories={mockLeagueCategories}
          onPlayPlaylist={mockOnPlayPlaylist}
          onViewAllPlaylists={mockOnViewAllPlaylists}
        />,
      );

      const randomButton = screen.getByText('Random Playlist');
      const allPlaylistsButton = screen.getByText('All Playlists');

      expect(randomButton).toBeInTheDocument();
      expect(allPlaylistsButton).toBeInTheDocument();
    });
  });
});
