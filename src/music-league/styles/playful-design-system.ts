/**
 * @file playful-design-system.ts
 * @description Playful & Fun Design System for Music League
 */

export const colors = {
  coral: '#FF6B6B',
  skyBlue: '#4ECDC4',
  sunshine: '#FFE66D',
  mint: '#95E1D3',
  bubblegum: '#FF6B9D',
  darkBg: '#1a1a1a',
  darkCard: '#2a2a2a',
  darkBorder: '#3a3a3a',
  lightText: '#f0f0f0',
  mutedLight: '#b0b0b0',
  cream: '#FFF8F0',
  sand: '#F5E6D3',
  charcoal: '#2D3142',
  slate: '#4F5D75',
  fog: '#BFC0C0',
  gradients: {
    coral: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    ocean: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    sunset: 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)',
    candy: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',
    rainbow:
      'linear-gradient(90deg, #FF6B6B 0%, #FFE66D 25%, #95E1D3 50%, #4ECDC4 75%, #FF6B9D 100%)',
  },
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  base: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const radius = {
  card: '20px',
  button: '12px',
  badge: '20px',
  input: '16px',
  full: '9999px',
} as const;

export const emojis = {
  participants: '👥',
  rounds: '🎵',
  playlists: '🎧',
  winner: '🏆',
  featured: '🎉',
  search: '🔍',
  quickAction: '⚡',
  music: '🎶',
  guitar: '🎸',
  microphone: '🎤',
} as const;

export const emojiLegend = [
  { emoji: emojis.participants, label: 'Players' },
  { emoji: emojis.rounds, label: 'Rounds' },
  { emoji: emojis.playlists, label: 'Playlists' },
] as const;

export const cardStyles = {
  base: `
    bg-[#2a2a2a]
    rounded-[20px]
    border-3
    border-[#FF6B6B]
    shadow-lg
    shadow-[#FF6B6B]/20
    hover:shadow-xl
    hover:shadow-[#FF6B6B]/30
    hover:-translate-y-1
    transition-all
    duration-300
    ease-out
  `,
  coral: `
    bg-[#2a2a2a]
    rounded-[20px]
    border-3
    border-[#FF6B6B]
    shadow-lg
    shadow-[#FF6B6B]/20
    hover:shadow-xl
    hover:shadow-[#FF6B6B]/30
    hover:-translate-y-1
    active:translate-y-0
    active:scale-[0.98]
    transition-all
    duration-300
  `,
  skyBlue: `
    bg-[#2a2a2a]
    rounded-[20px]
    border-3
    border-[#4ECDC4]
    shadow-lg
    shadow-[#4ECDC4]/20
    hover:shadow-xl
    hover:shadow-[#4ECDC4]/30
    hover:-translate-y-1
    transition-all
    duration-300
  `,
  glass: `
    bg-[#2a2a2a]/80
    backdrop-blur-sm
    rounded-xl
    border
    border-[#3a3a3a]
  `,
  rainbow: `
    bg-[#2a2a2a]
    rounded-[20px]
    border-3
    border-transparent
    bg-gradient-to-r
    from-[#FF6B6B]
    via-[#FFE66D]
    to-[#4ECDC4]
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
  `,
} as const;

export const buttonStyles = {
  primary: `
    bg-gradient-to-r
    from-[#FF6B6B]
    to-[#FF8E53]
    text-white
    px-6
    py-3
    rounded-xl
    font-semibold
    shadow-md
    shadow-[#FF6B6B]/30
    hover:shadow-lg
    hover:shadow-[#FF6B6B]/40
    hover:-translate-y-0.5
    active:translate-y-0
    transition-all
    duration-200
    border-none
    min-h-[44px]
    touch-manipulation
    text-base
  `,
  secondary: `
    bg-white
    text-[#FF6B6B]
    border-2
    border-[#FF6B6B]
    px-6
    py-3
    rounded-xl
    font-semibold
    hover:bg-[#FFF8F0]
    transition-all
    duration-200
    min-h-[44px]
    touch-manipulation
    text-base
  `,
  icon: `
    min-w-[44px]
    min-h-[44px]
    rounded-full
    bg-[#95E1D3]
    text-white
    flex
    items-center
    justify-center
    shadow-md
    shadow-[#95E1D3]/30
    hover:scale-110
    hover:rotate-6
    active:scale-95
    transition-all
    duration-200
    touch-manipulation
  `,
  spotify: `
    min-w-[44px]
    min-h-[44px]
    rounded-full
    bg-[#1DB954]
    text-white
    flex
    items-center
    justify-center
    shadow-md
    hover:scale-110
    hover:rotate-6
    active:scale-95
    transition-all
    duration-200
    touch-manipulation
  `,
} as const;

export const badgeStyles = {
  participants: `
    inline-flex
    items-center
    gap-1
    bg-[#FF6B6B]
    text-white
    px-4
    py-2
    rounded-full
    text-base
    font-semibold
    min-h-[44px]
    touch-manipulation
  `,
  rounds: `
    inline-flex
    items-center
    gap-1
    bg-[#4ECDC4]
    text-white
    px-4
    py-2
    rounded-full
    text-base
    font-semibold
    min-h-[44px]
    touch-manipulation
  `,
  playlists: `
    inline-flex
    items-center
    gap-1
    bg-[#95E1D3]
    text-white
    px-4
    py-2
    rounded-full
    text-base
    font-semibold
    min-h-[44px]
    touch-manipulation
  `,
  featured: `
    inline-flex
    items-center
    gap-1
    bg-[#FFE66D]
    text-[#2D3142]
    px-4
    py-2
    rounded-full
    text-base
    font-bold
    min-h-[44px]
    touch-manipulation
  `,
} as const;

