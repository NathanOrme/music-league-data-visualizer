/**
 * @file ActionCard.tsx
 * @description Reusable action card component for Music League dashboard
 */

import { MagicCard } from '@/shared/components/magicui';
import { CardContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { FC } from 'react';

export interface ActionCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Icon component */
  icon: LucideIcon;
  /** Icon color class */
  iconColor: string;
  /** Border gradient colors */
  gradientColors: string;
  /** Background gradient colors */
  bgGradient: string;
  /** Whether the card is selected */
  isSelected: boolean;
  /** Click handler */
  onClick: () => void;
  /** Preview count (e.g., number of standings, rounds, playlists) */
  count?: number;
}

/**
 * Action card component for triggering view changes in Music League dashboard
 */
export const ActionCard: FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor,
  gradientColors,
  bgGradient,
  isSelected,
  onClick,
  count,
}) => {
  return (
    <MagicCard
      className={cn(
        'cursor-pointer transition-all duration-300 hover:scale-105',
        'border backdrop-blur-sm',
        isSelected
          ? `border-2 ${gradientColors} bg-gradient-to-br ${bgGradient} shadow-lg`
          : 'border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-white/30',
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="p-6 text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={cn(
              'p-4 rounded-full',
              isSelected ? 'bg-white/20' : 'bg-white/10',
            )}
          >
            <Icon className={cn('w-8 h-8', iconColor)} />
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            'text-xl font-bold transition-colors',
            isSelected ? 'text-white' : 'text-gray-300',
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400">{description}</p>

        {/* Count Badge */}
        {count !== undefined && (
          <div
            className={cn(
              'inline-block px-3 py-1 rounded-full text-sm font-semibold',
              isSelected
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-gray-300',
            )}
          >
            {count} {count === 1 ? 'item' : 'items'}
          </div>
        )}
      </CardContent>
    </MagicCard>
  );
};

export default ActionCard;
