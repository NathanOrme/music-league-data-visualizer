'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
}: Readonly<NumberTickerProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    const updateCount = () => {
      if (ref.current) {
        const startTime = Date.now();
        const initialValue = currentValue;
        const targetValue = value;

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / 2000, 1); // 2 second animation

          // Ease out cubic function
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);

          const newValue =
            initialValue +
            (targetValue - initialValue) * easeOutCubic;

          setCurrentValue(newValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCurrentValue(targetValue);
          }
        };

        const timeout = setTimeout(() => {
          requestAnimationFrame(animate);
        }, delay * 1000);

        return () => clearTimeout(timeout);
      }
    };

    updateCount();
  }, [value, delay, currentValue]);

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block tabular-nums', className)}
      initial={{ opacity: 0, y: direction === 'up' ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(currentValue)}
    </motion.span>
  );
}
