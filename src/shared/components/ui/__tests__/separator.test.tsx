import { render, screen } from '@testing-library/react';

import { Separator } from '../separator';

// Mock cn utility
jest.mock('@/shared/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Separator Component', () => {
  it('renders separator with default horizontal orientation', () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute(
      'data-orientation',
      'horizontal',
    );
  });

  it('renders separator with vertical orientation', () => {
    render(
      <Separator orientation="vertical" data-testid="separator" />,
    );

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('applies correct CSS classes for horizontal orientation', () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass(
      'shrink-0',
      'bg-border',
      'h-[1px]',
      'w-full',
    );
  });

  it('applies correct CSS classes for vertical orientation', () => {
    render(
      <Separator orientation="vertical" data-testid="separator" />,
    );

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass(
      'shrink-0',
      'bg-border',
      'h-full',
      'w-[1px]',
    );
  });

  it('applies custom className along with default classes', () => {
    render(
      <Separator
        className="custom-separator-class"
        data-testid="separator"
      />,
    );

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass(
      'shrink-0',
      'bg-border',
      'h-[1px]',
      'w-full',
      'custom-separator-class',
    );
  });

  it('can be non-decorative when decorative is false', () => {
    render(<Separator decorative={false} data-testid="separator" />);

    const separator = screen.getByTestId('separator');
    expect(separator).not.toHaveAttribute('aria-hidden');
    expect(separator).toHaveAttribute('role', 'separator');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null };

    render(<Separator ref={ref} data-testid="separator" />);

    expect(ref.current).toBeTruthy();
    expect(ref.current).toBe(screen.getByTestId('separator'));
  });

  it('maintains semantic meaning when not decorative', () => {
    render(
      <div>
        <p>Section 1</p>
        <Separator decorative={false} data-testid="separator" />
        <p>Section 2</p>
      </div>,
    );

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).not.toHaveAttribute('aria-hidden');
  });

  it('works in navigation contexts', () => {
    render(
      <nav>
        <a href="#home">Home</a>
        <Separator
          orientation="vertical"
          decorative={false}
          data-testid="nav-separator"
        />
        <a href="#about">About</a>
      </nav>,
    );

    const separator = screen.getByTestId('nav-separator');
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
  });

  it('displays correctly with different CSS frameworks', () => {
    render(
      <Separator
        className="border-gray-300 my-4"
        data-testid="separator"
      />,
    );

    const separator = screen.getByTestId('separator');
    expect(separator).toHaveClass('border-gray-300', 'my-4');
  });

  it('maintains accessibility in different contexts', () => {
    render(
      <div role="main">
        <section>
          <h2>Section Title</h2>
          <p>Content</p>
        </section>
        <Separator
          decorative={false}
          data-testid="section-separator"
        />
        <section>
          <h2>Another Section</h2>
          <p>More content</p>
        </section>
      </div>,
    );

    const separator = screen.getByTestId('section-separator');
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).not.toHaveAttribute('aria-hidden');
  });
});
