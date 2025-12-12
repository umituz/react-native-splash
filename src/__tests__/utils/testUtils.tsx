/**
 * Test Utilities and Mocks
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { View } from 'react-native';

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock timers utilities
export const advanceTimersByTime = (ms: number) => {
  jest.advanceTimersByTime(ms);
};

export const runAllTimers = () => {
  jest.runAllTimers();
};

// Mock data generators
export const createMockSplashProps = (overrides = {}) => ({
  appName: 'Test App',
  tagline: 'Test Tagline',
  visible: true,
  showLoading: true,
  minimumDisplayTime: 1500,
  ...overrides,
});

export const createMockDesignTokens = (overrides = {}) => ({
  colors: { primary: '#007AFF' },
  spacing: { xl: 24, md: 16, xxxl: 48 },
  ...overrides,
});

// Performance testing utilities
export const measureRenderTime = async (component: React.ReactElement) => {
  const start = performance.now();
  customRender(component);
  const end = performance.now();
  return end - start;
};

// Memory leak testing utilities
export const trackMemoryUsage = () => {
  const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
  return {
    getMemoryIncrease: () => {
      const currentMemory = (performance as any).memory?.usedJSHeapSize || 0;
      return currentMemory - initialMemory;
    },
  };
};

// Accessibility testing utilities
export const checkAccessibility = (container: any) => {
  const accessibilityElements = container.findAllByProps({
    accessible: true,
  });
  
  return {
    hasAccessibleElements: accessibilityElements.length > 0,
    accessibleElementCount: accessibilityElements.length,
    elements: accessibilityElements,
  };
};

// Error boundary testing utilities
export const createErrorComponent = (errorMessage: string) => {
  const ThrowError = () => {
    throw new Error(errorMessage);
  };
  return ThrowError;
};

// Re-export testing library
export * from '@testing-library/react-native';
export { customRender as render };