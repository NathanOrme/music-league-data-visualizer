import { cn } from '@/shared/lib/utils';
import React from 'react';

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(
  (
    {
      className,
      children,
      pulseColor = '#808080',
      duration = '1.5s',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative flex cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground animate-pulse',
          className,
        )}
        style={
          {
            '--pulse-color': pulseColor,
            '--duration': duration,
            animationDuration: duration,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </button>
    );
  },
);

PulsatingButton.displayName = 'PulsatingButton';
