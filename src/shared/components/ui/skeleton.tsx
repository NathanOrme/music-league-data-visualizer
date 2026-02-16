import { cn } from '@/shared/lib/utils';
import { type JSX } from 'react';

/**
 * Skeleton component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ComponentProps<'div'>} props.Root - The root element of the skeleton component.
 * @returns {JSX.Element}
 */
function Skeleton({
  className,
  ...props
}: React.ComponentProps<'div'>): JSX.Element {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
