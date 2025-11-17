# @umituz/react-native-splash

Simple splash screen for React Native apps with logo, app name, and loading indicator. Minimal dependencies, no over-engineering.

## Features

- ✅ **Simple & Lightweight**: No animations, no gradients, just the essentials
- ✅ **Minimal Dependencies**: Only requires AtomicIcon and localization
- ✅ **Customizable**: Logo, app name, tagline, background color
- ✅ **Loading Indicator**: Built-in ActivityIndicator
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

### With Custom Background

```typescript
<SplashScreen
  appName="My App"
  tagline="Your tagline here"
  logo="Sparkles"
  backgroundColor="#3B82F6"
  loadingText="Loading..."
  showLoading={true}
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
  loadingText?: string;
  showLoading?: boolean;
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

