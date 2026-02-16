import { cn } from '@/shared/lib/utils';
import { Root } from '@radix-ui/react-separator';
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from 'react';

/**
 * Separator component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.Root - The root element of the separator component.
 * @returns {JSX.Element}
 */
const Separator = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal'
          ? 'h-[1px] w-full'
          : 'h-full w-[1px]',
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = Root.displayName;

/**
 * Separator export.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.Root - The root element of the separator component.
 * @returns {JSX.Element}
 */
export { Separator };
