'use client';

import { cn } from '@/shared/lib/utils';

import { motion, type Variants } from 'motion/react';
import { type JSX } from 'react';

interface BoxRevealProps {
  children: JSX.Element;
  width?: 'fit' | 'full';
  boxColor?: string;
  duration?: number;
}

const defaultBoxRevealAnimation: Variants = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  },
  exit: {
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
  },
};

export function BoxReveal({
  children,
  width = 'fit',
  boxColor = '#5046e6',
  duration = 0.5,
}: Readonly<BoxRevealProps>) {
  return (
    <div className="relative">
      <motion.div
        variants={defaultBoxRevealAnimation}
        initial="initial"
        whileInView="animate"
        exit="exit"
        transition={{
          duration: duration,
          ease: 'easeInOut',
        }}
        className={cn(width === 'fit' ? 'w-fit' : 'w-full')}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{
          left: '0%',
        }}
        animate={{
          left: '100%',
        }}
        transition={{
          duration: duration,
          ease: 'easeInOut',
          delay: duration * 0.8,
        }}
        className="absolute inset-0 z-10"
        style={{
          background: boxColor,
        }}
      />
    </div>
  );
}
