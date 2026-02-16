/**
 * @file magic-hero-banner.test.tsx
 * @description Tests for MagicHeroBanner component with action buttons
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar, Play } from 'lucide-react';
import { BrowserRouter } from 'react-router-dom';

import MagicHeroBanner, {
  type ActionButton,
} from '../magic-hero-banner';

// Mock framer-motion to avoid animation issues in tests
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div {...props}>{children}</div>
    ),
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock heavy components
jest.mock('../particles', () => ({
  Particles: () => <div data-testid="particles">Particles</div>,
}));

jest.mock('../meteors', () => ({
  Meteors: () => <div data-testid="meteors">Meteors</div>,
}));

jest.mock('../border-beam', () => ({
  BorderBeam: () => <div data-testid="border-beam">BorderBeam</div>,
}));

jest.mock('../magic-card', () => ({
  MagicCard: ({ children, className }: any) => (
    <div data-testid="magic-card" className={className}>
      {children}
    </div>
  ),
}));

jest.mock('../number-ticker', () => ({
  NumberTicker: ({ value }: { value: number }) => (
    <span>{value}</span>
  ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('MagicHeroBanner', () => {
  describe('Basic Rendering', () => {
    it('should render title correctly', () => {
      renderWithRouter(<MagicHeroBanner title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      renderWithRouter(
        <MagicHeroBanner
          title="Test Title"
          subtitle="Test Subtitle"
        />,
      );
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should render without subtitle', () => {
      renderWithRouter(<MagicHeroBanner title="Test Title" />);
      expect(
        screen.queryByText('Test Subtitle'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('should not render action buttons when actions array is empty', () => {
      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={[]} />,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render action buttons with labels', () => {
      const actions: ActionButton[] = [
        { label: 'Get Started', onClick: jest.fn() },
        { label: 'Learn More', onClick: jest.fn() },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should render action buttons with icons', () => {
      const actions: ActionButton[] = [
        {
          label: 'Play',
          icon: <Play data-testid="play-icon" />,
          onClick: jest.fn(),
        },
        {
          label: 'Schedule',
          icon: <Calendar data-testid="calendar-icon" />,
          onClick: jest.fn(),
        },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      expect(screen.getByTestId('play-icon')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });

    it('should handle button click events', () => {
      const mockClick = jest.fn();
      const actions: ActionButton[] = [
        { label: 'Click Me', onClick: mockClick },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      const button = screen.getByText('Click Me');
      fireEvent.click(button);

      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('should render internal navigation link with "to" prop', () => {
      const actions: ActionButton[] = [
        { label: 'Go to Albums', to: '/albums' },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      const link = screen.getByText('Go to Albums').closest('a');
      expect(link).toHaveAttribute('href', '/albums');
    });

    it('should render external link with "href" prop', () => {
      const actions: ActionButton[] = [
        { label: 'External Link', href: 'https://example.com' },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      const link = screen.getByText('External Link').closest('a');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should apply correct variant styles', () => {
      const actions: ActionButton[] = [
        { label: 'Primary', onClick: jest.fn(), variant: 'primary' },
        {
          label: 'Secondary',
          onClick: jest.fn(),
          variant: 'secondary',
        },
        { label: 'Ghost', onClick: jest.fn(), variant: 'ghost' },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      expect(screen.getByText('Primary')).toBeInTheDocument();
      expect(screen.getByText('Secondary')).toBeInTheDocument();
      expect(screen.getByText('Ghost')).toBeInTheDocument();
    });

    it('should default to primary variant when not specified', () => {
      const actions: ActionButton[] = [
        { label: 'Default Button', onClick: jest.fn() },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      const button = screen.getByText('Default Button');
      expect(button).toBeInTheDocument();
    });

    it('should render multiple action buttons', () => {
      const actions: ActionButton[] = [
        { label: 'Action 1', onClick: jest.fn() },
        { label: 'Action 2', onClick: jest.fn() },
        { label: 'Action 3', to: '/test' },
        { label: 'Action 4', href: 'https://example.com' },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" actions={actions} />,
      );

      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
      expect(screen.getByText('Action 3')).toBeInTheDocument();
      expect(screen.getByText('Action 4')).toBeInTheDocument();
    });
  });

  describe('Backward Compatibility', () => {
    it('should work without actions prop (backward compatibility)', () => {
      renderWithRouter(
        <MagicHeroBanner title="Test Title" subtitle="Subtitle" />,
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render with stats but no actions', () => {
      const stats = [
        { label: 'Albums', value: 100 },
        { label: 'Artists', value: 50 },
      ];

      renderWithRouter(
        <MagicHeroBanner title="Test Title" stats={stats} />,
      );

      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('Albums')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Combined Features', () => {
    it('should render stats and action buttons together', () => {
      const stats = [{ label: 'Total', value: 42 }];
      const actions: ActionButton[] = [
        { label: 'View Details', onClick: jest.fn() },
      ];

      renderWithRouter(
        <MagicHeroBanner
          title="Test Title"
          stats={stats}
          actions={actions}
        />,
      );

      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    it('should render with all optional features', () => {
      const stats = [{ label: 'Count', value: 10 }];
      const actions: ActionButton[] = [
        {
          label: 'Action',
          icon: <Play data-testid="action-icon" />,
          onClick: jest.fn(),
        },
      ];

      renderWithRouter(
        <MagicHeroBanner
          title="Full Test"
          subtitle="Complete"
          stats={stats}
          actions={actions}
          enableParticles={true}
          enableMeteors={true}
          enableBorderBeam={true}
        />,
      );

      expect(screen.getByText('Full Test')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByTestId('action-icon')).toBeInTheDocument();
    });
  });
});
