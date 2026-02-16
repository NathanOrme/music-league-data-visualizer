import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { ActionButton } from '../action-button';

jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: { children: ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('ActionButton', () => {
  it('renders content and applies variant styles', () => {
    render(<ActionButton variant="secondary">Click me</ActionButton>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('from-gray-800');
  });

  it('renders icons based on position and shows loading spinner', () => {
    render(
      <ActionButton
        icon={<span data-testid="icon">Icon</span>}
        iconPosition="right"
        loading
      >
        Submit
      </ActionButton>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    const spinner = button.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('adds pulse and shine classes when enabled', () => {
    render(
      <ActionButton pulse shine>
        Pulse
      </ActionButton>,
    );

    const button = screen.getByRole('button', { name: 'Pulse' });
    expect(button).toHaveClass('animate-pulse');
    expect(button).toHaveClass('before:transition-transform');
  });
});
