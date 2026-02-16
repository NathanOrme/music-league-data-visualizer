import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';

/**
 * badgeVariants function.
 *
 * @function
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>} props.Root - The root element of the badge component.
 * @returns {JSX.Element}
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * BadgeProps interface.
 *
 * @interface
 * @param {HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>} props - Component props.
 */
export interface BadgeProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge component.
 *
 * @component
 * @param {BadgeProps} props - Component props.
 * @returns {JSX.Element}
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
