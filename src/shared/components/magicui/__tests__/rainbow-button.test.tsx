import { render, screen } from '@testing-library/react';

import { RainbowButton } from '../rainbow-button';

describe('RainbowButton', () => {
  it('renders without crashing', () => {
    render(<RainbowButton>Test Button</RainbowButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies correct default variant classes', () => {
    render(
      <RainbowButton data-testid="rainbow-btn">Test</RainbowButton>,
    );
    const button = screen.getByTestId('rainbow-btn');
    expect(button).toHaveClass('animate-rainbow');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <RainbowButton size="sm" data-testid="rainbow-btn">
        Small
      </RainbowButton>,
    );
    expect(screen.getByTestId('rainbow-btn')).toHaveClass('h-9');

    rerender(
      <RainbowButton size="lg" data-testid="rainbow-btn">
        Large
      </RainbowButton>,
    );
    expect(screen.getByTestId('rainbow-btn')).toHaveClass('h-11');
  });

  it('applies glass variant correctly', () => {
    render(
      <RainbowButton variant="glass" data-testid="rainbow-btn">
        Glass
      </RainbowButton>,
    );
    const button = screen.getByTestId('rainbow-btn');
    expect(button).toHaveClass('backdrop-blur-md');
  });

  it('forwards props correctly', () => {
    render(
      <RainbowButton disabled data-testid="rainbow-btn">
        Disabled
      </RainbowButton>,
    );
    const button = screen.getByTestId('rainbow-btn');
    expect(button).toBeDisabled();
  });
});
