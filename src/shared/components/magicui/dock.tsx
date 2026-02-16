'use client';

import { cn } from '@/shared/lib/utils';
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { useRef } from 'react';

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'middle' | 'bottom';
}

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
  className?: string;
}

const Dock = ({
  children,
  className,
  magnification = 60,
  distance = 140,
  direction = 'bottom',
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  const renderDirection = () => {
    switch (direction) {
      case 'top':
        return 'items-start';
      case 'middle':
        return 'items-center';
      case 'bottom':
        return 'items-end';
      default:
        return 'items-end';
    }
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/20 bg-white/10 px-4 pb-3 backdrop-blur-md',
        renderDirection(),
        className,
      )}
    >
      {Array.from(children as React.ReactNode[]).map(
        (child, index) =>
          typeof child === 'object' &&
          child !== null &&
          'type' in child
            ? {
                ...child,
                props: {
                  ...child.props,
                  mouseX: mouseX,
                  key: index,
                  magnification: magnification,
                  distance: distance,
                },
              }
            : child,
      )}
    </motion.div>
  );
};

const DockIcon = ({
  size = 40,
  magnification = 60,
  distance = 140,
  mouseX,
  children,
  className,
  ...props
}: DockIconProps & { mouseX?: MotionValue<number> }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { Dock, DockIcon };
