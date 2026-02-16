import { cn } from '@/shared/lib/utils';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

/**
 * Textarea component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {TextareaHTMLAttributes<HTMLTextAreaElement>} props.Root - The root element of the textarea component.
 * @returns {JSX.Element}
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
