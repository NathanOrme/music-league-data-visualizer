'use client';

import { cn } from '@/shared/lib/utils';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react';
import React, { useCallback, useEffect, useRef } from 'react';

interface MusicLeagueCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  glassEffect?: boolean;
}

const cardVariants = {
  primary:
    'bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/20',
  secondary:
    'bg-gradient-to-br from-teal-900/20 to-green-900/20 border-teal-500/20',
  accent:
    'bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-pink-500/20',
};

export function MusicLeagueCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = '#9b59b6',
  gradientOpacity = 0.3,
  gradientFrom = '#9b59b6',
  gradientTo = '#1abc9c',
  variant = 'primary',
  glassEffect = true,
  ...props
}: MusicLeagueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY],
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener('mousemove', handleMouseMove);
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
      }
    },
    [handleMouseMove, mouseX, gradientSize, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [handleMouseMove, mouseX, gradientSize, mouseY]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const baseClasses = cn(
    'group relative rounded-xl border',
    glassEffect && 'backdrop-blur-xl shadow-xl shadow-black/30',
    cardVariants[variant],
    className,
  );

  return (
    <div ref={cardRef} className={baseClasses} {...props}>
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom}, 
            ${gradientTo}, 
            transparent 100%
            )
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
