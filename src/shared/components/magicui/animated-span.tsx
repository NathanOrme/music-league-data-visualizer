'use client';

import { cn } from '@/shared/lib/utils';

import { motion } from 'motion/react';

interface AnimatedSpanProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedSpan({
  children,
  className,
  delay = 0,
  duration = 0.5,
}: Readonly<AnimatedSpanProps>) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut',
      }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  );
}
