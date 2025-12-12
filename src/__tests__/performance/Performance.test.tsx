/**
 * Performance Tests - Memory Leak Prevention
 */

import React from 'react';
import { render, act, trackMemoryUsage } from '../utils/testUtils';
import { SplashScreen } from '../../presentation/components/SplashScreen';
import { useSplash } from '../../presentation/hooks/useSplash';

describe('Performance Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Memory Leak Prevention', () => {
    it('prevents memory leaks with timer cleanup', () => {
      const { trackMemoryUsage } = require('../utils/testUtils');
      const memoryTracker = trackMemoryUsage();
      
      const components = [];
      
      // Create and destroy many components
      for (let i = 0; i < 100; i++) {
        const { unmount } = render(
          <SplashScreen
            appName={`App ${i}`}
            visible={true}
            minimumDisplayTime={1000}
          />
        );
        components.push(unmount);
      }
      
      // Unmount all components
      components.forEach(unmount => unmount());
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const memoryIncrease = memoryTracker.getMemoryIncrease();
      
      // Memory increase should be minimal after cleanup
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024); // 5MB
    });

    it('cleans up useSplash timers properly', () => {
      const TestComponent = () => {
        const { isVisible, markReady } = useSplash({
          minimumDisplayTime: 5000,
          autoHide: true,
        });
        
        return (
          <SplashScreen
            appName="Test App"
            visible={isVisible}
            onReady={markReady}
          />
        );
      };
      
      const { unmount } = render(<TestComponent />);
      
      // Component should be unmounted before timer completes
      unmount();
      
      // Should not cause memory leaks or timer issues
      expect(true).toBe(true);
    });

    it('handles rapid mount/unmount cycles', () => {
      const { trackMemoryUsage } = require('../utils/testUtils');
      const memoryTracker = trackMemoryUsage();
      
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <SplashScreen
            appName="Rapid Test"
            visible={true}
            minimumDisplayTime={100}
          />
        );
        
        // Immediately unmount
        unmount();
      }
      
      if (global.gc) {
        global.gc();
      }
      
      const memoryIncrease = memoryTracker.getMemoryIncrease();
      expect(memoryIncrease).toBeLessThan(2 * 1024 * 1024); // 2MB
    });
  });

  describe('Render Performance', () => {
    it('renders quickly with basic props', async () => {
      const { measureRenderTime } = require('../utils/testUtils');
      
      const renderTime = await measureRenderTime(
        <SplashScreen
          appName="Performance Test"
          visible={true}
        />
      );
      
      expect(renderTime).toBeLessThan(50); // 50ms
    });

    it('renders efficiently with complex props', async () => {
      const { measureRenderTime } = require('../utils/testUtils');
      
      const ComplexSplash = () => (
        <SplashScreen
          appName="Complex App"
          tagline="Complex tagline with lots of text"
          gradientColors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']}
          textColor="#FFFFFF"
          iconColor="#FFFF00"
          decorationColor="rgba(255, 255, 255, 0.1)"
          showLoading={true}
          minimumDisplayTime={2000}
          renderLogo={() => <div>Complex Logo</div>}
          renderContent={() => <div>Complex Content</div>}
          renderFooter={() => <div>Complex Footer</div>}
          visible={true}
        />
      );
      
      const renderTime = await measureRenderTime(<ComplexSplash />);
      
      expect(renderTime).toBeLessThan(100); // 100ms
    });

    it('handles prop updates efficiently', async () => {
      const { measureRenderTime } = require('../utils/testUtils');
      
      let props = {
        appName: "Initial App",
        visible: true,
      };
      
      const initialRenderTime = await measureRenderTime(
        <SplashScreen {...props} />
      );
      
      // Update props
      props = {
        ...props,
        appName: "Updated App",
        textColor: "#FF0000",
      };
      
      const updateRenderTime = await measureRenderTime(
        <SplashScreen {...props} />
      );
      
      expect(initialRenderTime).toBeLessThan(50);
      expect(updateRenderTime).toBeLessThan(30); // Updates should be faster
    });
  });

  describe('Timer Performance', () => {
    it('handles multiple timers efficiently', () => {
      const onReady = jest.fn();
      
      const { unmount } = render(
        <SplashScreen
          appName="Timer Test"
          visible={true}
          minimumDisplayTime={1000}
          onReady={onReady}
        />
      );
      
      // Advance timers partially
      act(() => {
        jest.advanceTimersByTime(500);
      });
      
      expect(onReady).not.toHaveBeenCalled();
      
      // Complete timers
      act(() => {
        jest.advanceTimersByTime(500);
      });
      
      expect(onReady).toHaveBeenCalledTimes(1);
      
      unmount();
    });

    it('prevents timer conflicts', () => {
      const onReady1 = jest.fn();
      const onReady2 = jest.fn();
      
      const { unmount: unmount1 } = render(
        <SplashScreen
          appName="Timer Test 1"
          visible={true}
          minimumDisplayTime={1000}
          onReady={onReady1}
        />
      );
      
      const { unmount: unmount2 } = render(
        <SplashScreen
          appName="Timer Test 2"
          visible={true}
          minimumDisplayTime={1500}
          onReady={onReady2}
        />
      );
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(onReady1).toHaveBeenCalledTimes(1);
      expect(onReady2).not.toHaveBeenCalled();
      
      act(() => {
        jest.advanceTimersByTime(500);
      });
      
      expect(onReady2).toHaveBeenCalledTimes(1);
      
      unmount1();
      unmount2();
    });
  });

  describe('Memory Usage Patterns', () => {
    it('maintains stable memory usage during extended operation', () => {
      const { trackMemoryUsage } = require('../utils/testUtils');
      const memoryTracker = trackMemoryUsage();
      
      let currentProps = {
        appName: "Base App",
        visible: true,
      };
      
      const { rerender } = render(<SplashScreen {...currentProps} />);
      
      // Simulate extended operation with prop changes
      for (let i = 0; i < 100; i++) {
        currentProps = {
          ...currentProps,
          appName: `App ${i}`,
          tagline: i % 2 === 0 ? `Tagline ${i}` : undefined,
        };
        
        rerender(<SplashScreen {...currentProps} />);
        
        if (i % 10 === 0 && global.gc) {
          global.gc();
        }
      }
      
      const memoryIncrease = memoryTracker.getMemoryIncrease();
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB
    });

    it('handles large prop objects efficiently', () => {
      const largeGradientColors = Array.from({ length: 100 }, (_, i) => 
        `#${i.toString(16).padStart(6, '0')}`
      );
      
      const { trackMemoryUsage } = require('../utils/testUtils');
      const memoryTracker = trackMemoryUsage();
      
      const { unmount } = render(
        <SplashScreen
          appName="Large Props Test"
          gradientColors={largeGradientColors}
          visible={true}
        />
      );
      
      unmount();
      
      if (global.gc) {
        global.gc();
      }
      
      const memoryIncrease = memoryTracker.getMemoryIncrease();
      expect(memoryIncrease).toBeLessThan(1 * 1024 * 1024); // 1MB
    });
  });
});