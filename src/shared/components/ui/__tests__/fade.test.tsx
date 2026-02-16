import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';

import { Fade } from '../fade';

// Mock timers for testing animations
jest.useFakeTimers();

describe('Fade', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('does not render children when not mounted', () => {
    const { container } = render(
      <Fade in={false}>
        <div>Content</div>
      </Fade>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders children with initial opacity 0 when mounted', () => {
    const { container } = render(
      <Fade in={true}>
        <div>Content</div>
      </Fade>,
    );

    const fade = container.firstChild as HTMLElement;
    expect(fade).toHaveClass('opacity-0');
    expect(fade).toHaveClass('transition-opacity');
    expect(fade).toHaveClass('duration-300');
  });

  it('applies fade-in animation when mounted', () => {
    const { rerender: _rerender } = render(
      <Fade in={false} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    _rerender(
      <Fade in={true} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    // Fast-forward time to complete the fade-in
    act(() => {
      jest.advanceTimersByTime(300);
    });

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveClass('opacity-100');

    // Trigger fade out
    _rerender(
      <Fade in={false} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    // Should now be fading out (opacity-0)
    expect(fade).toHaveClass('opacity-0');

    // Fast-forward time to complete the fade-out
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should be unmounted
    expect(screen.queryByTestId('fade')).not.toBeInTheDocument();
  });

  it('applies fade-out animation when unmounting', () => {
    const { rerender: _rerender } = render(
      <Fade in={true} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    // Fast-forward time to complete the fade-in
    act(() => {
      jest.advanceTimersByTime(300);
    });

    _rerender(
      <Fade in={false} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    // Fast-forward time to complete the fade-out
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Should be unmounted
    expect(screen.queryByTestId('fade')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Fade in={true} className="custom-class" data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    const fade = screen.getByTestId('fade');
    expect(fade).toHaveClass('custom-class');
    expect(fade).toHaveClass('transition-opacity');
    expect(fade).toHaveClass('duration-300');
  });

  it('forwards ref to the underlying div', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Fade in={true} ref={ref} data-testid="fade">
        <div>Content</div>
      </Fade>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('transition-opacity');
  });

  it('handles transition end events', () => {
    const onTransitionEnd = jest.fn();

    render(
      <Fade
        in={true}
        onTransitionEnd={onTransitionEnd}
        data-testid="fade"
      >
        <div>Content</div>
      </Fade>,
    );

    const fade = screen.getByText('Content')
      .parentElement as HTMLElement;
    fireEvent.transitionEnd(fade);

    expect(onTransitionEnd).toHaveBeenCalledTimes(1);
  });
});
