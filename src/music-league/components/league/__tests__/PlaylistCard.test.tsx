/**
 * @file PlaylistCard.test.tsx
 * @description Tests for PlaylistCard component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PlaylistCardProps } from '../PlaylistCard';
import { PlaylistCard } from '../PlaylistCard';

// Mock MagicUI components
jest.mock('@/shared/components/magicui', () => ({
  MagicCard: ({ children, className }: any) => (
    <div data-testid="magic-card" className={className}>
      {children}
    </div>
  ),
  ActionButton: ({ children, className, onClick, ...props }: any) => (
    <button
      data-testid="action-button"
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock UI components
jest.mock('@/shared/components/ui', () => ({
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  Button: ({ children, className, onClick, ...props }: any) => (
    <button
      data-testid="spotify-button"
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  PlayCircle: () => <div data-testid="play-circle-icon" />,
}));

const roundPlaylist: PlaylistCardProps['playlist'] = {
  url: 'https://open.spotify.com/playlist/123abc',
  title: 'Summer Vibes Round 1',
  description: 'First round playlist with summer hits',
  roundIndex: 0,
  roundId: 'round-1',
  type: 'round',
};

const leaguePlaylist: PlaylistCardProps['playlist'] = {
  url: 'https://open.spotify.com/playlist/456def',
  title: 'Music League 2024 Collection',
  description: 'All songs from the league',
  roundIndex: -1,
  roundId: 'main-playlist',
  type: 'league',
};

const defaultProps: PlaylistCardProps = {
  playlist: roundPlaylist,
  selectedPlaylist: null,
  onPlaylistSelect: jest.fn(),
  onOpenSpotify: jest.fn(),
};

describe('PlaylistCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders round playlist with correct content', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(
        screen.getByText('Summer Vibes Round 1'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('First round playlist with summer hits'),
      ).toBeInTheDocument();
      expect(screen.getByText('Round 1')).toBeInTheDocument();
      expect(screen.getByText('🎵')).toBeInTheDocument();
    });

    it('renders league playlist with correct content', () => {
      render(
        <PlaylistCard {...defaultProps} playlist={leaguePlaylist} />,
      );

      expect(
        screen.getByText('Music League 2024 Collection'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('All songs from the league'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('League Collection'),
      ).toBeInTheDocument();
      expect(screen.getByText('🎼')).toBeInTheDocument();
    });

    it('displays "Play Here" button when not selected', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('Play Here')).toBeInTheDocument();
    });

    it('displays "Playing" button when selected', () => {
      render(
        <PlaylistCard
          {...defaultProps}
          selectedPlaylist={roundPlaylist.url}
        />,
      );

      expect(screen.getByText('Playing')).toBeInTheDocument();
    });

    it('displays "Open in Spotify" button', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('Open in Spotify')).toBeInTheDocument();
    });

    it('shows play circle icons', () => {
      render(<PlaylistCard {...defaultProps} />);

      const playIcons = screen.getAllByTestId('play-circle-icon');
      expect(playIcons.length).toBeGreaterThan(0);
    });

    it('handles playlists without descriptions', () => {
      const playlistWithoutDesc = {
        ...roundPlaylist,
        description: '',
      };

      render(
        <PlaylistCard
          {...defaultProps}
          playlist={playlistWithoutDesc}
        />,
      );

      expect(
        screen.getByText('Summer Vibes Round 1'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('First round playlist with summer hits'),
      ).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onPlaylistSelect when play button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnPlaylistSelect = jest.fn();

      render(
        <PlaylistCard
          {...defaultProps}
          onPlaylistSelect={mockOnPlaylistSelect}
        />,
      );

      const playButton = screen.getByTestId('action-button');
      await user.click(playButton);

      expect(mockOnPlaylistSelect).toHaveBeenCalledWith(
        roundPlaylist.url,
      );
      expect(mockOnPlaylistSelect).toHaveBeenCalledTimes(1);
    });

    it('calls onOpenSpotify when Spotify button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnOpenSpotify = jest.fn();

      render(
        <PlaylistCard
          {...defaultProps}
          onOpenSpotify={mockOnOpenSpotify}
        />,
      );

      const spotifyButton = screen.getByTestId('spotify-button');
      await user.click(spotifyButton);

      expect(mockOnOpenSpotify).toHaveBeenCalledWith(
        roundPlaylist.url,
      );
      expect(mockOnOpenSpotify).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks on play button', async () => {
      const user = userEvent.setup();
      const mockOnPlaylistSelect = jest.fn();

      render(
        <PlaylistCard
          {...defaultProps}
          onPlaylistSelect={mockOnPlaylistSelect}
        />,
      );

      const playButton = screen.getByTestId('action-button');
      await user.click(playButton);
      await user.click(playButton);
      await user.click(playButton);

      expect(mockOnPlaylistSelect).toHaveBeenCalledTimes(3);
    });
  });

  describe('Selected State', () => {
    it('applies selected styling when playlist is selected', () => {
      render(
        <PlaylistCard
          {...defaultProps}
          selectedPlaylist={roundPlaylist.url}
        />,
      );

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('ring-2');
      expect(magicCard.className).toContain('ring-purple-500/30');
      expect(magicCard.className).toContain('border-purple-500/50');
    });

    it('does not apply selected styling when playlist is not selected', () => {
      render(<PlaylistCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).not.toContain('ring-2');
    });

    it('applies selected styling to action button when selected', () => {
      render(
        <PlaylistCard
          {...defaultProps}
          selectedPlaylist={roundPlaylist.url}
        />,
      );

      const actionButton = screen.getByTestId('action-button');
      expect(actionButton.className).toContain('from-purple-700');
      expect(actionButton.className).toContain('to-teal-700');
      expect(actionButton.className).toContain(
        'shadow-purple-500/25',
      );
    });
  });

  describe('Playlist Types', () => {
    it('correctly labels round playlists with round number', () => {
      const round5Playlist = {
        ...roundPlaylist,
        roundIndex: 4,
        title: 'Round 5 Playlist',
      };

      render(
        <PlaylistCard {...defaultProps} playlist={round5Playlist} />,
      );

      expect(
        screen.getByText('Round 5 Playlist'),
      ).toBeInTheDocument();
      expect(screen.getByText('Round 5')).toBeInTheDocument();
    });

    it('displays correct emoji for round playlists', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('🎵')).toBeInTheDocument();
    });

    it('displays correct emoji for league playlists', () => {
      render(
        <PlaylistCard {...defaultProps} playlist={leaguePlaylist} />,
      );

      expect(screen.getByText('🎼')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long titles', () => {
      const longTitle =
        'This is an extremely long playlist title that should be truncated with line-clamp-2';

      const playlistWithLongTitle = {
        ...roundPlaylist,
        title: longTitle,
      };

      render(
        <PlaylistCard
          {...defaultProps}
          playlist={playlistWithLongTitle}
        />,
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      const titleElement = screen.getByText(longTitle);
      expect(titleElement.className).toContain('line-clamp-2');
    });

    it('handles very long descriptions', () => {
      const longDescription =
        'This is an extremely long description that should be truncated with line-clamp-2 to maintain card layout';

      const playlistWithLongDesc = {
        ...roundPlaylist,
        description: longDescription,
      };

      render(
        <PlaylistCard
          {...defaultProps}
          playlist={playlistWithLongDesc}
        />,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
      const descElement = screen.getByText(longDescription);
      expect(descElement.className).toContain('line-clamp-2');
    });

    it('handles round index 0 correctly', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('Round 1')).toBeInTheDocument();
    });

    it('handles different selectedPlaylist URLs', () => {
      const differentUrl =
        'https://open.spotify.com/playlist/different';

      render(
        <PlaylistCard
          {...defaultProps}
          selectedPlaylist={differentUrl}
        />,
      );

      expect(screen.getByText('Play Here')).toBeInTheDocument();
    });
  });

  describe('Component Structure and Styling', () => {
    it('applies correct CSS classes for layout', () => {
      render(<PlaylistCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('hover:scale-[1.02]');
      expect(magicCard.className).toContain('transition-all');
      expect(magicCard.className).toContain('duration-300');
    });

    it('maintains proper card content structure', () => {
      render(<PlaylistCard {...defaultProps} />);

      const cardContent = screen.getByTestId('card-content');
      expect(cardContent).toBeInTheDocument();
      expect(cardContent.className).toContain('p-4');
    });

    it('applies correct button styling', () => {
      render(<PlaylistCard {...defaultProps} />);

      const actionButton = screen.getByTestId('action-button');
      expect(actionButton.className).toContain('flex-1');
      expect(actionButton.className).toContain('h-9');
      expect(actionButton.className).toContain('bg-gradient-to-r');
      expect(actionButton.className).toContain('from-purple-600');
      expect(actionButton.className).toContain('to-teal-600');

      const spotifyButton = screen.getByTestId('spotify-button');
      expect(spotifyButton.className).toContain(
        'border-green-500/30',
      );
      expect(spotifyButton.className).toContain('text-green-300');
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful button text', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('Play Here')).toBeInTheDocument();
      expect(screen.getByText('Open in Spotify')).toBeInTheDocument();
    });

    it('updates button text based on state', () => {
      const { rerender } = render(<PlaylistCard {...defaultProps} />);

      expect(screen.getByText('Play Here')).toBeInTheDocument();

      rerender(
        <PlaylistCard
          {...defaultProps}
          selectedPlaylist={roundPlaylist.url}
        />,
      );

      expect(screen.getByText('Playing')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('uses memoization correctly', () => {
      const { rerender } = render(<PlaylistCard {...defaultProps} />);

      rerender(<PlaylistCard {...defaultProps} />);

      expect(
        screen.getByText('Summer Vibes Round 1'),
      ).toBeInTheDocument();
    });

    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<PlaylistCard {...defaultProps} />);

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('renders with all required props', () => {
      render(<PlaylistCard {...defaultProps} />);

      expect(
        screen.getByText(roundPlaylist.title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(roundPlaylist.description),
      ).toBeInTheDocument();
      expect(screen.getByText('Round 1')).toBeInTheDocument();
    });

    it('calls correct callbacks with correct arguments', async () => {
      const user = userEvent.setup();
      const mockOnPlaylistSelect = jest.fn();
      const mockOnOpenSpotify = jest.fn();

      render(
        <PlaylistCard
          {...defaultProps}
          onPlaylistSelect={mockOnPlaylistSelect}
          onOpenSpotify={mockOnOpenSpotify}
        />,
      );

      const playButton = screen.getByTestId('action-button');
      await user.click(playButton);
      expect(mockOnPlaylistSelect).toHaveBeenCalledWith(
        roundPlaylist.url,
      );

      const spotifyButton = screen.getByTestId('spotify-button');
      await user.click(spotifyButton);
      expect(mockOnOpenSpotify).toHaveBeenCalledWith(
        roundPlaylist.url,
      );
    });
  });
});
