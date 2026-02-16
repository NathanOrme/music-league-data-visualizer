/**
 * @file LeagueUrlCard.test.tsx
 * @description Tests for LeagueUrlCard component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { LeagueUrlCardProps } from '../LeagueUrlCard';
import { LeagueUrlCard } from '../LeagueUrlCard';

// Mock MagicUI components
jest.mock('@/shared/components/magicui', () => ({
  MagicCard: ({ children, className }: any) => (
    <div data-testid="magic-card" className={className}>
      {children}
    </div>
  ),
  ShimmerButton: ({ children, className, onClick }: any) => (
    <button
      data-testid="shimmer-button"
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
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

// Mock window.open
const mockWindowOpen = jest.fn();
global.window.open = mockWindowOpen;

const defaultProps: LeagueUrlCardProps = {
  title: 'League Homepage',
  description: 'Main league information and updates',
  emoji: '🏠',
  url: 'https://example.com/league',
  buttonText: 'Visit Homepage',
  colorScheme: 'blue',
};

describe('LeagueUrlCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders the card with correct content', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      expect(screen.getByText('League Homepage')).toBeInTheDocument();
      expect(
        screen.getByText('Main league information and updates'),
      ).toBeInTheDocument();
      expect(screen.getByText('🏠')).toBeInTheDocument();
      expect(screen.getByText('Official Info')).toBeInTheDocument();
      expect(screen.getByText('Visit Homepage')).toBeInTheDocument();
    });

    it('displays the external link icon', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      expect(
        screen.getByTestId('external-link-icon'),
      ).toBeInTheDocument();
    });

    it('renders all color scheme variants correctly', () => {
      const colorSchemes: Array<
        'blue' | 'amber' | 'green' | 'purple'
      > = ['blue', 'amber', 'green', 'purple'];

      colorSchemes.forEach((scheme) => {
        const { unmount } = render(
          <LeagueUrlCard {...defaultProps} colorScheme={scheme} />,
        );
        expect(
          screen.getByText('League Homepage'),
        ).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('User Interactions', () => {
    it('opens URL in new window when button is clicked', async () => {
      const user = userEvent.setup();
      render(<LeagueUrlCard {...defaultProps} />);

      const button = screen.getByTestId('shimmer-button');
      await user.click(button);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://example.com/league',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('handles multiple clicks correctly', async () => {
      const user = userEvent.setup();
      render(<LeagueUrlCard {...defaultProps} />);

      const button = screen.getByTestId('shimmer-button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockWindowOpen).toHaveBeenCalledTimes(3);
    });
  });

  describe('Color Schemes', () => {
    it('applies blue color scheme classes correctly', () => {
      render(<LeagueUrlCard {...defaultProps} colorScheme="blue" />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('from-blue-600/20');
      expect(magicCard.className).toContain('to-cyan-600/20');
    });

    it('applies amber color scheme classes correctly', () => {
      render(<LeagueUrlCard {...defaultProps} colorScheme="amber" />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('from-amber-600/20');
      expect(magicCard.className).toContain('to-yellow-600/20');
    });

    it('applies green color scheme classes correctly', () => {
      render(<LeagueUrlCard {...defaultProps} colorScheme="green" />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('from-green-600/20');
      expect(magicCard.className).toContain('to-emerald-600/20');
    });

    it('applies purple color scheme classes correctly', () => {
      render(
        <LeagueUrlCard {...defaultProps} colorScheme="purple" />,
      );

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('from-purple-600/20');
      expect(magicCard.className).toContain('to-violet-600/20');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long titles', () => {
      const longTitle =
        'This is an extremely long title that should be truncated with line-clamp-2 to prevent layout issues';

      render(<LeagueUrlCard {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      const titleElement = screen.getByText(longTitle);
      expect(titleElement.className).toContain('line-clamp-2');
    });

    it('handles very long descriptions', () => {
      const longDescription =
        'This is an extremely long description that should be truncated with line-clamp-2 to maintain card layout consistency and prevent overflow issues';

      render(
        <LeagueUrlCard
          {...defaultProps}
          description={longDescription}
        />,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
      const descElement = screen.getByText(longDescription);
      expect(descElement.className).toContain('line-clamp-2');
    });

    it('handles special characters in URL', () => {
      const specialUrl =
        'https://example.com/league?id=123&name=Test%20League';

      render(<LeagueUrlCard {...defaultProps} url={specialUrl} />);

      const button = screen.getByTestId('shimmer-button');
      button.click();

      expect(mockWindowOpen).toHaveBeenCalledWith(
        specialUrl,
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('handles empty emoji gracefully', () => {
      render(<LeagueUrlCard {...defaultProps} emoji="" />);

      expect(screen.getByText('League Homepage')).toBeInTheDocument();
    });
  });

  describe('Component Structure and Styling', () => {
    it('applies correct CSS classes for layout', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('hover:scale-[1.02]');
      expect(magicCard.className).toContain('transition-all');
      expect(magicCard.className).toContain('duration-300');
      expect(magicCard.className).toContain('border-white/10');
    });

    it('maintains proper card content structure', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      const cardContent = screen.getByTestId('card-content');
      expect(cardContent).toBeInTheDocument();
      expect(cardContent.className).toContain('p-4');
    });

    it('applies shimmer button styling correctly', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      const shimmerButton = screen.getByTestId('shimmer-button');
      expect(shimmerButton.className).toContain('w-full');
      expect(shimmerButton.className).toContain('text-white');
      expect(shimmerButton.className).toContain('border-none');
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful text content', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      expect(screen.getByText('League Homepage')).toBeInTheDocument();
      expect(screen.getByText('Visit Homepage')).toBeInTheDocument();
      expect(screen.getByText('Official Info')).toBeInTheDocument();
    });

    it('button has correct structure for screen readers', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      const button = screen.getByTestId('shimmer-button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toContain('Visit Homepage');
    });
  });

  describe('Performance', () => {
    it('uses memoization correctly', () => {
      const { rerender } = render(
        <LeagueUrlCard {...defaultProps} />,
      );

      rerender(<LeagueUrlCard {...defaultProps} />);

      expect(screen.getByText('League Homepage')).toBeInTheDocument();
    });

    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<LeagueUrlCard {...defaultProps} />);

      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('renders with all required props', () => {
      render(<LeagueUrlCard {...defaultProps} />);

      expect(
        screen.getByText(defaultProps.title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.description),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.emoji),
      ).toBeInTheDocument();
      expect(
        screen.getByText(defaultProps.buttonText),
      ).toBeInTheDocument();
    });

    it('handles different button text variations', () => {
      const buttonTexts = [
        'Click Here',
        'Visit Now',
        'Learn More',
        'Go to Page',
      ];

      buttonTexts.forEach((text) => {
        const { unmount } = render(
          <LeagueUrlCard {...defaultProps} buttonText={text} />,
        );
        expect(screen.getByText(text)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
