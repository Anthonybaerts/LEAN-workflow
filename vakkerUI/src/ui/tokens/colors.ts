/**
 * Vakker UI Library - Color Tokens
 * Generated from Figma design system
 */

export const colors = {
  // Primary colors
  primary: {
    main: '#2774F1',
    light: '#4285F3',
    '40': '#4285F3CC', // 40% opacity
    '20': 'rgba(66, 133, 243, 0.2)', // 20% opacity
  },

  // Success/Green
  success: {
    main: '#4CAF50',
    '20': 'rgba(76, 175, 80, 0.2)', // 20% opacity
  },

  // Warning/Yellow
  warning: {
    main: '#FFD700',
  },

  // Grayscale
  gray: {
    '900': '#0F1C2D',
    '800': '#1F2937',
    '700': '#374151',
    '600': '#4B5563',
    '500': '#9CA3AF',
    '400': '#ADAEBC',
    '300': '#CED4DA',
    '200': '#D1D5DB',
    '100': '#E5E7EB',
  },

  // Base colors
  white: '#FFF',
  black: '#000',

  // Semantic colors (using primary blue as default)
  text: {
    primary: '#0F1C2D',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    white: '#FFF',
  },

  background: {
    primary: '#FFF',
    secondary: '#E5E7EB',
    dark: '#0F1C2D',
  },

  border: {
    primary: '#E5E7EB',
    secondary: '#D1D5DB',
    accent: '#2774F1',
  },
} as const;

export type Colors = typeof colors;
