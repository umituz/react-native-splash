/**
 * Splash Options - Minimal Configuration
 */

import { ReactNode } from "react";

export interface SplashOptions {
  /** App name to display */
  appName?: string;

  /** Tagline or subtitle */
  tagline?: string;

  /** Background color */
  backgroundColor?: string;

  /** Custom gradient colors (overrides backgroundColor) */
  gradientColors?: readonly string[];

  /** Loading text */
  loadingText?: string;

  /** Show loading indicator (default: true) */
  showLoading?: boolean;

  /** Minimum display time in ms (default: 1500) */
  minimumDisplayTime?: number;

  /** Callback when splash is ready */
  onReady?: () => void | Promise<void>;

  /** Custom render functions */
  renderLogo?: () => ReactNode;
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}
