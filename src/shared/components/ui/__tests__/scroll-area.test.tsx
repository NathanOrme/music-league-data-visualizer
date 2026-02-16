import { render, screen } from '@testing-library/react';

import { ScrollArea } from '../scroll-area';

describe('ScrollArea', () => {
  it('renders ScrollArea component', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId('scroll-area');
    expect(scrollArea).toBeInTheDocument();
    expect(scrollArea).toHaveClass('relative', 'overflow-hidden');
  });

  it('applies custom className to ScrollArea', () => {
    render(
      <ScrollArea className="custom-class" data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    const scrollArea = screen.getByTestId('scroll-area');
    expect(scrollArea).toHaveClass('custom-class');
  });

  it('renders children content', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <div data-testid="content">Test content</div>
      </ScrollArea>,
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Test content');
  });

  it('forwards ref to ScrollArea', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;

    render(
      <ScrollArea ref={ref} data-testid="scroll-area">
        <div>Content</div>
      </ScrollArea>,
    );

    expect(ref.current).toBeTruthy();
  });
});
