/**
 * @file music-league-theme.ts
 * @description Professional dark theme for Music League, inspired by Spotify/Tidal.
 *
 * Design philosophy:
 * - Deep dark backgrounds (#0F0F0F, #161616, #1E1E1E)
 * - Clean typography with good hierarchy
 * - Accent colors per category/league for visual identity
 * - Subtle glassmorphism for cards
 * - Smooth, professional animations (no bouncy/playful)
 * - Proper icons, zero emojis
 * - Mobile-first responsive design
 */

/**
 * Core color palette
 */
export const mlColors = {
  // Backgrounds (darkest to lightest)
  bg: {
    primary: '#0F0F0F',
    secondary: '#161616',
    card: '#1E1E1E',
    cardHover: '#252525',
    elevated: '#2A2A2A',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    muted: '#71717A',
    inverse: '#0F0F0F',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  },

  // Status
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',

  // Spotify brand (for playlist links)
  spotify: '#1DB954',
} as const;

/**
 * Tailwind class strings for common patterns
 */
export const mlLayout = {
  /** Full-page wrapper */
  page: 'min-h-screen bg-[#0F0F0F] text-white',

  /** Max-width content container */
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

  /** Section padding */
  section: 'py-8 sm:py-12',

  /** Card grid layouts */
  grid: {
    two: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
    three:
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    four: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  },
} as const;

/**
 * Typography class strings
 */
export const mlText = {
  /** Page title / hero (e.g., "Music League") */
  hero: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight',

  /** Section heading (e.g., "1001 Leagues") */
  h1: 'text-3xl sm:text-4xl font-bold tracking-tight',

  /** Sub-section heading */
  h2: 'text-2xl sm:text-3xl font-semibold',

  /** Card title */
  h3: 'text-xl font-semibold',

  /** Small heading */
  h4: 'text-lg font-medium',

  /** Body text */
  body: 'text-base text-zinc-400 leading-relaxed',

  /** Small / caption text */
  caption: 'text-sm text-zinc-500',

  /** Label text */
  label: 'text-sm font-medium text-zinc-300',

  /** Stat number */
  stat: 'text-3xl sm:text-4xl font-bold tabular-nums',

  /** Stat label */
  statLabel:
    'text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-wide',
} as const;

/**
 * Card styles
 */
export const mlCard = {
  /** Default card */
  base: [
    'rounded-xl',
    'bg-[#1E1E1E]',
    'border border-white/[0.06]',
    'transition-all duration-200',
  ].join(' '),

  /** Hoverable card (for clickable items) */
  interactive: [
    'rounded-xl',
    'bg-[#1E1E1E]',
    'border border-white/[0.06]',
    'transition-all duration-200',
    'hover:bg-[#252525]',
    'hover:border-white/[0.1]',
    'cursor-pointer',
  ].join(' '),

  /** Glass card with blur */
  glass: [
    'rounded-xl',
    'bg-white/[0.03]',
    'backdrop-blur-xl',
    'border border-white/[0.08]',
  ].join(' '),

  /** Elevated card (modals, featured) */
  elevated: [
    'rounded-2xl',
    'bg-[#1E1E1E]',
    'border border-white/[0.08]',
    'shadow-2xl shadow-black/40',
  ].join(' '),
} as const;

/**
 * Button styles
 */
