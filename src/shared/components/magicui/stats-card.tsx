'use client';

import { cn } from '@/shared/lib/utils';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from 'react';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(
    direction === 'down' ? value : startValue,
  );
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? startValue : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces],
  );

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block tabular-nums tracking-wider text-white font-bold',
        className,
      )}
      {...props}
    >
      {startValue}
    </span>
  );
}

interface StatsCardProps {
  value: number;
  label: string;
  color?: 'purple' | 'green' | 'blue' | 'teal' | 'pink';
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

const colorVariants = {
  purple: 'text-purple-300',
  green: 'text-green-300',
  blue: 'text-blue-300',
  teal: 'text-teal-300',
  pink: 'text-pink-300',
};

export function StatsCard({
  value,
  label,
  color = 'purple',
  icon,
  delay = 0,
  className,
}: StatsCardProps) {
  return (
    <div className={cn('text-center space-y-2', className)}>
      {icon && (
        <div className="flex justify-center text-2xl mb-2 opacity-80">
          {icon}
        </div>
      )}
      <NumberTicker
        value={value}
        delay={delay}
        className={cn(
          'text-2xl sm:text-3xl font-bold',
          colorVariants[color],
        )}
      />
      <div className="text-gray-400 text-xs sm:text-sm font-medium">
        {label}
      </div>
    </div>
  );
}
