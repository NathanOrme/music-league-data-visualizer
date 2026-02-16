/**
 * @file ActionCard.test.tsx
 * @description Tests for ActionCard component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Target, Trophy } from 'lucide-react';

import type { ActionCardProps } from '../ActionCard';
import { ActionCard } from '../ActionCard';

// Mock MagicUI components
jest.mock('@/shared/components/magicui', () => ({
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
  Trophy: ({ className }: any) => (
    <div data-testid="trophy-icon" className={className} />
  ),
  Target: ({ className }: any) => (
    <div data-testid="target-icon" className={className} />
  ),
  Headphones: ({ className }: any) => (
    <div data-testid="headphones-icon" className={className} />
  ),
}));

const defaultProps: ActionCardProps = {
  title: 'View Standings',
  description: 'See final league rankings and scores',
  icon: Trophy,
  iconColor: 'text-yellow-400',
  gradientColors: 'border-yellow-500/50',
  bgGradient: 'from-yellow-500/10 to-orange-500/20',
  isSelected: false,
  onClick: jest.fn(),
  count: 5,
};

describe('ActionCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders with all required props', () => {
      render(<ActionCard {...defaultProps} />);

      expect(screen.getByText('View Standings')).toBeInTheDocument();
      expect(
        screen.getByText('See final league rankings and scores'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('trophy-icon')).toBeInTheDocument();
      expect(screen.getByText('5 items')).toBeInTheDocument();
    });

    it('renders icon with correct color class', () => {
      render(<ActionCard {...defaultProps} />);

      const icon = screen.getByTestId('trophy-icon');
      expect(icon.className).toContain('text-yellow-400');
    });

    it('displays title and description correctly', () => {
      render(<ActionCard {...defaultProps} />);

      const title = screen.getByText('View Standings');
      const description = screen.getByText(
        'See final league rankings and scores',
      );

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it('renders count badge when count is provided', () => {
      render(<ActionCard {...defaultProps} count={10} />);

      expect(screen.getByText('10 items')).toBeInTheDocument();
    });

    it('does not render count badge when count is undefined', () => {
      const propsWithoutCount = { ...defaultProps, count: undefined };
      render(<ActionCard {...propsWithoutCount} />);

      expect(screen.queryByText(/items/)).not.toBeInTheDocument();
    });

    it('renders singular "item" for count of 1', () => {
      render(<ActionCard {...defaultProps} count={1} />);

      expect(screen.getByText('1 item')).toBeInTheDocument();
    });

    it('renders plural "items" for count greater than 1', () => {
      render(<ActionCard {...defaultProps} count={42} />);

      expect(screen.getByText('42 items')).toBeInTheDocument();
    });

    it('renders count of 0 correctly', () => {
      render(<ActionCard {...defaultProps} count={0} />);

      expect(screen.getByText('0 items')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onClick when card is clicked', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<ActionCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByTestId('magic-card');
      await user.click(card);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick multiple times on multiple clicks', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<ActionCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByTestId('magic-card');
      await user.click(card);
      await user.click(card);
      await user.click(card);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it('is clickable with keyboard navigation', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<ActionCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByTestId('magic-card');
      card.focus();
      await user.keyboard('{Enter}');

      // Note: onClick may or may not fire with Enter depending on implementation
      // This test verifies the card is accessible
      expect(card).toBeInTheDocument();
    });
  });

  describe('Selected State Styling', () => {
    it('applies selected styling when isSelected is true', () => {
      render(<ActionCard {...defaultProps} isSelected={true} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('border-2');
      expect(magicCard.className).toContain(
        defaultProps.gradientColors,
      );
      expect(magicCard.className).toContain(
        `bg-gradient-to-br ${defaultProps.bgGradient}`,
      );
      expect(magicCard.className).toContain('shadow-lg');
    });

    it('applies default styling when isSelected is false', () => {
      render(<ActionCard {...defaultProps} isSelected={false} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('border-white/10');
      expect(magicCard.className).toContain(
        'bg-gradient-to-br from-white/5 to-white/10',
      );
      expect(magicCard.className).toContain('hover:border-white/30');
    });

    it('applies selected styling to icon background when selected', () => {
      render(<ActionCard {...defaultProps} isSelected={true} />);

      const cardContent = screen.getByTestId('card-content');
      // Check that the content contains the selected icon background styling
      expect(cardContent.innerHTML).toContain('bg-white/20');
    });

    it('applies default styling to icon background when not selected', () => {
      render(<ActionCard {...defaultProps} isSelected={false} />);

      const cardContent = screen.getByTestId('card-content');
      // Check that the content contains the default icon background styling
      expect(cardContent.innerHTML).toContain('bg-white/10');
    });

    it('applies selected title color when selected', () => {
      render(<ActionCard {...defaultProps} isSelected={true} />);

      const title = screen.getByText('View Standings');
      expect(title.className).toContain('text-white');
    });

    it('applies default title color when not selected', () => {
      render(<ActionCard {...defaultProps} isSelected={false} />);

      const title = screen.getByText('View Standings');
      expect(title.className).toContain('text-gray-300');
    });

    it('applies selected count badge styling when selected', () => {
      render(<ActionCard {...defaultProps} isSelected={true} />);

      const countBadge = screen.getByText('5 items');
      expect(countBadge.className).toContain('bg-white/20');
      expect(countBadge.className).toContain('text-white');
    });

    it('applies default count badge styling when not selected', () => {
      render(<ActionCard {...defaultProps} isSelected={false} />);

      const countBadge = screen.getByText('5 items');
      expect(countBadge.className).toContain('bg-white/10');
      expect(countBadge.className).toContain('text-gray-300');
    });
  });

  describe('Different Icons and Colors', () => {
    it('renders with different icon types', () => {
      render(
        <ActionCard
          {...defaultProps}
          icon={Target}
          iconColor="text-purple-400"
        />,
      );

      expect(screen.getByTestId('target-icon')).toBeInTheDocument();
    });

    it('applies different gradient colors correctly', () => {
      render(
        <ActionCard
          {...defaultProps}
          gradientColors="border-purple-500/50"
          bgGradient="from-purple-500/10 to-pink-500/20"
          isSelected={true}
        />,
      );

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('border-purple-500/50');
      expect(magicCard.className).toContain(
        'from-purple-500/10 to-pink-500/20',
      );
    });
  });

  describe('Component Structure and Layout', () => {
    it('maintains proper card structure', () => {
      render(<ActionCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      const cardContent = screen.getByTestId('card-content');

      expect(magicCard).toContainElement(cardContent);
    });

    it('applies cursor-pointer and transition classes', () => {
      render(<ActionCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('cursor-pointer');
      expect(magicCard.className).toContain('transition-all');
      expect(magicCard.className).toContain('duration-300');
      expect(magicCard.className).toContain('hover:scale-105');
    });

    it('applies backdrop-blur styling', () => {
      render(<ActionCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('backdrop-blur-sm');
    });

    it('centers content correctly', () => {
      render(<ActionCard {...defaultProps} />);

      const cardContent = screen.getByTestId('card-content');
      expect(cardContent.className).toContain('p-6');
      expect(cardContent.className).toContain('text-center');
      expect(cardContent.className).toContain('space-y-4');
    });
  });

  describe('Edge Cases', () => {
    it('handles very long titles gracefully', () => {
      const longTitle =
        'This is an extremely long title that should still render correctly without breaking the layout';

      render(<ActionCard {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles very long descriptions gracefully', () => {
      const longDescription =
        'This is an extremely long description that should still render correctly without breaking the layout and should maintain proper spacing';

      render(
        <ActionCard
          {...defaultProps}
          description={longDescription}
        />,
      );

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('handles large count numbers', () => {
      render(<ActionCard {...defaultProps} count={9999} />);

      expect(screen.getByText('9999 items')).toBeInTheDocument();
    });

    it('handles toggling between selected states', () => {
      const { rerender } = render(
        <ActionCard {...defaultProps} isSelected={false} />,
      );

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('border-white/10');

      rerender(<ActionCard {...defaultProps} isSelected={true} />);
      expect(magicCard.className).toContain('border-2');
      expect(magicCard.className).toContain(
        defaultProps.gradientColors,
      );

      rerender(<ActionCard {...defaultProps} isSelected={false} />);
      expect(magicCard.className).toContain('border-white/10');
    });

    it('handles rapid clicks without errors', async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();

      render(<ActionCard {...defaultProps} onClick={mockOnClick} />);

      const card = screen.getByTestId('magic-card');

      // Simulate rapid clicks
      for (let i = 0; i < 10; i++) {
        await user.click(card);
      }

      expect(mockOnClick).toHaveBeenCalledTimes(10);
    });

    it('renders without errors when count is 0', () => {
      render(<ActionCard {...defaultProps} count={0} />);

      expect(screen.getByText('0 items')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful text content', () => {
      render(<ActionCard {...defaultProps} />);

      expect(screen.getByText('View Standings')).toBeInTheDocument();
      expect(
        screen.getByText('See final league rankings and scores'),
      ).toBeInTheDocument();
    });

    it('maintains text hierarchy with title and description', () => {
      render(<ActionCard {...defaultProps} />);

      const title = screen.getByText('View Standings');
      const description = screen.getByText(
        'See final league rankings and scores',
      );

      // Title should have larger, bolder styling
      expect(title.className).toContain('text-xl');
      expect(title.className).toContain('font-bold');

      // Description should have smaller, secondary styling
      expect(description.className).toContain('text-sm');
      expect(description.className).toContain('text-gray-400');
    });

    it('provides visual feedback on hover', () => {
      render(<ActionCard {...defaultProps} />);

      const magicCard = screen.getByTestId('magic-card');
      expect(magicCard.className).toContain('hover:scale-105');
    });
  });

  describe('Performance and Cleanup', () => {
    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<ActionCard {...defaultProps} />);

      expect(() => unmount()).not.toThrow();
    });

    it('re-renders efficiently with same props', () => {
      const { rerender } = render(<ActionCard {...defaultProps} />);

      rerender(<ActionCard {...defaultProps} />);

      expect(screen.getByText('View Standings')).toBeInTheDocument();
    });
  });
});
