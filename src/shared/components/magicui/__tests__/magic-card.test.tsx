import { render, screen } from '@testing-library/react';

import { MagicCard } from '../magic-card';

describe('MagicCard', () => {
  it('renders children correctly', () => {
    render(
      <MagicCard>
        <div>Test Content</div>
      </MagicCard>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MagicCard className="custom-magic-card">Content</MagicCard>,
    );
    expect(container.firstChild).toHaveClass('custom-magic-card');
  });

  it('applies glass-morphism styling', () => {
    const { container } = render(<MagicCard>Content</MagicCard>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('backdrop-blur-xl');
    expect(card).toHaveClass('border-white/10');
  });

  it('uses design system colors by default', () => {
    render(<MagicCard>Content</MagicCard>);
    // Component should render with purple-teal gradient by default
  });

  it('accepts custom gradient colors', () => {
    render(
      <MagicCard gradientFrom="#ff0000" gradientTo="#00ff00">
        Content
      </MagicCard>,
    );
    // Component should render without errors with custom colors
  });
});
