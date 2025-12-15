/**
 * React Native Splash - Public API
 *
 * Generic splash screen for React Native apps with animations, gradients,
 * and customizable branding. Follows SOLID, DRY, KISS principles.
 *
 * Usage:
 *   import { SplashScreen } from '@umituz/react-native-splash';
 *
 *   <SplashScreen
 *     appName="My App"
 *     tagline="Your tagline here"
 *     logo="Sparkles"
 *     onReady={() => console.log('Ready')}
 *   />
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { SplashOptions } from "./domain/entities/SplashOptions";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { SplashScreen, type SplashScreenProps } from "./presentation/components/SplashScreen";
export { useSplash } from "./presentation/hooks/useSplash";

