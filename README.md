# @umituz/react-native-splash

Generic splash screen for React Native apps with animations, gradients, and customizable branding. Follows SOLID, DRY, KISS principles - fully reusable across hundreds of apps.

## Features

- ✅ **Generic & Reusable**: Works with any app, fully customizable via props
- ✅ **Animations**: Smooth fade, scale, and slide animations
- ✅ **Gradient Backgrounds**: Support for gradient or solid colors
- ✅ **Customizable Branding**: Logo, app name, tagline, footer
- ✅ **Loading Indicators**: Progress bar and loading text
- ✅ **SOLID Principles**: Clean architecture, easy to extend
- ✅ **DRY**: No code duplication, generic components
- ✅ **KISS**: Simple API, easy to understand and use
- ✅ **Type-Safe**: Full TypeScript support

## Installation

```bash
npm install @umituz/react-native-splash
```

## Usage

### Basic Example

```typescript
import { SplashScreen } from '@umituz/react-native-splash';

<SplashScreen
  appName="My App"
  tagline="Your tagline here"
  logo="Sparkles"
  onReady={() => {
    // Navigate to main app
  }}
/>
```

### Advanced Example

```typescript
<SplashScreen
  appName="My App"
  tagline="Your tagline here"
  logo="Sparkles"
  backgroundColor="#3B82F6"
  gradientColors={['#3B82F6', '#8B5CF6']}
  loadingText="Loading..."
  showLoading={true}
  showProgressBar={true}
  footerText="Powered by"
  versionText="v1.0.0"
  animationDuration={2000}
  minimumDisplayTime={1500}
  onReady={handleReady}
/>
```

### Custom Render Functions

```typescript
<SplashScreen
  appName="My App"
  renderLogo={() => <CustomLogo />}
  renderContent={() => <CustomContent />}
  renderFooter={() => <CustomFooter />}
  onReady={handleReady}
/>
```

## API Reference

### `SplashOptions`

```typescript
interface SplashOptions {
  appName?: string;
  tagline?: string;
  logo?: ReactNode | string;
  backgroundColor?: string;
  gradientColors?: string[];
  loadingText?: string;
  showLoading?: boolean;
  showProgressBar?: boolean;
  footerText?: string;
  versionText?: string;
  animationDuration?: number;
  minimumDisplayTime?: number;
  onReady?: () => void | Promise<void>;
  renderLogo?: () => ReactNode;
  renderContent?: () => ReactNode;
  renderFooter?: () => ReactNode;
}
```

## Architecture

- **Domain Layer**: Entities and interfaces (business logic)
- **Presentation Layer**: Components (UI)

No app-specific code, fully generic and reusable.

## License

MIT

