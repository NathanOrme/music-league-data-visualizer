import { render, screen } from '@testing-library/react';

import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('renders a skeleton element with default classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('bg-accent');
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveClass('rounded-md');
    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
  });

  it('applies custom className', () => {
    render(
      <Skeleton className="custom-class" data-testid="skeleton" />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
    // Should still have default classes
    expect(skeleton).toHaveClass('bg-accent');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('forwards additional props to the underlying div', () => {
    render(
      <Skeleton
        data-testid="skeleton"
        data-custom="value"
        aria-label="Loading..."
      />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-custom', 'value');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders with custom dimensions', () => {
    render(<Skeleton className="w-32 h-8" data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('w-32');
    expect(skeleton).toHaveClass('h-8');
  });

  it('matches snapshot', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('can be used as a loading placeholder for various content types', () => {
    // Test with text content
    render(
      <div>
        <Skeleton
          className="h-4 w-3/4 mb-2"
          data-testid="text-skeleton"
        />
        <Skeleton
          className="h-4 w-1/2"
          data-testid="text-skeleton-2"
        />
      </div>,
    );

    const textSkeleton1 = screen.getByTestId('text-skeleton');
    const textSkeleton2 = screen.getByTestId('text-skeleton-2');

    expect(textSkeleton1).toHaveClass('w-3/4');
    expect(textSkeleton2).toHaveClass('w-1/2');

    // Test with avatar
    render(
      <div className="flex items-center space-x-4">
        <Skeleton
          className="h-12 w-12 rounded-full"
          data-testid="avatar-skeleton"
        />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>,
    );

    const avatarSkeleton = screen.getByTestId('avatar-skeleton');
    expect(avatarSkeleton).toHaveClass('rounded-full');
    expect(avatarSkeleton).toHaveClass('h-12 w-12');

    // Test with card
    const { container: cardContainer } = render(
      <div className="border rounded-lg p-4">
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>,
    );

    expect(cardContainer.firstChild).toMatchSnapshot('card-skeleton');
  });
});
