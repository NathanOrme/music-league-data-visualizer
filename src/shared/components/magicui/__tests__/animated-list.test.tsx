import { act, render, screen } from '@testing-library/react';

import { AnimatedList } from '../animated-list';

jest.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe('AnimatedList', () => {
  it('renders items progressively based on delay', () => {
    jest.useFakeTimers();

    render(
      <AnimatedList delay={100}>
        <span>First</span>
        <span>Second</span>
      </AnimatedList>,
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.queryByText('Second')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('applies provided className to the wrapper', () => {
    const { container } = render(
      <AnimatedList className="custom-wrapper">
        <span>Only</span>
      </AnimatedList>,
    );

    expect(container.firstChild).toHaveClass('custom-wrapper');
  });
});