export const tabStyles = {
  desktopContainer: `
    hidden
    md:flex
    gap-4
    border-b-3
    border-[#BFC0C0]
    px-6
  `,
  desktopTab: `
    px-6
    py-4
    font-semibold
    text-[#4F5D75]
    border-b-3
    border-transparent
    -mb-[3px]
    transition-all
    duration-200
    hover:text-[#2D3142]
    hover:border-[#BFC0C0]
    min-h-[44px]
    touch-manipulation
    text-base
  `,
  desktopTabActive: `
    px-6
    py-4
    font-semibold
    text-[#FF6B6B]
    border-b-3
    border-[#FF6B6B]
    -mb-[3px]
    min-h-[44px]
    text-base
  `,
  mobileContainer: `
    md:hidden
    fixed
    bottom-0
    left-0
    right-0
    bg-white
    border-t-3
    border-[#BFC0C0]
    flex
    justify-around
    p-2
    shadow-lg
    z-50
  `,
  mobileTab: `
    flex
    flex-col
    items-center
    gap-1
    px-4
    py-3
    rounded-xl
    min-w-[80px]
    min-h-[48px]
    transition-all
    duration-200
    touch-manipulation
  `,
  mobileTabActive: `
    flex
    flex-col
    items-center
    gap-1
    px-4
    py-3
    rounded-xl
    min-w-[80px]
    min-h-[48px]
    bg-[#FFF8F0]
    text-[#FF6B6B]
    touch-manipulation
  `,
} as const;

export const searchStyles = {
  container: `
    w-full
    relative
  `,
  input: `
    w-full
    px-6
    py-4
    border-3
    border-[#BFC0C0]
    rounded-2xl
    text-base
    transition-all
    duration-200
    bg-white
    placeholder:text-[#BFC0C0]
    focus:outline-none
    focus:border-[#FF6B6B]
    focus:ring-4
    focus:ring-[#FF6B6B]/10
    min-h-[44px]
    touch-manipulation
  `,
  icon: `
    absolute
    right-6
    top-1/2
    -translate-y-1/2
    text-[#BFC0C0]
    pointer-events-none
  `,
} as const;

export const accordionStyles = {
  trigger: `
    w-full
    flex
    items-center
    justify-between
    p-6
    cursor-pointer
    bg-transparent
    border-none
    text-left
    hover:bg-[#FFF8F0]/50
    transition-all
    duration-200
    rounded-t-[20px]
    min-h-[44px]
    touch-manipulation
  `,
  content: `
    px-6
    pb-6
    animate-in
    slide-in-from-top-2
    duration-300
  `,
  chevron: `
    transition-transform
    duration-300
    text-[#FF6B6B]
    min-w-[44px]
    min-h-[44px]
    flex
    items-center
    justify-center
  `,
  chevronOpen: `
    rotate-180
  `,
} as const;

export const gridStyles = {
  base: `
    grid
    grid-cols-1
    gap-4
    md:grid-cols-2
    md:gap-6
    lg:grid-cols-3
    lg:gap-8
  `,
  twoColumn: `
    grid
    grid-cols-1
    gap-4
    md:grid-cols-2
    md:gap-6
  `,
} as const;

export const containerStyles = {
  page: `
    min-h-screen
    bg-[#1a1a1a]
    pb-24
    md:pb-8
  `,
  hero: `
    text-center
    py-12
    px-4
  `,
  content: `
    max-w-7xl
    mx-auto
    px-4
    py-8
  `,
} as const;

export const textStyles = {
  hero: `
    text-4xl
    md:text-5xl
    font-black
    bg-gradient-to-r
    from-[#FF6B6B]
    via-[#FFE66D]
    to-[#4ECDC4]
    bg-clip-text
    text-transparent
    mb-4
  `,
  heading: `
    text-2xl
    md:text-3xl
    font-bold
    text-[#f0f0f0]
    mb-2
  `,
  subheading: `
    text-lg
    md:text-xl
    font-semibold
    text-[#e0e0e0]
    mb-4
  `,
  body: `
    text-base
    text-[#d0d0d0]
    leading-relaxed
  `,
  label: `
    text-base
    font-medium
    text-[#e0e0e0]
  `,
  caption: `
    text-sm
    text-[#b0b0b0]
  `,
  muted: `
    text-base
    text-[#b0b0b0]
  `,
} as const;

export const animations = {
  bounceIn: `
    animate-in
    fade-in
    zoom-in-95
    duration-300
  `,
  slideUp: `
    animate-in
    slide-in-from-bottom-4
    duration-300
  `,
  pulse: `
    animate-pulse
  `,
} as const;

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const backgroundEmojis = [
  {
    emoji: '🎵',
    size: 'text-9xl',
    position: 'top-1/4 left-10',
    opacity: 'opacity-10',
  },
  {
    emoji: '🎶',
    size: 'text-9xl',
    position: 'bottom-1/4 right-10',
    opacity: 'opacity-10',
  },
  {
    emoji: '🎸',
    size: 'text-8xl',
    position: 'top-1/2 right-20',
    opacity: 'opacity-5',
  },
  {
    emoji: '🎤',
    size: 'text-8xl',
    position: 'bottom-1/3 left-20',
    opacity: 'opacity-5',
  },
] as const;
