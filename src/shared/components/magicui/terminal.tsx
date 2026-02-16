'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';
import React, { type ReactElement, useEffect, useState } from 'react';

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  prompt?: string;
  header?: boolean;
  onStart?: boolean;
}

export interface TypingAnimationProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export interface AnimatedSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Terminal({
  children,
  className,
  prompt = '$',
  header = true,
  onStart = true,
  ...props
}: TerminalProps) {
  const [started, setStarted] = useState(onStart);

  useEffect(() => {
    if (!onStart) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      const element = document.getElementById('terminal-container');
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [onStart]);

  const childrenArray = React.Children.toArray(children);
  let sequenceIndex = 0;

  const processedChildren = childrenArray.map((child, index) => {
    if (React.isValidElement(child)) {
      const currentSequence = sequenceIndex;
      sequenceIndex++;

      return React.cloneElement(child as ReactElement, {
        key: index,
        sequenceIndex: currentSequence,
        started: started,
      });
    }
    return child;
  });

  return (
    <div
      id="terminal-container"
      className={cn(
        'relative w-full max-w-2xl bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden font-mono text-sm',
        className,
      )}
      {...props}
    >
      {header && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-gray-400 text-xs ml-2">Terminal</div>
        </div>
      )}
      <div className="p-4 space-y-2">{processedChildren}</div>
    </div>
  );
}

export function TypingAnimation({
  children,
  className,
  duration = 2000,
  delay = 0,
  sequenceIndex = 0,
  started = true,
  ...props
}: TypingAnimationProps & {
  sequenceIndex?: number;
  started?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    const startDelay = delay + sequenceIndex * 1000;
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(
        () => {
          if (currentIndex <= (children?.length || 0)) {
            setDisplayedText(children?.slice(0, currentIndex) || '');
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
          }
        },
        duration / (children?.length || 1),
      );

      return () => clearInterval(typingInterval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [children, duration, delay, sequenceIndex, started]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-green-400">$</span>
      <span className={cn('text-white', className)} {...props}>
        {displayedText}
        {isTyping && (
          <motion.span
            className="inline-block w-2 h-4 bg-white ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </span>
    </div>
  );
}

export function AnimatedSpan({
  children,
  className,
  delay = 0,
  sequenceIndex = 0,
  started = true,
  ...props
}: AnimatedSpanProps & {
  sequenceIndex?: number;
  started?: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    const showDelay = delay + (sequenceIndex + 1) * 1000;
    const timeout = setTimeout(() => {
      setShow(true);
    }, showDelay);

    return () => clearTimeout(timeout);
  }, [delay, sequenceIndex, started]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={cn('text-gray-300', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
