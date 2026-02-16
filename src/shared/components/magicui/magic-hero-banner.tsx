/**
 * @file MagicHeroBanner.tsx
 * @description An enhanced hero banner with MagicUI animations and effects
 */
import { cn } from '@/shared/lib/utils';
import { Music, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ElementType,
  type FC,
  type JSX,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

import { BorderBeam } from './border-beam';
import { MagicCard } from './magic-card';
import { Meteors } from './meteors';
import { NumberTicker } from './number-ticker';

// Lazy load heavy animation components
const Particles = lazy(() =>
  import('./particles').then((mod) => ({ default: mod.Particles })),
);

/**
 * @interface ActionButton
 * @description Action button configuration for hero banner
 */
export interface ActionButton {
  /** Button label text */
  label: string;
  /** Optional icon to display with button */
  icon?: ReactNode;
  /** Internal route path (react-router) */
  to?: string;
  /** External URL (opens in new tab) */
  href?: string;
  /** Custom click handler */
  onClick?: () => void;
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * @interface MagicHeroBannerProps
 * @description Props for the MagicHeroBanner component.
 */
export interface MagicHeroBannerProps {
  /** The main title displayed in the hero banner */
  title: string;
  /** An optional subtitle displayed below the title */
  subtitle?: string;
  /** URL for an optional background video */
  video?: string;
  /** URL for an optional background photo */
  photo?: string;
  /** Optional icon displayed next to the title */
  titleIcon?: ReactNode;
  /** Optional icon displayed next to the subtitle */
  subtitleIcon?: ReactNode;
  /** The semantic HTML tag to use for the title */
  titleComponent?: ElementType;
  /** Enable particle background animation */
  enableParticles?: boolean;
  /** Enable meteor shower animation */
  enableMeteors?: boolean;
  /** Enable border beam animation */
  enableBorderBeam?: boolean;
  /** Optional stats to display with NumberTicker */
  stats?: Array<{ label: string; value: number }>;
  /** Optional action buttons/links */
  actions?: ActionButton[];
  /**
   * Optional custom content to render below action buttons.
   * Typically wrapped in HeroBottomContent for consistent layout patterns.
   * @example
   * ```tsx
   * <HeroBottomContent variant="widget">
   *   <TodaysAlbum album={album} loading={loading} />
   * </HeroBottomContent>
   * ```
   */
  bottomContent?: ReactNode;
  /**
   * Animation delay for bottomContent in seconds.
   * Defaults to auto-calculated value based on stats presence.
   * @default stats.length > 0 ? 1.0 : 0.6
   */
  bottomContentDelay?: number;
  /**
   * Spacing between action buttons and bottomContent.
   * @default 'normal'
   */
  bottomContentSpacing?: 'compact' | 'normal' | 'spacious';
  /** Additional CSS classes */
  className?: string;
  /** Apply Rust-themed styling */
  isRust?: boolean;
}

/**
 * MagicHeroBanner - An enhanced hero banner with MagicUI effects
 *
 * Features:
 * - Particles background animation
 * - Meteor shower effects
 * - Animated border beams
 * - Number ticker for statistics
 * - Customizable action buttons with icons
 * - Smooth motion animations
 * - Glass-morphism styling
 */
const MagicHeroBanner: FC<MagicHeroBannerProps> = ({
  title,
  subtitle,
  video,
  photo,
  titleIcon = <Music className="h-8 w-8 text-grey-400" />,
  subtitleIcon = <Trophy className="h-6 w-6 text-teal-400" />,
  titleComponent = 'h1',
  enableParticles = true,
  enableMeteors = true,
  enableBorderBeam = true,
  stats = [],
  actions = [],
  bottomContent,
  bottomContentDelay,
  bottomContentSpacing = 'normal',
  className,
  isRust = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const TitleComponent =
    titleComponent as keyof JSX.IntrinsicElements;

  // Extract grid column class logic for stats
  let statsGridClass = 'grid-cols-2 md:grid-cols-4';
  if (stats.length === 1) {
    statsGridClass = 'grid-cols-1';
  } else if (stats.length === 2) {
    statsGridClass = 'grid-cols-1 md:grid-cols-2';
  } else if (stats.length === 3) {
    statsGridClass = 'grid-cols-1 md:grid-cols-3';
  }

  // Spacing classes for bottomContent
  const spacingClasses = {
    compact: 'mt-4',
    normal: 'mt-8',
    spacious: 'mt-12',
  };

  // Calculate animation delay for bottomContent
  const calculateBottomContentDelay = () => {
    if (bottomContentDelay !== undefined) {
      return bottomContentDelay;
    }
    // Auto-calculate based on stats and actions presence
    return stats.length > 0 ? 1.0 : 0.6;
  };

  return (
    <div
      className={cn(
        'relative min-h-[40vh] overflow-hidden',
        video || photo
          ? ''
          : 'bg-gradient-to-br from-gray-900 via-black to-gray-900',
        className,
      )}
    >
      {/* Background Media */}
      {video ? (
        <video
          data-testid="hero-video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover -z-10"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        photo && (
          <img
            data-testid="hero-image"
            src={photo}
            alt="Hero background"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover -z-10"
          />
        )
      )}

      {/* Dark overlay for better text readability */}
      {(video || photo) && (
        <div className="absolute inset-0 bg-black/40 -z-5" />
      )}

      {/* Particle Background */}
      {enableParticles && !video && !photo && (
        <Suspense fallback={<div className="absolute inset-0 z-0" />}>
          <Particles
            className="absolute inset-0 z-0"
            quantity={60}
            ease={80}
            color={isRust ? '#b6a559' : '#9b59b6'}
            size={0.6}
          />
        </Suspense>
      )}

      {/* Meteor Effects */}
      {enableMeteors && !video && !photo && (
        <div className="absolute inset-0 z-0">
          <Meteors number={15} />
        </div>
      )}

      {/* Main Content Card */}
      <MagicCard
        className={cn(
          'relative z-10 flex min-h-[40vh] items-center justify-center',
          'mx-auto my-8 max-w-6xl',
          'backdrop-blur-xl border-white/10',
          // Override MagicCard's default black gradient when video/photo is present
          video || photo ? '!bg-none !bg-transparent' : '',
        )}
        isRust={isRust}
      >
        <div className="relative z-10 px-8 py-12 text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <TitleComponent
              className={cn(
                'flex items-center justify-center gap-4',
                'text-4xl md:text-6xl lg:text-7xl font-bold',
                isRust
                  ? 'bg-gradient-to-r from-rust-400 to-amber-400'
                  : 'bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400',
                'bg-clip-text text-transparent',
                'mb-2',
                isMobile ? 'flex-col gap-2' : 'flex-row gap-4',
              )}
            >
              {titleIcon}
              <span>{title}</span>
            </TitleComponent>
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
              className={cn(
                'flex items-center justify-center gap-3',
                'text-lg md:text-xl lg:text-2xl',
                'text-white/80 font-medium mb-8',
                isMobile ? 'flex-col gap-2' : 'flex-row gap-3',
              )}
            >
              {subtitleIcon}
              <span>{subtitle}</span>
            </motion.p>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="mt-8"
            >
              <div className={cn('grid gap-6', statsGridClass)}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.1,
                      ease: 'easeOut',
                    }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <NumberTicker
                        value={stat.value}
                        className={
                          isRust
                            ? 'bg-gradient-to-r from-rust-400 to-amber-400 bg-clip-text text-transparent'
                            : 'bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent'
                        }
                      />
                    </div>
                    <div className="text-sm md:text-base text-white/60 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          {actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: stats.length > 0 ? 0.8 : 0.4,
                ease: 'easeOut',
              }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {actions.map((action, index) => {
                // Determine button variant styles
                const variantStyles = {
                  primary: cn(
                    isRust
                      ? 'bg-gradient-to-r from-rust-500 to-amber-500'
                      : 'bg-gradient-to-r from-purple-500 to-teal-500',
                    'text-white font-semibold',
                    isRust
                      ? 'hover:from-rust-600 hover:to-amber-600'
                      : 'hover:from-purple-600 hover:to-teal-600',
                    isRust
                      ? 'shadow-lg shadow-rust-500/50'
                      : 'shadow-lg shadow-purple-500/50',
                  ),
                  secondary: cn(
                    'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
                    'backdrop-blur-md border border-white/10',
                    'text-white font-medium',
                    'hover:bg-gradient-to-br hover:from-gray-700/90 hover:to-gray-800/90',
                    'shadow-lg shadow-black/30',
                  ),
                  ghost: cn(
                    'bg-transparent border-2 border-white/20',
                    'text-white font-medium',
                    'hover:bg-white/10 hover:border-white/30',
                  ),
                };

                const ButtonContent = (
                  <>
                    {action.icon && (
                      <span className="flex-shrink-0">
                        {action.icon}
                      </span>
                    )}
                    <span>{action.label}</span>
                  </>
                );

                const buttonClasses = cn(
                  'inline-flex items-center justify-center gap-2',
                  'px-6 py-3 rounded-lg',
                  'min-h-[48px] touch-manipulation',
                  'transition-all duration-300',
                  'transform hover:scale-105',
                  variantStyles[action.variant || 'primary'],
                );

                // Handle different navigation types
                if (action.to) {
                  return (
                    <motion.div
                      key={`${action.label}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay:
                          (stats.length > 0 ? 0.9 : 0.5) +
                          index * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      <Link to={action.to} className={buttonClasses}>
                        {ButtonContent}
                      </Link>
                    </motion.div>
                  );
                }

                if (action.href) {
                  return (
                    <motion.div
                      key={`${action.label}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay:
                          (stats.length > 0 ? 0.9 : 0.5) +
                          index * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      <a
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClasses}
                      >
                        {ButtonContent}
                      </a>
                    </motion.div>
                  );
                }

                return (
                  <motion.button
                    key={`${action.label}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay:
                        (stats.length > 0 ? 0.9 : 0.5) + index * 0.1,
                      ease: 'easeOut',
                    }}
                    onClick={action.onClick}
                    className={buttonClasses}
                  >
                    {ButtonContent}
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {/* Bottom Content Slot */}
          {bottomContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: calculateBottomContentDelay(),
                ease: 'easeOut',
              }}
              className={cn(
                'w-full',
                spacingClasses[bottomContentSpacing],
              )}
            >
              {bottomContent}
            </motion.div>
          )}

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className={cn(
                'absolute top-1/4 left-1/4 w-2 h-2 rounded-full opacity-60',
                isRust ? 'bg-rust-400' : 'bg-purple-400',
              )}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-3 h-3 bg-teal-400 rounded-full opacity-40"
              animate={{
                y: [10, -10, 10],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>
        </div>

        {/* Border Beam */}
        {enableBorderBeam && (
          <BorderBeam
            size={120}
            duration={12}
            colorFrom={isRust ? '#cec651' : '#8b5cf6'}
            colorTo={isRust ? '#f59e0b' : '#1abc9c'}
          />
        )}
      </MagicCard>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-5" />
    </div>
  );
};

export default MagicHeroBanner;
