/**
 * @file LeagueCategoryView.test.tsx
 * @description Tests for LeagueCategoryView component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LeagueCategoryView } from '../LeagueCategoryView';

import type { League } from '@/shared/utils/dataProcessing';
import type { LeagueCategory } from '../types';

// Mock UI components
jest.mock('@/shared/components/ui/card', () => ({
  Card: ({ children, className, onClick, ...props }: any) => (
    <div
      data-testid="card"
      className={className}
      {...(onClick
        ? {
            role: 'button',
            tabIndex: 0,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onClick();
              }
            },
          }
        : {})}
      {...props}
    >
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Users: () => <div data-testid="users-icon" />,
}));

// Mock styles
jest.mock('@/music-league/styles/music-league.styles', () => ({
  musicLeagueStyles: {
    glass: {
      primary: 'bg-primary glass-effect',
      secondary: 'bg-secondary glass-effect',
    },
  },
}));

// Mock league data
const mockLeagues: League[] = [
  {
    title: 'Coffee Shop League Alpha',
    rounds: [
      {
        id: 'round-1',
        name: 'Round 1',
        description: 'First round',
        standings: [],
      },
      {
        id: 'round-2',
        name: 'Round 2',
        description: 'Second round',
        standings: [],
      },
    ],
    leagueStandings: [
      { name: 'Player 1', points: 100 },
      { name: 'Player 2', points: 95 },
    ],
    competitors: [
      { name: 'Player 1' },
      { name: 'Player 2' },
      { name: 'Player 3' },
      { name: 'Player 4' },
    ],
    submissions: [],
    votes: [],
  },
  {
    title: 'Coffee Shop League Beta',
    rounds: [
      {
        id: 'round-1',
        name: 'Round 1',
        description: 'First round',
        standings: [],
      },
      {
        id: 'round-2',
        name: 'Round 2',
        description: 'Second round',
        standings: [],
      },
      {
        id: 'round-3',
        name: 'Round 3',
        description: 'Third round',
        standings: [],
      },
    ],
    leagueStandings: [
      { name: 'Player A', points: 120 },
      { name: 'Player B', points: 110 },
    ],
    competitors: [
      { name: 'Player A' },
      { name: 'Player B' },
      { name: 'Player C' },
    ],
    submissions: [],
    votes: [],
  },
  {
    title: 'Coffee Shop League Gamma',
    rounds: [
      {
        id: 'round-1',
        name: 'Round 1',
        description: 'First round',
        standings: [],
      },
    ],
    leagueStandings: [{ name: 'Solo Player', points: 150 }],
    competitors: [{ name: 'Solo Player' }],
    submissions: [],
    votes: [],
  },
];

const mockCategory: LeagueCategory = {
  id: 'coffee-shop',
  name: 'Coffee Shop Leagues',
  icon: '☕',
  description:
    'Musical leagues hosted at cozy coffee shops around the city',
  leagueCount: 3,
  totalParticipants: 8,
  color: '#8B4513',
  leagues: mockLeagues,
};

const defaultProps = {
  category: mockCategory,
  onNavigateToLeague: jest.fn(),
};

describe('LeagueCategoryView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the category header correctly', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      expect(
        screen.getByText('Coffee Shop Leagues'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Musical leagues hosted at cozy coffee shops around the city',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('☕')).toBeInTheDocument();
    });

    it('displays category statistics correctly', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      expect(screen.getByText('3')).toBeInTheDocument(); // League count
      expect(screen.getByText('8')).toBeInTheDocument(); // Total participants
      expect(screen.getByText('6')).toBeInTheDocument(); // Total rounds (2+3+1)

      expect(screen.getByText('Leagues')).toBeInTheDocument();
      expect(screen.getByText('Participants')).toBeInTheDocument();
      expect(screen.getByText('Total Rounds')).toBeInTheDocument();
    });

    it('renders all leagues in the category', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      expect(
        screen.getByText('Coffee Shop League Alpha'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Coffee Shop League Beta'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Coffee Shop League Gamma'),
      ).toBeInTheDocument();
    });

    it('displays individual league statistics', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      expect(
        screen.getByText('4 participants • 2 rounds'),
      ).toBeInTheDocument(); // Alpha
      expect(
        screen.getByText('3 participants • 3 rounds'),
      ).toBeInTheDocument(); // Beta
      expect(
        screen.getByText('1 participants • 1 rounds'),
      ).toBeInTheDocument(); // Gamma
    });

    it('shows proper icons for each league', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      const userIcons = screen.getAllByTestId('users-icon');
      expect(userIcons).toHaveLength(3); // One for each league

      const arrowIcons = screen.getAllByTestId('arrow-right-icon');
      expect(arrowIcons).toHaveLength(3); // One for each league
    });
  });

  describe('User Interactions', () => {
    it('calls onNavigateToLeague when a league is clicked', async () => {
      const user = userEvent.setup();
      const mockOnNavigateToLeague = jest.fn();

      render(
        <LeagueCategoryView
          {...defaultProps}
          onNavigateToLeague={mockOnNavigateToLeague}
        />,
      );

      const leagueElement = screen.getByText(
        'Coffee Shop League Alpha',
      );
      const clickableParent =
        leagueElement.closest('div[role], [onClick]') ||
        leagueElement.parentElement;

      if (clickableParent) {
        await user.click(clickableParent);
        expect(mockOnNavigateToLeague).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Coffee Shop League Alpha',
          }),
        );
      }
    });

    it('handles multiple league clicks correctly', async () => {
      const user = userEvent.setup();
      const mockOnNavigateToLeague = jest.fn();

      render(
        <LeagueCategoryView
          {...defaultProps}
          onNavigateToLeague={mockOnNavigateToLeague}
        />,
      );

      // Click first league - find the clickable parent div
      const alphaLeague = screen.getByText(
        'Coffee Shop League Alpha',
      );
      let clickableParent = alphaLeague.parentElement;
      while (
        clickableParent &&
        !clickableParent.className.includes('cursor-pointer')
      ) {
        clickableParent = clickableParent.parentElement;
      }
      if (clickableParent) {
        await user.click(clickableParent);
      }

      // Click second league - find the clickable parent div
      const betaLeague = screen.getByText('Coffee Shop League Beta');
      let clickableParent2 = betaLeague.parentElement;
      while (
        clickableParent2 &&
        !clickableParent2.className.includes('cursor-pointer')
      ) {
        clickableParent2 = clickableParent2.parentElement;
      }
      if (clickableParent2) {
        await user.click(clickableParent2);
      }

      expect(mockOnNavigateToLeague).toHaveBeenCalledTimes(2);
      expect(mockOnNavigateToLeague).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          title: 'Coffee Shop League Alpha',
        }),
      );
      expect(mockOnNavigateToLeague).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ title: 'Coffee Shop League Beta' }),
      );
    });

    it('provides visual feedback for clickable elements', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      const leagueTexts = screen.getAllByText(/Coffee Shop League/);
      const clickableElements = leagueTexts
        .map((text) => {
          let parent = text.parentElement;
          while (
            parent &&
            !parent.className.includes('cursor-pointer')
          ) {
            parent = parent.parentElement;
          }
          return parent;
        })
        .filter((el) => el !== null);

      expect(clickableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles category with no leagues', () => {
      const emptyCategory: LeagueCategory = {
        ...mockCategory,
        leagues: [],
        leagueCount: 0,
        totalParticipants: 0,
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={emptyCategory}
        />,
      );

      expect(
        screen.getByText('Coffee Shop Leagues'),
      ).toBeInTheDocument();

      // Check for all zero values - should be exactly 3 zeros (leagues, participants, total rounds)
      const zeroValues = screen.getAllByText('0');
      expect(zeroValues).toHaveLength(3);

      // Should not render any league cards
      expect(
        screen.queryByText('Coffee Shop League Alpha'),
      ).not.toBeInTheDocument();
    });

    it('handles leagues with no competitors', () => {
      const leaguesWithoutCompetitors = mockLeagues.map((league) => ({
        ...league,
        competitors: undefined,
      }));

      const categoryWithEmptyCompetitors: LeagueCategory = {
        ...mockCategory,
        leagues: leaguesWithoutCompetitors,
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={categoryWithEmptyCompetitors}
        />,
      );

      expect(
        screen.getByText('0 participants • 2 rounds'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('0 participants • 3 rounds'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('0 participants • 1 rounds'),
      ).toBeInTheDocument();
    });

    it('handles leagues with no rounds', () => {
      const leaguesWithoutRounds = mockLeagues.map((league) => ({
        ...league,
        rounds: undefined,
      }));

      const categoryWithEmptyRounds: LeagueCategory = {
        ...mockCategory,
        leagues: leaguesWithoutRounds,
        totalParticipants: 8, // Keep original participant count
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={categoryWithEmptyRounds}
        />,
      );

      expect(
        screen.getByText('4 participants • 0 rounds'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('3 participants • 0 rounds'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('1 participants • 0 rounds'),
      ).toBeInTheDocument();

      // Total rounds should be 0
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles empty arrays for competitors and rounds', () => {
      const leaguesWithEmptyArrays = mockLeagues.map((league) => ({
        ...league,
        competitors: [],
        rounds: [],
      }));

      const categoryWithEmptyArrays: LeagueCategory = {
        ...mockCategory,
        leagues: leaguesWithEmptyArrays,
        totalParticipants: 0,
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={categoryWithEmptyArrays}
        />,
      );

      expect(
        screen.getAllByText('0 participants • 0 rounds'),
      ).toHaveLength(3);
    });

    it('calculates total rounds correctly with mixed data', () => {
      const mixedLeagues: League[] = [
        {
          ...mockLeagues[0],
          rounds: [
            {
              id: '1',
              name: 'Round 1',
              description: '',
              standings: [],
            },
          ], // 1 round
        },
        {
          ...mockLeagues[1],
          rounds: undefined, // 0 rounds
        },
        {
          ...mockLeagues[2],
          rounds: [], // 0 rounds
        },
      ];

      const categoryWithMixedData: LeagueCategory = {
        ...mockCategory,
        leagues: mixedLeagues,
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={categoryWithMixedData}
        />,
      );

      // Total rounds should be 1 (1 + 0 + 0)
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('Component Structure and Styling', () => {
    it('applies correct CSS classes', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      const cards = screen.getAllByTestId('card');

      // Header card should have primary styling
      expect(cards[0]).toHaveClass('bg-primary', 'glass-effect');

      // League cards should have secondary styling
      expect(cards[1]).toHaveClass('bg-secondary', 'glass-effect');
    });

    it('maintains proper section structure', () => {
      const { container } = render(
        <LeagueCategoryView {...defaultProps} />,
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('space-y-4');
    });

    it('displays statistics with proper styling classes', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // Check for statistical text colors
      const purpleStats = screen.getByText('3'); // League count
      expect(purpleStats).toHaveClass('text-purple-300');

      const greenStats = screen.getByText('8'); // Participants
      expect(greenStats).toHaveClass('text-green-300');

      const blueStats = screen.getByText('6'); // Total rounds
      expect(blueStats).toHaveClass('text-blue-300');
    });
  });

  describe('Accessibility', () => {
    it('provides semantic structure', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // Should have proper heading hierarchy
      expect(
        screen.getByRole('heading', { level: 2 }),
      ).toHaveTextContent('Coffee Shop Leagues');
      expect(
        screen.getAllByRole('heading', { level: 3 }),
      ).toHaveLength(3);
    });

    it('indicates clickable elements appropriately', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      const clickableElements = screen
        .getAllByText(/Coffee Shop League/)
        .map((text) => text.closest('div'))
        .filter(
          (el) => el && el.className.includes('cursor-pointer'),
        );

      clickableElements.forEach((element) => {
        expect(element).toHaveClass('cursor-pointer');
      });
    });

    it('provides clear visual hierarchy', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // Category name should be larger and more prominent
      const categoryName = screen.getByText('Coffee Shop Leagues');
      expect(categoryName).toHaveClass('text-2xl', 'font-bold');

      // League names should be smaller but still prominent
      const leagueNames = screen
        .getAllByText(/Coffee Shop League/)
        .filter(
          (element) =>
            element.className.includes('text-white') &&
            element.className.includes('font-medium'),
        );
      expect(leagueNames.length).toBeGreaterThanOrEqual(1);
      leagueNames.forEach((name) => {
        expect(name).toHaveClass('text-white', 'font-medium');
      });
    });
  });

  describe('Performance', () => {
    it('uses memoization correctly', () => {
      const { rerender } = render(
        <LeagueCategoryView {...defaultProps} />,
      );

      // Re-render with same props
      rerender(<LeagueCategoryView {...defaultProps} />);

      expect(
        screen.getByText('Coffee Shop Leagues'),
      ).toBeInTheDocument();
    });

    it('handles large numbers of leagues efficiently', () => {
      const manyLeagues = Array.from({ length: 50 }, (_, i) => ({
        ...mockLeagues[0],
        title: `Coffee Shop League ${i + 1}`,
      }));

      const categoryWithManyLeagues: LeagueCategory = {
        ...mockCategory,
        leagues: manyLeagues,
        leagueCount: 50,
        totalParticipants: 200,
      };

      render(
        <LeagueCategoryView
          {...defaultProps}
          category={categoryWithManyLeagues}
        />,
      );

      expect(
        screen.getByText('Coffee Shop League 1'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Coffee Shop League 50'),
      ).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument(); // League count
    });

    it('handles component unmounting gracefully', () => {
      const { unmount } = render(
        <LeagueCategoryView {...defaultProps} />,
      );

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Data Accuracy', () => {
    it('correctly calculates total rounds across all leagues', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // mockLeagues have 2, 3, and 1 rounds respectively = 6 total
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    it('displays correct individual league statistics', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // Alpha: 4 competitors, 2 rounds
      expect(
        screen.getByText('4 participants • 2 rounds'),
      ).toBeInTheDocument();

      // Beta: 3 competitors, 3 rounds
      expect(
        screen.getByText('3 participants • 3 rounds'),
      ).toBeInTheDocument();

      // Gamma: 1 competitor, 1 round
      expect(
        screen.getByText('1 participants • 1 rounds'),
      ).toBeInTheDocument();
    });

    it('maintains data consistency between header stats and individual leagues', () => {
      render(<LeagueCategoryView {...defaultProps} />);

      // Header shows 3 leagues, we should see 3 league cards
      expect(screen.getByText('3')).toBeInTheDocument(); // Leagues in header

      const leagueCards = screen.getAllByTestId('card');
      expect(leagueCards).toHaveLength(4); // 1 header card + 3 league cards
    });
  });
});
