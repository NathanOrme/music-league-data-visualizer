/**
 * @file index.ts
 * @description Main export file for Music League styles - maintains backward compatibility
 */

// Base styles - now using consolidated theme colors and patterns
import { layout } from './base/layout';
import { text } from './base/typography';

// Component styles - now using consolidated shared styles
import { categories } from './components/categories';
import { hero } from './components/hero';
import { rounds, standings, tabs } from './components/leagues';
import { player } from './components/player';

// Utility styles
import { buttonStyles } from '@/styles/buttons.styles';
import { cardStyles } from '@/styles/cards.styles';
import { colors, gradients } from '@/styles/colors.styles';
import { layoutStyles } from '@/styles/layout.styles';
import { glassmorphism } from '@/styles/patterns.styles';
import { animations, loading } from './utilities/animations';
import { empty } from './utilities/empty';
import { icons } from './utilities/icons';
import { responsive } from './utilities/responsive';
import { spacing } from './utilities/spacing';
import { stats } from './utilities/stats';

/**
 * Consolidated Music League styles object - maintains the same structure as before
 * but now uses modular imports for better maintainability
 */
export const musicLeagueStyles = {
  // Base styles
  colors, // Using consolidated theme colors
  gradients, // Using consolidated theme gradients including musicLeague variants
  glass: glassmorphism, // Using consolidated theme glassmorphism including musicLeague variants
  layout,
  text,

  // Component styles
  hero,
  nav: layoutStyles.nav, // Navigation styles from shared layout
  navigation: layoutStyles.nav, // Alias for backward compatibility
  buttons: buttonStyles, // Using consolidated shared button styles
  cards: cardStyles, // Using consolidated shared card styles
  categories,
  player,

  // League-specific components
  standings,
  rounds,
  tabs,

  // Utility styles
  spacing,
  stats,
  icons,
  loading,
  animations,
  responsive,
  empty,
} as const;
