import { cn } from '@/shared/lib/utils';
import { type AnchorHTMLAttributes, forwardRef } from 'react';

/**
 * ExternalLinkProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {React.AnchorHTMLAttributes<HTMLAnchorElement>} props.Anchor - The anchor element of the external link component.
 * @returns {JSX.Element}
 */
export interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

/**
 * ExternalLink component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.AnchorHTMLAttributes<HTMLAnchorElement>} props.Anchor - The anchor element of the external link component.
 * @returns {JSX.Element}
 */
export const ExternalLink = forwardRef<
  HTMLAnchorElement,
  ExternalLinkProps
>(({ className, children, showIcon = true, ...props }, ref) => (
  <a
    ref={ref}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline',
      className,
    )}
    {...props}
  >
    {children}
    {showIcon && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="ml-0.5 h-4 w-4"
        aria-hidden="true"
      >
        <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.14-3.667l3-3z" />
        <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.14 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
      </svg>
    )}
  </a>
));

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
