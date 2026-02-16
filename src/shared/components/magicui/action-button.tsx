'use client';

import { motion } from 'motion/react';

import { Button, type ButtonProps } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  pulse?: boolean;
  shine?: boolean;
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl',
  secondary:
    'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700 hover:border-gray-600',
  ghost: 'bg-transparent hover:bg-white/10 text-white border-0',
  outline:
    'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/30',
};

export function ActionButton({
  children,
  variant = 'primary',
  size = 'default',
  icon,
  iconPosition = 'left',
  loading = false,
  pulse = false,
  shine = false,
  className,
  disabled,
  ...props
}: Readonly<ActionButtonProps>) {
  const isDisabled = disabled || loading;

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <Button
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          buttonVariants[variant],
          pulse && !isDisabled && 'animate-pulse',
          shine &&
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
          className,
        )}
        size={size}
        disabled={isDisabled}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && (
            <span
              className={cn('flex-shrink-0', loading && 'opacity-0')}
            >
              {icon}
            </span>
          )}

          <span className={cn(loading && 'opacity-0')}>
            {children}
          </span>

          {icon && iconPosition === 'right' && (
            <span
              className={cn('flex-shrink-0', loading && 'opacity-0')}
            >
              {icon}
            </span>
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </Button>
    </motion.div>
  );
}