export const mlButton = {
  /** Primary action button */
  primary: [
    'inline-flex items-center justify-center gap-2',
    'px-5 py-2.5',
    'rounded-lg',
    'text-sm font-medium',
    'bg-white text-black',
    'hover:bg-zinc-200',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
  ].join(' '),

  /** Secondary / outline button */
  secondary: [
    'inline-flex items-center justify-center gap-2',
    'px-5 py-2.5',
    'rounded-lg',
    'text-sm font-medium',
    'bg-transparent text-white',
    'border border-white/20',
    'hover:bg-white/[0.06]',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
  ].join(' '),

  /** Ghost button */
  ghost: [
    'inline-flex items-center justify-center gap-2',
    'px-4 py-2',
    'rounded-lg',
    'text-sm font-medium text-zinc-400',
    'hover:text-white hover:bg-white/[0.06]',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
  ].join(' '),

  /** Spotify green button */
  spotify: [
    'inline-flex items-center justify-center gap-2',
    'px-5 py-2.5',
    'rounded-full',
    'text-sm font-medium',
    'bg-[#1DB954] text-white',
    'hover:bg-[#1ED760]',
    'transition-colors duration-150',
  ].join(' '),
} as const;

/**
 * Badge / pill styles
 */
export const mlBadge = {
  /** Default subtle badge */
  default: [
    'inline-flex items-center gap-1.5',
    'px-3 py-1',
    'rounded-full',
    'text-xs font-medium',
    'bg-white/[0.06] text-zinc-300',
  ].join(' '),

  /** Accent-colored badge (use with inline style for color) */
  accent: [
    'inline-flex items-center gap-1.5',
    'px-3 py-1',
    'rounded-full',
    'text-xs font-semibold',
  ].join(' '),
} as const;

/**
 * Navigation styles for the music league sub-nav
 */
export const mlNav = {
  /** Desktop horizontal nav container */
  container: [
    'flex items-center gap-1',
    'border-b border-white/[0.06]',
    'px-4 sm:px-6',
    'overflow-x-auto scrollbar-hide',
  ].join(' '),

  /** Nav link (inactive) */
  link: [
    'px-4 py-3',
    'text-sm font-medium text-zinc-500',
    'border-b-2 border-transparent',
    'hover:text-zinc-300',
    'transition-colors duration-150',
    'whitespace-nowrap',
  ].join(' '),

  /** Nav link (active) */
  linkActive: [
    'px-4 py-3',
    'text-sm font-medium text-white',
    'border-b-2',
    'whitespace-nowrap',
  ].join(' '),
} as const;

/**
 * Stat card for hero sections
 */
export const mlStat = {
  container: [
    'flex flex-col items-center',
    'px-6 py-4',
    'rounded-xl',
    'bg-white/[0.03]',
    'border border-white/[0.06]',
  ].join(' '),
} as const;

/**
 * Table styles for standings/leaderboards
 */
export const mlTable = {
  row: [
    'flex items-center gap-4',
    'px-4 py-3',
    'rounded-lg',
    'transition-colors duration-150',
    'hover:bg-white/[0.03]',
  ].join(' '),

  rowHighlight: [
    'flex items-center gap-4',
    'px-4 py-3',
    'rounded-lg',
  ].join(' '),
} as const;

/**
 * Tab styles for league detail page
 */
export const mlTabs = {
  container: [
    'flex items-center gap-1',
    'border-b border-white/[0.06]',
    'mb-6',
  ].join(' '),

  tab: [
    'px-4 py-2.5',
    'text-sm font-medium text-zinc-500',
    'border-b-2 border-transparent',
    'hover:text-zinc-300',
    'transition-colors duration-150',
  ].join(' '),

  tabActive: [
    'px-4 py-2.5',
    'text-sm font-medium text-white',
    'border-b-2 border-white',
  ].join(' '),
} as const;

/**
 * Helper to generate an accent-colored gradient background
 * as an inline CSS style object
 */
export const accentGradientStyle = (
  gradient: [string, string],
  opacity = 0.15,
): React.CSSProperties => ({
  background: `linear-gradient(135deg, ${gradient[0]}${Math.round(
    opacity * 255,
  )
    .toString(16)
    .padStart(2, '0')}, ${gradient[1]}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')})`,
});

/**
 * Helper to generate an accent border style
 */
export const accentBorderStyle = (
  color: string,
  opacity = 0.3,
): React.CSSProperties => ({
  borderColor: `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`,
});
