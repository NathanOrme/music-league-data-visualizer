import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Alert component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>} props.Root - The root element of the alert component.
 * @returns {JSX.Element}
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Alert component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>} props.Root - The root element of the alert component.
 * @returns {JSX.Element}
 */
const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

/**
 * AlertTitle component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLHeadingElement>} props.Title - The title element of the alert component.
 * @returns {JSX.Element}
 */
const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'mb-1 font-medium leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

/**
 * AlertDescription component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLParagraphElement>} props.Description - The description element of the alert component.
 * @returns {JSX.Element}
 */
const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
