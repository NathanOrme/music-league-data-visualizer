'use client';

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '@/shared/lib/utils';

/**
 * Dialog component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the dialog component.
 * @returns {JSX.Element}
 */
const Dialog = Root;

/**
 * DialogTrigger component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLButtonElement>} props.Trigger - The trigger element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogTrigger = Trigger;

/**
 * DialogPortal component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Portal - The portal element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogPortal = Portal;

/**
 * DialogClose component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLButtonElement>} props.Close - The close element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogClose = Close;

/**
 * DialogOverlay component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Overlay - The overlay element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogOverlay = forwardRef<
  ComponentRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = Overlay.displayName;

/**
 * DialogContent component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Content - The content element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogContent = forwardRef<
  ComponentRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </DialogPortal>
));
DialogContent.displayName = Content.displayName;

/**
 * DialogHeader component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Header - The header element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

/**
 * DialogFooter component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Footer - The footer element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Title - The title element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogTitle = forwardRef<
  ComponentRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = Title.displayName;

/**
 * DialogDescription component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Description - The description element of the dialog component.
 * @returns {JSX.Element}
 */
const DialogDescription = forwardRef<
  ComponentRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
