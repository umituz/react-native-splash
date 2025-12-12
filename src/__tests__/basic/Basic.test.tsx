/**
 * Basic Component Tests
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { SplashScreen } from '../../presentation/components/SplashScreen';

// Mock React Native components
jest.mock('react-native', () => ({
  View: ({ children, testID }) => ({ type: 'View', props: { testID }, children }),
  Text: ({ children, testID }) => ({ type: 'Text', props: { testID }, children }),
  StyleSheet: { create: jest.fn(() => ({})) },
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children, testID }) => ({ type: 'LinearGradient', props: { testID }, children }),
}));

jest.mock('@umituz/react-native-design-system-atoms', () => ({
  AtomicIcon: ({ name, testID }) => ({ type: 'AtomicIcon', props: { testID: testID || `icon-${name}`, name } }),
}));

jest.mock('@umituz/react-native-design-system-theme', () => ({
  useAppDesignTokens: () => ({
    colors: { primary: '#007AFF' },
    spacing: { xl: 24, md: 16, xxxl: 48 },
  }),
}));

jest.mock('@umituz/react-native-localization', () => ({
  useLocalization: () => ({
    t: (key: string, fallback: string) => fallback || key,
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}));

describe('SplashScreen Basic Tests', () => {
  it('renders without crashing', () => {
    const props = {
      appName: 'Test App',
      visible: true,
    };
    
    expect(() => render(<SplashScreen {...props} />)).not.toThrow();
  });

  it('renders app name when provided', () => {
    const props = {
      appName: 'Test App',
      visible: true,
    };
    
    const { getByText } = render(<SplashScreen {...props} />);
    expect(getByText('Test App')).toBeTruthy();
  });

  it('renders tagline when provided', () => {
    const props = {
      appName: 'Test App',
      tagline: 'Test Tagline',
      visible: true,
    };
    
    const { getByText } = render(<SplashScreen {...props} />);
    expect(getByText('Test Tagline')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const props = {
      appName: 'Test App',
      visible: false,
    };
    
    const { queryByText } = render(<SplashScreen {...props} />);
    expect(queryByText('Test App')).toBeFalsy();
  });

  it('renders with default props', () => {
    const { container } = render(<SplashScreen />);
    expect(container).toBeTruthy();
  });

  it('handles empty props gracefully', () => {
    const props = {
      appName: '',
      tagline: '',
      visible: true,
    };
    
    expect(() => render(<SplashScreen {...props} />)).not.toThrow();
  });

  it('handles null props gracefully', () => {
    const props = {
      appName: null,
      tagline: null,
      visible: true,
    };
    
    expect(() => render(<SplashScreen {...props} />)).not.toThrow();
  });
});