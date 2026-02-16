/**
 * @file colors.ts
 * @description Color constants and theme values used throughout the application
 */

/**
 * Color palette configuration object containing primary, secondary, glass-morphism, and border colors
 * @constant
 */
export const colors = {
  primary: '#9b59b6',
  secondary: '#1abc9c',

  // Glass-morphism backgrounds
  glassLight: 'rgba(255, 255, 255, 0.1)',
  glassDark: 'rgba(0, 0, 0, 0.2)',
  glassBlur: 'rgba(26, 26, 26, 0.9)',

  // Border colors
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderDark: 'rgba(0, 0, 0, 0.3)',
} as const;

/**
 * Gradient configurations for backgrounds and overlays
 * @constant
 */
export const gradients = {
  primary: 'linear-gradient(90deg, #9b59b6, #1abc9c)',
  glass:
    'linear-gradient(135deg, rgba(26,26,26,0.9) 0%, rgba(51,51,51,0.9) 100%)',
  overlay:
    'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',

  // Consolidated Music League gradients
  musicLeague: {
    primary:
      'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119), rgb(239, 68, 68))', // from-purple-500 via-pink-500 to-red-500
    secondary:
      'linear-gradient(to right, rgb(59, 130, 246), rgb(20, 184, 166), rgb(34, 197, 94))', // from-blue-500 via-teal-500 to-green-500
    accent:
      'linear-gradient(to right, rgb(249, 115, 22), rgb(234, 179, 8), rgb(219, 39, 119))', // from-orange-500 via-yellow-500 to-pink-500
    dark: 'linear-gradient(to right, rgb(17, 24, 39), rgb(15, 23, 42), rgb(0, 0, 0))', // from-gray-900 via-slate-900 to-black
  },
} as const;

/**
 * Type representing available color keys
 */
export type ColorKey = keyof typeof colors;

/**
 * Type representing available gradient keys
 */
export type GradientKey = keyof typeof gradients;
