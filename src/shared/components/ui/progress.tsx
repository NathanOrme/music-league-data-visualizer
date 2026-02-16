import { cn } from '@/shared/lib/utils';
import { uiStyles } from '@/styles/ui.styles';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * ProgressProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the progress component.
 * @returns {JSX.Element}
 */
interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

/**
 * Progress component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the progress component.
 * @returns {JSX.Element}
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percentage = Math.min(
      Math.max((value / max) * 100, 0),
      100,
    );

    return (
      <div
        ref={ref}
        className={cn(uiStyles.progress.container, className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div
          className={uiStyles.progress.bar}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  },
);
Progress.displayName = 'Progress';

/**
 * Progress component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the progress component.
 * @returns {JSX.Element}
 */
export { Progress };
