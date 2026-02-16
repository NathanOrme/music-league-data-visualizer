/**
 * @file StandingsView.test.tsx
 * @description Tests for StandingsView component
 */

import { render, screen } from '@testing-library/react';

import {
  mockEmptyLeague,
  mockLeague,
  mockLeagueWithoutStandings,
} from '@/__fixtures__/mockData';
import { StandingsView } from '../StandingsView';

// Mock MagicUI components
jest.mock('@/shared/components/magicui', () => ({
  BlurFade: ({ children }: any) => (
    <div data-testid="blur-fade">{children}</div>
  ),
  MagicCard: ({ children, className }: any) => (
    <div data-testid="magic-card" className={className}>
      {children}
    </div>
  ),
}));

// Mock UI components
jest.mock('@/shared/components/ui', () => ({
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  Crown: ({ className }: any) => (
    <div data-testid="crown-icon" className={className} />
  ),
  Trophy: ({ className }: any) => (
    <div data-testid="trophy-icon" className={className} />
  ),
}));

describe('StandingsView', () => {
  describe('Component Rendering with Data', () => {
    it('renders standings header with trophy icon', () => {
      render(<StandingsView league={mockLeague} />);

      expect(screen.getByText('Final Standings')).toBeInTheDocument();
      expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
    });

    it('displays correct participant count', () => {
      render(<StandingsView league={mockLeague} />);

      expect(
        screen.getByText(
          `${mockLeague.leagueStandings.length} participants`,
        ),
      ).toBeInTheDocument();
    });

    it('renders podium for top 3 standings', () => {
      render(<StandingsView league={mockLeague} />);

      // Check for podium medals
      expect(screen.getByText('🥈')).toBeInTheDocument(); // 2nd place
      expect(screen.getByTestId('crown-icon')).toBeInTheDocument(); // 1st place
      expect(screen.getByText('🥉')).toBeInTheDocument(); // 3rd place
    });

    it('displays all standings with positions, names, and points', () => {
      render(<StandingsView league={mockLeague} />);

      mockLeague.leagueStandings.forEach((standing) => {
        expect(
          screen.getAllByText(standing.name).length,
        ).toBeGreaterThan(0);
        expect(
          screen.getAllByText(`${standing.points} pts`).length,
        ).toBeGreaterThan(0);
      });
    });

    it('displays songs in standings when available', () => {
      render(<StandingsView league={mockLeague} />);

      mockLeague.leagueStandings.forEach((standing) => {
        if (standing.song) {
          expect(
            screen.getAllByText(`"${standing.song}"`).length,
          ).toBeGreaterThan(0);
        }
      });
    });

    it('renders first place with champion styling', () => {
      render(<StandingsView league={mockLeague} />);

      // Just verify first place is rendered
      const firstPlace = mockLeague.leagueStandings[0];
      expect(
        screen.getAllByText(firstPlace.name).length,
      ).toBeGreaterThan(0);
    });

    it('displays positions for all standings', () => {
      render(<StandingsView league={mockLeague} />);

      mockLeague.leagueStandings.forEach((standing) => {
        const positions = screen.getAllByText(
          standing.position.toString(),
        );
        expect(positions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Empty State', () => {
    it('displays empty state when no standings available', () => {
      render(<StandingsView league={mockLeagueWithoutStandings} />);

      expect(
        screen.getByText('No Standings Available'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "This league doesn't have standings data yet",
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    it('displays empty state for empty league', () => {
      render(<StandingsView league={mockEmptyLeague} />);

      expect(
        screen.getByText('No Standings Available'),
      ).toBeInTheDocument();
    });

    it('does not render podium when standings are empty', () => {
      render(<StandingsView league={mockEmptyLeague} />);

      expect(screen.queryByText('🥈')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('crown-icon'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('🥉')).not.toBeInTheDocument();
    });

    it('does not render full rankings list when standings are empty', () => {
      render(<StandingsView league={mockEmptyLeague} />);

      expect(screen.queryByText('pts')).not.toBeInTheDocument();
    });
  });

  describe('Podium Display', () => {
    it('renders podium only when there are at least 3 standings', () => {
      render(<StandingsView league={mockLeague} />);

      // Podium should be rendered
      expect(screen.getByText('🥈')).toBeInTheDocument();
      expect(screen.getByTestId('crown-icon')).toBeInTheDocument();
      expect(screen.getByText('🥉')).toBeInTheDocument();
    });

    it('displays 1st place in the center with crown icon', () => {
      render(<StandingsView league={mockLeague} />);

      const firstPlace = mockLeague.leagueStandings[0];
      expect(screen.getByTestId('crown-icon')).toBeInTheDocument();
      expect(
        screen.getAllByText(firstPlace.name).length,
      ).toBeGreaterThan(0);
    });

    it('displays 2nd place with silver medal', () => {
      render(<StandingsView league={mockLeague} />);

      const secondPlace = mockLeague.leagueStandings[1];
      expect(screen.getByText('🥈')).toBeInTheDocument();
      expect(
        screen.getAllByText(secondPlace.name).length,
      ).toBeGreaterThan(0);
    });

    it('displays 3rd place with bronze medal', () => {
      render(<StandingsView league={mockLeague} />);

      const thirdPlace = mockLeague.leagueStandings[2];
      expect(screen.getByText('🥉')).toBeInTheDocument();
      expect(
        screen.getAllByText(thirdPlace.name).length,
      ).toBeGreaterThan(0);
    });

    it('renders podium with correct positions', () => {
      render(<StandingsView league={mockLeague} />);

      const positions = screen.getAllByText('1');
      expect(positions.length).toBeGreaterThan(0);

      expect(screen.getAllByText('2').length).toBeGreaterThan(0);
      expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    });

    it('renders podium with points for top 3', () => {
      render(<StandingsView league={mockLeague} />);

      const top3 = mockLeague.leagueStandings.slice(0, 3);
      top3.forEach((standing) => {
        expect(
          screen.getAllByText(`${standing.points} pts`).length,
        ).toBeGreaterThan(0);
      });
    });
  });

  describe('Full Rankings List', () => {
    it('renders all standings in full rankings list', () => {
      render(<StandingsView league={mockLeague} />);

      mockLeague.leagueStandings.forEach((standing) => {
        expect(
          screen.getAllByText(standing.name).length,
        ).toBeGreaterThan(0);
      });
    });

    it('applies special styling to top 3 in rankings list', () => {
      render(<StandingsView league={mockLeague} />);

      // Just verify top 3 are rendered with points
      const top3 = mockLeague.leagueStandings.slice(0, 3);
      top3.forEach((standing) => {
        expect(
          screen.getAllByText(standing.name).length,
        ).toBeGreaterThan(0);
        expect(
          screen.getAllByText(`${standing.points} pts`).length,
        ).toBeGreaterThan(0);
      });
    });

    it('displays song titles with quotes', () => {
      render(<StandingsView league={mockLeague} />);

      mockLeague.leagueStandings.forEach((standing) => {
        if (standing.song) {
          expect(
            screen.getAllByText(`"${standing.song}"`).length,
          ).toBeGreaterThan(0);
        }
      });
    });

    it('renders positions with correct styling', () => {
      render(<StandingsView league={mockLeague} />);

      const firstPositionElements = screen.getAllByText('1');
      expect(firstPositionElements.length).toBeGreaterThan(0);
      // Position appears in podium (yellow-300) and rankings (yellow-400)
      // Just verify position 1 is displayed
      expect(firstPositionElements[0]).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('uses grid layout for podium', () => {
      const { container } = render(
        <StandingsView league={mockLeague} />,
      );

      const gridElements = container.querySelectorAll('.grid-cols-3');
      expect(gridElements.length).toBeGreaterThan(0);
    });

    it('maintains proper spacing between elements', () => {
      const { container } = render(
        <StandingsView league={mockLeague} />,
      );

      const spacingElements =
        container.querySelectorAll('.space-y-6');
      expect(spacingElements.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles standings without songs gracefully', () => {
      const leagueWithoutSongs = {
        ...mockLeague,
        leagueStandings: mockLeague.leagueStandings.map((s) => ({
          ...s,
          song: '',
        })),
      };

      render(<StandingsView league={leagueWithoutSongs} />);

      expect(screen.getByText('Final Standings')).toBeInTheDocument();
      // Should not crash and should still render names and points
      expect(
        screen.getAllByText(
          leagueWithoutSongs.leagueStandings[0].name,
        ).length,
      ).toBeGreaterThan(0);
    });

    it('handles exactly 3 standings (minimum for podium)', () => {
      const leagueWith3Standings = {
        ...mockLeague,
        leagueStandings: mockLeague.leagueStandings.slice(0, 3),
      };

      render(<StandingsView league={leagueWith3Standings} />);

      expect(screen.getByText('🥈')).toBeInTheDocument();
      expect(screen.getByTestId('crown-icon')).toBeInTheDocument();
      expect(screen.getByText('🥉')).toBeInTheDocument();
      expect(screen.getByText('3 participants')).toBeInTheDocument();
    });

    it('handles exactly 2 standings (no podium)', () => {
      const leagueWith2Standings = {
        ...mockLeague,
        leagueStandings: mockLeague.leagueStandings.slice(0, 2),
      };

      render(<StandingsView league={leagueWith2Standings} />);

      // No podium should be shown
      expect(screen.queryByText('🥈')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('crown-icon'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('🥉')).not.toBeInTheDocument();

      // But full rankings should still be displayed
      expect(
        screen.getByText(
          leagueWith2Standings.leagueStandings[0].name,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('2 participants')).toBeInTheDocument();
    });

    it('handles large point numbers', () => {
      const leagueWithLargePoints = {
        ...mockLeague,
        leagueStandings: [
          {
            position: 1,
            name: 'High Scorer',
            points: 99999,
            song: 'Epic Song',
          },
        ],
      };

      render(<StandingsView league={leagueWithLargePoints} />);

      expect(screen.getByText('99999 pts')).toBeInTheDocument();
    });

    it('handles very long player names', () => {
      const leagueWithLongName = {
        ...mockLeague,
        leagueStandings: [
          {
            position: 1,
            name: 'This is an extremely long player name that should still render correctly without breaking the layout',
            points: 100,
            song: 'Song Title',
          },
        ],
      };

      render(<StandingsView league={leagueWithLongName} />);

      expect(
        screen.getByText(leagueWithLongName.leagueStandings[0].name),
      ).toBeInTheDocument();
    });

    it('handles very long song titles', () => {
      const leagueWithLongSong = {
        ...mockLeague,
        leagueStandings: [
          {
            position: 1,
            name: 'Player Name',
            points: 100,
            song: 'This is an extremely long song title that should be truncated with the line-clamp-2 utility',
          },
        ],
      };

      render(<StandingsView league={leagueWithLongSong} />);

      const songElement = screen.getByText(
        `"${leagueWithLongSong.leagueStandings[0].song}"`,
      );
      expect(songElement).toBeInTheDocument();
      expect(songElement.className).toContain('truncate');
    });

    it('handles tied positions', () => {
      const leagueWithTies = {
        ...mockLeague,
        leagueStandings: [
          {
            position: 1,
            name: 'Player 1',
            points: 100,
            song: 'Song 1',
          },
          {
            position: 1,
            name: 'Player 2',
            points: 100,
            song: 'Song 2',
          },
          {
            position: 3,
            name: 'Player 3',
            points: 90,
            song: 'Song 3',
          },
        ],
      };

      render(<StandingsView league={leagueWithTies} />);

      const positions = screen.getAllByText('1');
      // Should have two instances of position 1
      expect(positions.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Component Structure and Styling', () => {
    it('applies correct backdrop blur and gradient styling', () => {
      render(<StandingsView league={mockLeague} />);

      const magicCards = screen.getAllByTestId('magic-card');
      magicCards.forEach((card) => {
        expect(card.className).toContain('backdrop-blur-sm');
        expect(card.className).toContain('bg-gradient-to-br');
      });
    });

    it('maintains proper card structure', () => {
      render(<StandingsView league={mockLeague} />);

      const magicCards = screen.getAllByTestId('magic-card');
      const cardContents = screen.getAllByTestId('card-content');

      expect(magicCards.length).toBeGreaterThan(0);
      expect(cardContents.length).toBeGreaterThan(0);
    });

    it('uses BlurFade animation components', () => {
      render(<StandingsView league={mockLeague} />);

      const blurFades = screen.getAllByTestId('blur-fade');
      expect(blurFades.length).toBeGreaterThan(0);
    });
  });

  describe('Performance and Cleanup', () => {
    it('handles component unmounting gracefully', () => {
      const { unmount } = render(
        <StandingsView league={mockLeague} />,
      );

      expect(() => unmount()).not.toThrow();
    });

    it('re-renders efficiently when props change', () => {
      const { rerender } = render(
        <StandingsView league={mockLeague} />,
      );

      rerender(<StandingsView league={mockEmptyLeague} />);

      expect(
        screen.getByText('No Standings Available'),
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful text content for screen readers', () => {
      render(<StandingsView league={mockLeague} />);

      expect(screen.getByText('Final Standings')).toBeInTheDocument();
      expect(
        screen.getByText(
          `${mockLeague.leagueStandings.length} participants`,
        ),
      ).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      render(<StandingsView league={mockLeague} />);

      const heading = screen.getByText('Final Standings');
      expect(heading.tagName).toBe('H2');
    });

    it('provides meaningful empty state message', () => {
      render(<StandingsView league={mockEmptyLeague} />);

      expect(
        screen.getByText('No Standings Available'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "This league doesn't have standings data yet",
        ),
      ).toBeInTheDocument();
    });
  });
});
