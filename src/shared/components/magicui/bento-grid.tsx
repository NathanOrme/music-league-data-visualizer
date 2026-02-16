'use client';

import { cn } from '@/shared/lib/utils';
import { type ReactNode } from 'react';

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export interface BentoCardProps {
  children: ReactNode;
  className?: string;
  background?: ReactNode;
}

export function BentoGrid({
  children,
  className,
}: Readonly<BentoGridProps>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  background,
}: Readonly<BentoCardProps>) {
  return (
    <div
      className={cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
        // Glass-morphism styling matching our design system
        'bg-gradient-to-br from-black/40 via-black/60 to-black/80',
        'backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50',
        'p-6',
        'transition-all duration-300 hover:border-white/20 hover:shadow-purple-500/10',
        className,
      )}
    >
      {background && (
        <div className="absolute inset-0 z-0">{background}</div>
      )}
      <div className="relative z-10">{children}</div>

      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(155, 89, 182, 0.1) 0%, rgba(26, 188, 156, 0.1) 100%)',
          }}
        />
      </div>
    </div>
  );
}
