/**
 * @file RoundsView.test.tsx
 * @description Comprehensive tests for RoundsView component including pagination and search
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  mockEmptyLeague,
  mockLeague,
  mockRounds,
} from '@/__fixtures__/mockData';
import type { League, Round } from '@/shared/utils/dataProcessing';
import type { RoundsViewProps } from '../RoundsView';
import { RoundsView } from '../RoundsView';

// Mock MagicUI components
jest.mock('@/shared/components/magicui', () => ({
  BlurFade: ({ children }: any) => (
    <div data-testid="blur-fade">{children}</div>
  ),
  MagicCard: ({ children, className, onClick }: any) => (
    <button
      type="button"
      data-testid="magic-card"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
  NumberTicker: ({ value }: any) => <span>{value}</span>,
  RainbowButton: ({ children, className, onClick }: any) => (
    <button
      data-testid="rainbow-button"
      className={className}
      onClick={onClick}
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
  Button: ({ children, className, onClick, disabled }: any) => (
    <button
      data-testid="pagination-button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Target: ({ className }: any) => (
    <div data-testid="target-icon" className={className} />
  ),
  Search: ({ className }: any) => (
    <div data-testid="search-icon" className={className} />
  ),
  X: ({ className }: any) => (
    <div data-testid="x-icon" className={className} />
  ),
  PlayCircle: ({ className }: any) => (
    <div data-testid="play-circle-icon" className={className} />
  ),
  Crown: ({ className }: any) => (
    <div data-testid="crown-icon" className={className} />
  ),
  Music: ({ className }: any) => (
    <div data-testid="music-icon" className={className} />
  ),
  ChevronLeft: ({ className }: any) => (
    <div data-testid="chevron-left-icon" className={className} />
  ),
  ChevronRight: ({ className }: any) => (
    <div data-testid="chevron-right-icon" className={className} />
  ),
}));

// Create mock league with many rounds for pagination testing
const createManyRounds = (count: number): Round[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `round${i + 1}`,
    created: `2024-0${(i % 12) + 1}-01T00:00:00Z`,
    name: `Round ${i + 1} Name`,
    description: `Description for round ${i + 1}`,
    playlist:
      i % 2 === 0
        ? `https://open.spotify.com/playlist/round${i + 1}`
        : undefined,
    standings: [
      {
        position: 1,
        name: 'Winner',
        points: 100,
        song: `Song ${i + 1}`,
      },
    ],
  }));
};

const mockLeagueWithManyRounds: League = {
  ...mockLeague,
  rounds: createManyRounds(25), // More than one page (12 per page)
};

const defaultProps: RoundsViewProps = {
  league: mockLeague,
  selectedPlaylist: null,
  onPlaylistSelect: jest.fn(),
};

describe('RoundsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders header with rounds title and icon', () => {
      render(<RoundsView {...defaultProps} />);

      expect(screen.getByText('League Rounds')).toBeInTheDocument();
      expect(screen.getByTestId('target-icon')).toBeInTheDocument();
    });

    it('displays rounds count correctly', () => {
      render(<RoundsView {...defaultProps} />);

      expect(
        screen.getByText(
          `${mockLeague.rounds.length} of ${mockLeague.rounds.length} rounds`,
        ),
      ).toBeInTheDocument();
    });

    it('renders search bar with search icon', () => {
      render(<RoundsView {...defaultProps} />);

      expect(
        screen.getByPlaceholderText('Search rounds...'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders round cards for each round', () => {
      render(<RoundsView {...defaultProps} />);

      mockLeague.rounds.forEach((round) => {
        expect(screen.getByText(round.name)).toBeInTheDocument();
      });
    });

    it('displays round numbers correctly', () => {
      render(<RoundsView {...defaultProps} />);

      mockLeague.rounds.forEach((_, index) => {
        expect(
          screen.getByText(`Round ${index + 1}`),
        ).toBeInTheDocument();
      });
    });

    it('displays round descriptions when available', () => {
      render(<RoundsView {...defaultProps} />);

      mockLeague.rounds.forEach((round) => {
        if (round.description) {
          expect(
            screen.getByText(round.description),
          ).toBeInTheDocument();
        }
      });
    });

    it('shows play icon for rounds with playlists', () => {
      render(<RoundsView {...defaultProps} />);

      const playIcons = screen.getAllByTestId('play-circle-icon');
      const roundsWithPlaylists = mockLeague.rounds.filter(
        (r) => r.playlist,
      );
      expect(playIcons.length).toBeGreaterThanOrEqual(
        roundsWithPlaylists.length,
      );
    });

    it('displays submission and vote counts', () => {
      render(<RoundsView {...defaultProps} />);

      expect(screen.getAllByText(/songs/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/votes/).length).toBeGreaterThan(0);
    });
  });

  describe('Empty State', () => {
    it('displays empty state when no rounds available', () => {
      render(
        <RoundsView {...defaultProps} league={mockEmptyLeague} />,
      );

      expect(
        screen.getByText('No Rounds Available'),
      ).toBeInTheDocument();
      expect(
        screen.getByText("This league doesn't have round data yet"),
      ).toBeInTheDocument();
      expect(screen.getByText('🎯')).toBeInTheDocument();
    });

    it('does not render search bar when no rounds', () => {
      render(
        <RoundsView {...defaultProps} league={mockEmptyLeague} />,
      );

      expect(
        screen.queryByPlaceholderText('Search rounds...'),
      ).not.toBeInTheDocument();
    });

    it('does not render pagination when no rounds', () => {
      render(
        <RoundsView {...defaultProps} league={mockEmptyLeague} />,
      );

      expect(
        screen.queryByTestId('chevron-left-icon'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('chevron-right-icon'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('filters rounds by name', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'Summer');

      expect(screen.getByText('Summer Vibes')).toBeInTheDocument();
      expect(
        screen.queryByText('Winter Nights'),
      ).not.toBeInTheDocument();
    });

    it('filters rounds by description', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'Cozy');

      expect(screen.getByText('Winter Nights')).toBeInTheDocument();
      expect(
        screen.queryByText('Summer Vibes'),
      ).not.toBeInTheDocument();
    });

    it('filters rounds by round number', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'round 2');

      expect(screen.getByText('Winter Nights')).toBeInTheDocument();
      expect(
        screen.queryByText('Summer Vibes'),
      ).not.toBeInTheDocument();
    });

    it('is case-insensitive', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'SUMMER');

      expect(screen.getByText('Summer Vibes')).toBeInTheDocument();
    });

    it('shows clear button when search query exists', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'test');

      const clearButton = screen
        .getByTestId('x-icon')
        .closest('button');
      expect(clearButton).toBeInTheDocument();
    });

    it('clears search when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput =
        screen.getByPlaceholderText<HTMLInputElement>(
          'Search rounds...',
        );
      await user.type(searchInput, 'Summer');

      expect(searchInput.value).toBe('Summer');

      const clearButton = screen
        .getByTestId('x-icon')
        .closest('button');
      if (clearButton) {
        await user.click(clearButton);
      }

      expect(searchInput.value).toBe('');
    });

    it('resets to page 1 when search query changes', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      // Go to page 2
      const pageButtons = screen.getAllByTestId('pagination-button');
      const page2Button = pageButtons.find(
        (btn) => btn.textContent === '2',
      );
      if (page2Button) {
        await user.click(page2Button);
      }

      // Search - should reset to page 1
      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'Round 1');

      // Page 1 should be selected (check for active styling or first page content)
      expect(screen.getByText('Round 1 Name')).toBeInTheDocument();
    });

    it('updates filtered rounds count', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'Summer');

      expect(
        screen.getByText(`1 of ${mockLeague.rounds.length} rounds`),
      ).toBeInTheDocument();
    });

    it('shows all rounds when search is cleared', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'Summer');

      const clearButton = screen
        .getByTestId('x-icon')
        .closest('button');
      if (clearButton) {
        await user.click(clearButton);
      }

      mockLeague.rounds.forEach((round) => {
        expect(screen.getByText(round.name)).toBeInTheDocument();
      });
    });
  });

  describe('Pagination', () => {
    it('does not show pagination when rounds fit on one page', () => {
      render(<RoundsView {...defaultProps} />);

      // Default mock has only 3 rounds, should fit on one page (12 max)
      expect(
        screen.queryByTestId('chevron-left-icon'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('chevron-right-icon'),
      ).not.toBeInTheDocument();
    });

    it('shows pagination when there are more than 12 rounds', () => {
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      expect(
        screen.getByTestId('chevron-left-icon'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('chevron-right-icon'),
      ).toBeInTheDocument();
    });

    it('displays first 12 rounds on page 1', () => {
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      expect(screen.getByText('Round 1 Name')).toBeInTheDocument();
      expect(screen.getByText('Round 12 Name')).toBeInTheDocument();
      expect(
        screen.queryByText('Round 13 Name'),
      ).not.toBeInTheDocument();
    });

    it('navigates to next page when next button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      const nextButton = screen
        .getByTestId('chevron-right-icon')
        .closest('button');
      if (nextButton) {
        await user.click(nextButton);
      }

      expect(screen.getByText('Round 13 Name')).toBeInTheDocument();
      expect(
        screen.queryByText('Round 1 Name'),
      ).not.toBeInTheDocument();
    });

    it('navigates to previous page when previous button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      // Go to page 2
      const nextButton = screen
        .getByTestId('chevron-right-icon')
        .closest('button');
      if (nextButton) {
        await user.click(nextButton);
      }

      // Go back to page 1
      const prevButton = screen
        .getByTestId('chevron-left-icon')
        .closest('button');
      if (prevButton) {
        await user.click(prevButton);
      }

      expect(screen.getByText('Round 1 Name')).toBeInTheDocument();
      expect(
        screen.queryByText('Round 13 Name'),
      ).not.toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      const prevButton = screen
        .getByTestId('chevron-left-icon')
        .closest('button');
      expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      // Click next button until last page
      const nextButton = screen
        .getByTestId('chevron-right-icon')
        .closest('button');
      if (nextButton) {
        await user.click(nextButton);
        await user.click(nextButton);
      }

      expect(nextButton).toBeDisabled();
    });

    it('shows page numbers', () => {
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('navigates to specific page when page number is clicked', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          league={mockLeagueWithManyRounds}
        />,
      );

      const pageButtons = screen.getAllByTestId('pagination-button');
      const page2Button = pageButtons.find(
        (btn) => btn.textContent === '2',
      );
      if (page2Button) {
        await user.click(page2Button);
      }

      expect(screen.getByText('Round 13 Name')).toBeInTheDocument();
    });

    it('shows ellipsis for pages far from current page', () => {
      const leagueWithManyPages = {
        ...mockLeague,
        rounds: createManyRounds(60), // 5 pages
      };

      render(
        <RoundsView {...defaultProps} league={leagueWithManyPages} />,
      );

      expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    });
  });

  describe('Round Selection', () => {
    it('selects round when card is clicked', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      // Round details modal should appear - round name appears twice (card + details)
      expect(
        screen.getAllByText(mockRounds[0].name).length,
      ).toBeGreaterThan(1);
    });

    it('applies selected styling to selected round', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      expect(roundCards[0].className).toContain('border-2');
      expect(roundCards[0].className).toContain(
        'border-purple-500/50',
      );
    });

    it('deselects round when clicked again', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);
      await user.click(roundCards[0]);

      // Round details should be hidden
      const roundDetails = screen.queryAllByText('Round Stats');
      expect(roundDetails.length).toBe(0);
    });

    it('displays round details when round is selected', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      // Check for NumberTicker components showing stats
      const magicCards = screen.getAllByTestId('magic-card');
      expect(magicCards.length).toBeGreaterThan(3); // Original cards + stat cards
    });

    it('displays round winner when round has standings', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      expect(screen.getByText('Round Winner')).toBeInTheDocument();
      expect(screen.getByTestId('crown-icon')).toBeInTheDocument();
    });

    it('displays play playlist button when round has playlist', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      // Find round with playlist
      const roundWithPlaylist = mockRounds.find((r) => r.playlist);
      if (roundWithPlaylist) {
        const roundCards = screen.getAllByTestId('magic-card');
        await user.click(roundCards[0]);

        expect(
          screen.getByText('Play Round Playlist'),
        ).toBeInTheDocument();
      }
    });

    it('calls onPlaylistSelect when play button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnPlaylistSelect = jest.fn();
      render(
        <RoundsView
          {...defaultProps}
          onPlaylistSelect={mockOnPlaylistSelect}
        />,
      );

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      const playButton = screen.getByTestId('rainbow-button');
      await user.click(playButton);

      expect(mockOnPlaylistSelect).toHaveBeenCalledWith(
        mockRounds[0].playlist,
      );
    });

    it('shows "Playing Now" when playlist is selected', async () => {
      const user = userEvent.setup();
      render(
        <RoundsView
          {...defaultProps}
          selectedPlaylist={mockRounds[0].playlist || ''}
        />,
      );

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      expect(screen.getByText('Playing Now')).toBeInTheDocument();
    });

    it('closes round details when X button is clicked', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      const closeButton = screen
        .getByTestId('x-icon')
        .closest('button');
      if (closeButton) {
        await user.click(closeButton);
      }

      expect(
        screen.queryByText('Round Stats'),
      ).not.toBeInTheDocument();
    });

    it('displays top submissions when round is selected', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      await user.click(roundCards[0]);

      expect(screen.getByText('Top Submissions')).toBeInTheDocument();
      expect(screen.getByTestId('music-icon')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles rounds without descriptions', () => {
      const leagueWithoutDescriptions = {
        ...mockLeague,
        rounds: mockLeague.rounds.map((r) => ({
          ...r,
          description: '',
        })),
      };

      render(
        <RoundsView
          {...defaultProps}
          league={leagueWithoutDescriptions}
        />,
      );

      expect(screen.getByText('League Rounds')).toBeInTheDocument();
    });

    it('handles rounds without playlists', () => {
      const leagueWithoutPlaylists = {
        ...mockLeague,
        rounds: mockLeague.rounds.map((r) => ({
          ...r,
          playlist: undefined,
        })),
      };

      render(
        <RoundsView
          {...defaultProps}
          league={leagueWithoutPlaylists}
        />,
      );

      expect(screen.getByText('League Rounds')).toBeInTheDocument();
    });

    it('handles very long round names', () => {
      const leagueWithLongName = {
        ...mockLeague,
        rounds: [
          {
            ...mockRounds[0],
            name: 'This is an extremely long round name that should still render correctly without breaking the layout',
          },
        ],
      };

      render(
        <RoundsView {...defaultProps} league={leagueWithLongName} />,
      );

      expect(
        screen.getByText(leagueWithLongName.rounds[0].name),
      ).toBeInTheDocument();
    });

    it('handles search with no results', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('0 of 3 rounds')).toBeInTheDocument();
    });

    it('handles exactly 12 rounds (edge of pagination)', () => {
      const leagueWith12Rounds = {
        ...mockLeague,
        rounds: createManyRounds(12),
      };

      render(
        <RoundsView {...defaultProps} league={leagueWith12Rounds} />,
      );

      // Should not show pagination with exactly 12 rounds
      expect(
        screen.queryByTestId('chevron-left-icon'),
      ).not.toBeInTheDocument();
    });

    it('handles exactly 13 rounds (just over one page)', () => {
      const leagueWith13Rounds = {
        ...mockLeague,
        rounds: createManyRounds(13),
      };

      render(
        <RoundsView {...defaultProps} league={leagueWith13Rounds} />,
      );

      // Should show pagination with 13 rounds
      expect(
        screen.getByTestId('chevron-left-icon'),
      ).toBeInTheDocument();
    });
  });

  describe('Component Structure and Styling', () => {
    it('uses grid layout for round cards', () => {
      const { container } = render(<RoundsView {...defaultProps} />);

      const gridElements = container.querySelectorAll(
        '.grid.grid-cols-1',
      );
      expect(gridElements.length).toBeGreaterThan(0);
    });

    it('applies hover effect to round cards', () => {
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');
      roundCards.forEach((card) => {
        expect(card.className).toContain('hover:scale-105');
        expect(card.className).toContain('transition-all');
      });
    });

    it('maintains proper spacing', () => {
      const { container } = render(<RoundsView {...defaultProps} />);

      const spacingElements =
        container.querySelectorAll('.space-y-6');
      expect(spacingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Performance and Cleanup', () => {
    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<RoundsView {...defaultProps} />);

      expect(() => unmount()).not.toThrow();
    });

    it('handles rapid state changes', async () => {
      const user = userEvent.setup();
      render(<RoundsView {...defaultProps} />);

      const roundCards = screen.getAllByTestId('magic-card');

      // Rapidly select and deselect
      await user.click(roundCards[0]);
      await user.click(roundCards[0]);
      await user.click(roundCards[1]);
      await user.click(roundCards[1]);

      expect(screen.getByText('League Rounds')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful heading', () => {
      render(<RoundsView {...defaultProps} />);

      const heading = screen.getByText('League Rounds');
      expect(heading.tagName).toBe('H2');
    });

    it('provides search input with placeholder', () => {
      render(<RoundsView {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText(
        'Search rounds...',
      );
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('provides meaningful empty state', () => {
      render(
        <RoundsView {...defaultProps} league={mockEmptyLeague} />,
      );

      expect(
        screen.getByText('No Rounds Available'),
      ).toBeInTheDocument();
      expect(
        screen.getByText("This league doesn't have round data yet"),
      ).toBeInTheDocument();
    });
  });
});
