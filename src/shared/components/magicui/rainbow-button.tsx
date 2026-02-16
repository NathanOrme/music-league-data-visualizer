import { cn } from '@/shared/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const rainbowButtonVariants = cva(
  cn(
    'relative cursor-pointer group transition-all animate-rainbow',
    'inline-flex items-center justify-center gap-2 shrink-0',
    'rounded-md outline-none focus-visible:ring-[3px] aria-invalid:border-destructive',
    'text-sm font-medium whitespace-nowrap',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default:
          'border-0 bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] bg-[length:200%] text-white [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)]',
        outline:
          'border border-input border-b-transparent bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] before:[filter:blur(0.75rem)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)]',
        glass:
          'border-0 bg-[linear-gradient(rgba(26,26,26,0.9),rgba(26,26,26,0.9)),linear-gradient(rgba(51,51,51,0.9)_50%,rgba(26,26,26,0.6)_80%,rgba(26,26,26,0)),linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] bg-[length:200%] text-white backdrop-blur-md [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.125rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#9b59b6,#8e44ad,#1abc9c,#16a085,#9b59b6)] before:[filter:blur(0.75rem)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface RainbowButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean;
}

const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(
        rainbowButtonVariants({ variant, size, className }),
      )}
      ref={ref}
      {...props}
    />
  );
});

RainbowButton.displayName = 'RainbowButton';

export {
  RainbowButton,
  rainbowButtonVariants,
  type RainbowButtonProps,
};
