/**
 * Integration Tests - Complete Splash Screen Flow
 */

import React from 'react';
import { render, fireEvent, act } from '../utils/testUtils';
import { SplashScreen } from '../../presentation/components/SplashScreen';
import { useSplash } from '../../presentation/hooks/useSplash';

describe('SplashScreen Integration Tests', () => {
  const defaultProps = {
    appName: 'Integration Test App',
    tagline: 'Testing complete flow',
    visible: true,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('completes full splash screen lifecycle', async () => {
    const onReady = jest.fn();
    const props = { ...defaultProps, onReady };
    
    const { getByText, queryByText, rerender } = render(<SplashScreen {...props} />);
    
    // Initial render
    expect(getByText('Integration Test App')).toBeTruthy();
    expect(getByText('Testing complete flow')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
    
    // Wait for minimum display time
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    expect(onReady).toHaveBeenCalledTimes(1);
    
    // Hide splash screen
    rerender(<SplashScreen {...props} visible={false} />);
    
    expect(queryByText('Integration Test App')).toBeFalsy();
  });

  it('handles custom render functions throughout lifecycle', () => {
    const CustomLogo = () => <div testID="custom-logo">Custom Logo</div>;
    const CustomContent = () => <div testID="custom-content">Custom Content</div>;
    const CustomFooter = () => <div testID="custom-footer">Custom Footer</div>;
    
    const props = {
      ...defaultProps,
      renderLogo: () => <CustomLogo />,
      renderContent: () => <CustomContent />,
      renderFooter: () => <CustomFooter />,
    };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId('custom-logo')).toBeTruthy();
    expect(getByTestId('custom-content')).toBeTruthy();
    expect(getByTestId('custom-footer')).toBeTruthy();
  });

  it('integrates with useSplash hook properly', () => {
    const TestComponent = () => {
      const { isVisible, markReady } = useSplash({
        minimumDisplayTime: 1000,
      });
      
      return (
        <SplashScreen
          {...defaultProps}
          visible={isVisible}
          onReady={markReady}
        />
      );
    };
    
    const { getByText, queryByText } = render(<TestComponent />);
    
    expect(getByText('Integration Test App')).toBeTruthy();
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Should auto-hide after markReady is called
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(queryByText('Integration Test App')).toBeFalsy();
  });

  it('handles gradient and color theming integration', () => {
    const props = {
      ...defaultProps,
      gradientColors: ['#FF0000', '#00FF00', '#0000FF'],
      textColor: '#FFFFFF',
      iconColor: '#FFFF00',
      decorationColor: 'rgba(255, 255, 255, 0.1)',
    };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId('linear-gradient')).toBeTruthy();
  });

  it('manages error states across components', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const props = {
      ...defaultProps,
      renderLogo: () => <ErrorComponent />,
    };
    
    const { getByText } = render(<SplashScreen {...props} />);
    
    // Should show error boundary fallback
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('handles responsive design with safe areas', () => {
    const props = {
      ...defaultProps,
      showLoading: true,
    };
    
    const { getByText } = render(<SplashScreen {...props} />);
    
    // Should render with proper spacing for safe areas
    expect(getByText('Integration Test App')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('maintains performance during complex scenarios', async () => {
    const ComplexComponent = () => {
      const [count, setCount] = React.useState(0);
      
      React.useEffect(() => {
        const interval = setInterval(() => {
          setCount(c => c + 1);
        }, 100);
        
        return () => clearInterval(interval);
      }, []);
      
      return (
        <SplashScreen
          {...defaultProps}
          renderContent={() => <div>Count: {count}</div>}
        />
      );
    };
    
    const { measureRenderTime } = require('../utils/testUtils');
    const renderTime = await measureRenderTime(<ComplexComponent />);
    
    // Should render within reasonable time
    expect(renderTime).toBeLessThan(100); // 100ms
  });

  it('handles localization integration', () => {
    const props = {
      appName: undefined, // Will use localization
      tagline: undefined, // Will use localization
      loadingText: undefined, // Will use localization
    };
    
    const { getByText } = render(<SplashScreen {...props} />);
    
    // Should show fallback text from localization mock
    expect(getByText('')).toBeTruthy(); // Empty fallback
  });

  it('manages memory correctly during mount/unmount cycles', () => {
    const { trackMemoryUsage } = require('../utils/testUtils');
    const memoryTracker = trackMemoryUsage();
    
    const { unmount } = render(<SplashScreen {...defaultProps} />);
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    const memoryIncrease = memoryTracker.getMemoryIncrease();
    
    // Memory increase should be minimal
    expect(memoryIncrease).toBeLessThan(1024 * 1024); // 1MB
    
    unmount();
  });
});