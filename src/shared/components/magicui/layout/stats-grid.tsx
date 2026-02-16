'use client';

import { cn } from '@/shared/lib/utils';

import { BlurFade } from '../core/blur-fade';

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  stagger?: boolean;
  staggerDelay?: number;
}

const gridColumns = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

const gridGaps = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

export function StatsGrid({
  children,
  className,
  columns = 3,
  gap = 'md',
  stagger = true,
  staggerDelay = 0.1,
}: StatsGridProps) {
  const childrenArray = Array.isArray(children)
    ? children
    : [children];

  return (
    <div
      className={cn(
        'grid',
        gridColumns[columns],
        gridGaps[gap],
        className,
      )}
    >
      {stagger
        ? childrenArray.map((child, index) => (
            <BlurFade
              key={index}
              delay={index * staggerDelay}
              direction="up"
              offset={20}
            >
              {child}
            </BlurFade>
          ))
        : children}
    </div>
  );
}
