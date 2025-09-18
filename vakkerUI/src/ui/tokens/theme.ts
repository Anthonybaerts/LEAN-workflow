/**
 * Vakker UI Library - Theme Tokens
 * Main theme export combining all design tokens
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
} as const;

export type Theme = typeof theme;

// Re-export individual token types
export type { Colors } from './colors';
export type { Spacing } from './spacing';
export type { Radius } from './radius';
export type { Typography } from './typography';

// Re-export individual tokens
export { colors, spacing, radius, typography };
