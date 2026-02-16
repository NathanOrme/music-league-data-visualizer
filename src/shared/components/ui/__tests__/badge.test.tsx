import { render, screen } from '@testing-library/react';

import { Badge } from '../badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
    expect(badge).toHaveClass('border-transparent');
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('px-2.5');
    expect(badge).toHaveClass('py-0.5');
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('font-semibold');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText('Custom Badge');

    expect(badge).toHaveClass('custom-class');
  });

  describe('Variants', () => {
    it('renders secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText('Secondary');

      expect(badge).toHaveClass('bg-secondary');
      expect(badge).toHaveClass('text-secondary-foreground');
      expect(badge).toHaveClass('border-transparent');
    });

    it('renders destructive variant', () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText('Destructive');

      expect(badge).toHaveClass('bg-destructive');
      expect(badge).toHaveClass('text-destructive-foreground');
      expect(badge).toHaveClass('border-transparent');
    });

    it('renders outline variant', () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText('Outline');

      expect(badge).toHaveClass('text-foreground');
      expect(badge).not.toHaveClass('border-transparent');
    });
  });

  it('applies focus styles', () => {
    render(<Badge>Focusable</Badge>);
    const badge = screen.getByText('Focusable');

    expect(badge).toHaveClass('focus:outline-none');
    expect(badge).toHaveClass('focus:ring-2');
    expect(badge).toHaveClass('focus:ring-ring');
    expect(badge).toHaveClass('focus:ring-offset-2');
  });

  it('applies hover styles for default variant', () => {
    render(<Badge>Hover Me</Badge>);
    const badge = screen.getByText('Hover Me');

    expect(badge).toHaveClass('hover:bg-primary/80');
  });

  it('forwards additional props', () => {
    render(
      <Badge data-testid="test-badge" aria-label="Test Badge">
        Test
      </Badge>,
    );
    const badge = screen.getByTestId('test-badge');

    expect(badge).toHaveAttribute('aria-label', 'Test Badge');
  });
});
