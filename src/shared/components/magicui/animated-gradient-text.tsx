'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  showIcon?: boolean;
}

export function AnimatedGradientText({
  children,
  className,
  animationSpeed = 'normal',
  showIcon = false,
}: Readonly<AnimatedGradientTextProps>) {
  const speeds = {
    slow: '8s',
    normal: '6s',
    fast: '4s',
  };

  return (
    <div
      className={cn(
        'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40',
        className,
      )}
    >
      <div
        className={
          'absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]'
        }
        style={{
          animationDuration: speeds[animationSpeed],
        }}
      />

      {showIcon && (
        <div className="mr-2 inline">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M7.5 2L6.5 3H4.5C4.22386 3 4 3.22386 4 3.5C4 3.77614 4.22386 4 4.5 4H6.5L7.5 5L8.5 4H10.5C10.7761 4 11 3.77614 11 3.5C11 3.22386 10.7761 3 10.5 3H8.5L7.5 2Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <span
        className={cn(
          'inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent',
        )}
        style={{
          animationDuration: speeds[animationSpeed],
        }}
      >
        {children}
      </span>
    </div>
  );
}
