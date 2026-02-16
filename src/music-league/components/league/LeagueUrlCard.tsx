/**
 * @file LeagueUrlCard.tsx
 * @description League URL Card Component with MagicUI
 */

import {
  MagicCard,
  ShimmerButton,
} from '@/shared/components/magicui';
import { CardContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';
import { memo } from 'react';

export interface LeagueUrlCardProps {
  title: string;
  description: string;
  emoji: string;
  url: string;
  buttonText: string;
  colorScheme: 'blue' | 'amber' | 'green' | 'purple';
}

/**
 * League URL Card Component with MagicUI
 */
export const LeagueUrlCard: FC<LeagueUrlCardProps> = memo(
  ({ title, description, emoji, url, buttonText, colorScheme }) => {
    const colorClasses = {
      blue: {
        gradient: 'from-blue-600/20 to-cyan-600/20',
        border: 'border-blue-500/30',
        shimmer:
          'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600',
      },
      amber: {
        gradient: 'from-amber-600/20 to-yellow-600/20',
        border: 'border-amber-500/30',
        shimmer:
          'bg-gradient-to-r from-amber-600/80 to-yellow-600/80 hover:from-amber-600 hover:to-yellow-600',
      },
      green: {
        gradient: 'from-green-600/20 to-emerald-600/20',
        border: 'border-green-500/30',
        shimmer:
          'bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-600 hover:to-emerald-600',
      },
      purple: {
        gradient: 'from-purple-600/20 to-violet-600/20',
        border: 'border-purple-500/30',
        shimmer:
          'bg-gradient-to-r from-purple-600/80 to-violet-600/80 hover:from-purple-600 hover:to-violet-600',
      },
    };

    const colors = colorClasses[colorScheme];

    return (
      <MagicCard
        className={cn(
          'hover:scale-[1.02] transition-all duration-300 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm group',
          colors.gradient,
        )}
      >
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                  {title}
                </h4>
                <p className="text-purple-300 text-sm font-medium">
                  Official Info
                </p>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {description}
                </p>
              </div>
              <div
                className={cn(
                  'text-2xl flex-shrink-0 p-2 rounded-lg bg-white/10 backdrop-blur-sm',
                  colors.border,
                )}
              >
                {emoji}
              </div>
            </div>
            <ShimmerButton
              onClick={() =>
                window.open(url, '_blank', 'noopener,noreferrer')
              }
              className={cn(
                'w-full text-white border-none',
                colors.shimmer,
              )}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              <span className="font-medium">{buttonText}</span>
            </ShimmerButton>
          </div>
        </CardContent>
      </MagicCard>
    );
  },
);

LeagueUrlCard.displayName = 'LeagueUrlCard';
