import { act, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType } from 'react';

import { TypingAnimation } from '../typing-animation';

const useInViewMock = jest.fn(() => true);

jest.mock('motion/react', () => ({
  motion: {
    create:
      (Component: ElementType) =>
      ({ children, ...props }: ComponentProps<any>) => (
        <Component {...props}>{children}</Component>
      ),
  },
  useInView: (...args: unknown[]) => useInViewMock(...args),
}));

describe('TypingAnimation', () => {
  beforeEach(() => {
    useInViewMock.mockReturnValue(true);
  });

  it('types text after the delay', () => {
    jest.useFakeTimers();

    const { container } = render(
      <TypingAnimation duration={50} delay={100}>
        Hello
      </TypingAnimation>,
    );

    expect(container.firstChild).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(screen.getByText('H')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByText('Hello')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('waits for view when startOnView is true', () => {
    jest.useFakeTimers();
    useInViewMock.mockReturnValue(false);

    const { container, rerender } = render(
      <TypingAnimation startOnView duration={10}>
        View
      </TypingAnimation>,
    );

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(container.firstChild).toBeInTheDocument();

    useInViewMock.mockReturnValue(true);

    rerender(
      <TypingAnimation startOnView duration={10}>
        View
      </TypingAnimation>,
    );

    act(() => {
      jest.advanceTimersByTime(10);
    });

    act(() => {
      jest.advanceTimersByTime(10);
    });

    expect(screen.getByText('V')).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('renders with custom element type', () => {
    const { container } = render(
      <TypingAnimation as="span" duration={1}>
        Span
      </TypingAnimation>,
    );

    const element = container.firstChild as HTMLElement;
    expect(element.tagName.toLowerCase()).toBe('span');
  });
});
