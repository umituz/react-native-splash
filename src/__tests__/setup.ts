/**
 * Simple Test Setup
 */

// Mock React Native before anything else
jest.mock('react-native', () => {
  const React = require('react');
  return {
    View: ({ children, testID, style }) => React.createElement('View', { testID, style }, children),
    Text: ({ children, testID, style }) => React.createElement('Text', { testID, style }, children),
    StyleSheet: { 
      create: jest.fn((styles) => styles),
      flatten: jest.fn((style) => style)
    },
    Dimensions: { get: jest.fn(() => ({ width: 375, height: 667 })) },
    LinearGradient: ({ children, testID, style }) => React.createElement('LinearGradient', { testID, style }, children),
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  return {
    LinearGradient: ({ children, testID, style }) => React.createElement('LinearGradient', { testID, style }, children),
  };
});

// Mock design system atoms
jest.mock('@umituz/react-native-design-system-atoms', () => {
  const React = require('react');
  return {
    AtomicIcon: ({ name, testID }) => React.createElement('AtomicIcon', { testID: testID || `icon-${name}`, name }),
  };
});

// Mock design system theme
jest.mock('@umituz/react-native-design-system-theme', () => ({
  useAppDesignTokens: () => ({
    colors: { primary: '#007AFF' },
    spacing: { xl: 24, md: 16, xxxl: 48 },
  }),
}));

// Mock localization
jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: () => ({
    t: (key: string, fallback: string) => fallback || key,
  }),
}));

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

// Global test utilities
global.__DEV__ = true;