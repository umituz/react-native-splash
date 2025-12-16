/**
 * Splash Options - Ultra Minimal Configuration
 */

import type { ImageSourcePropType } from "react-native";

export interface SplashOptions {
  /** App icon/logo image source */
  icon?: ImageSourcePropType;

  /** App name to display */
  appName?: string;

  /** Tagline or subtitle */
  tagline?: string;

  /** Background color (default: #6366F1) */
  backgroundColor?: string;

  /** Gradient colors - if provided, overrides backgroundColor */
  gradientColors?: readonly [string, string, ...string[]];

  /** Text color (default: #FFFFFF) */
  textColor?: string;

  /** Show loading indicator (default: true) */
  showLoading?: boolean;
}
