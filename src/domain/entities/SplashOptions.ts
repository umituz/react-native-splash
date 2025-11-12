/**
 * Splash Options
 *
 * Configuration options for splash screen
 */

import { ReactNode } from "react";

/**
 * Splash Options
 * Customize the splash screen experience
 */
export interface SplashOptions {
  /**
   * App name to display
   */
  appName?: string;

  /**
   * Tagline or subtitle
   */
  tagline?: string;

  /**
   * Logo/icon component or name
   */
  logo?: ReactNode | string;

  /**
   * Background color or gradient colors
   */
  backgroundColor?: string;
  gradientColors?: string[];

  /**
   * Loading text
   */
  loadingText?: string;

  /**
   * Show loading indicator (default: true)
   */
  showLoading?: boolean;

  /**
   * Show progress bar (default: true)
   */
  showProgressBar?: boolean;

  /**
   * Footer text (e.g., "Powered by...")
   */
  footerText?: string;

  /**
   * Version text
   */
  versionText?: string;

  /**
   * Animation duration in milliseconds (default: 2000)
   */
  animationDuration?: number;

  /**
   * Minimum display time in milliseconds (default: 1500)
   */
  minimumDisplayTime?: number;

  /**
   * Callback when splash is ready to hide
   */
  onReady?: () => void | Promise<void>;

  /**
   * Custom render functions
   */
  renderLogo?: () => ReactNode;
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

