import { cn } from '@/shared/lib/utils';
import { Root } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from 'react';

/**
 * labelVariants function.
 *
 * @function
 * @param {Object} props - Component props.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.Root - The root element of the label component.
 * @returns {JSX.Element}
 */
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

/**
 * LabelProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.Root - The root element of the label component.
 * @returns {JSX.Element}
 * @type {ComponentRef<typeof LabelPrimitive.Root>}
 * @type {ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>}
 */
const Label = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = Root.displayName;

/**
 * Label export.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.HTMLAttributes<HTMLDivElement>} props.Root - The root element of the label component.
 * @returns {JSX.Element}
 */
export { Label };
