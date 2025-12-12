/**
 * Edge Case Tests - Error Scenarios and Edge Cases
 */

import React from 'react';
import { render, fireEvent, act, createErrorComponent } from '../utils/testUtils';
import { SplashScreen } from '../../presentation/components/SplashScreen';
import { useSplash } from '../../presentation/hooks/useSplash';

describe('Edge Case Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Empty and Null Props', () => {
    it('handles empty string props', () => {
      const props = {
        appName: '',
        tagline: '',
        loadingText: '',
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles null props', () => {
      const props = {
        appName: null,
        tagline: null,
        loadingText: null,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles undefined props', () => {
      const props = {
        appName: undefined,
        tagline: undefined,
        loadingText: undefined,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles missing props object', () => {
      const { container } = render(<SplashScreen />);
      
      // Should render with defaults
      expect(container).toBeTruthy();
    });
  });

  describe('Invalid Props', () => {
    it('handles invalid gradient colors', () => {
      const props = {
        appName: 'Test App',
        gradientColors: ['invalid-color', 'another-invalid'],
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles empty gradient colors array', () => {
      const props = {
        appName: 'Test App',
        gradientColors: [],
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles single color in gradient', () => {
      const props = {
        appName: 'Test App',
        gradientColors: ['#FF0000'],
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles negative minimum display time', () => {
      const props = {
        appName: 'Test App',
        minimumDisplayTime: -1000,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles very large minimum display time', () => {
      const props = {
        appName: 'Test App',
        minimumDisplayTime: Number.MAX_SAFE_INTEGER,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });
  });

  describe('Error Scenarios', () => {
    it('handles renderLogo function throwing error', () => {
      const props = {
        appName: 'Test App',
        renderLogo: createErrorComponent('Logo error'),
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      // Should show error boundary fallback
      expect(getByText('Something went wrong')).toBeTruthy();
    });

    it('handles renderContent function throwing error', () => {
      const props = {
        appName: 'Test App',
        renderContent: createErrorComponent('Content error'),
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      // Should show error boundary fallback
      expect(getByText('Something went wrong')).toBeTruthy();
    });

    it('handles renderFooter function throwing error', () => {
      const props = {
        appName: 'Test App',
        renderFooter: createErrorComponent('Footer error'),
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      // Should show error boundary fallback
      expect(getByText('Something went wrong')).toBeTruthy();
    });

    it('handles onReady callback throwing error', () => {
      const props = {
        appName: 'Test App',
        onReady: () => {
          throw new Error('Callback error');
        },
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      
      // Should still render without crashing
      expect(getByText('Test App')).toBeTruthy();
    });

    it('handles async onReady callback rejection', async () => {
      const props = {
        appName: 'Test App',
        onReady: async () => {
          throw new Error('Async callback error');
        },
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      await act(async () => {
        jest.advanceTimersByTime(1500);
      });
      
      // Should still render without crashing
      expect(getByText('Test App')).toBeTruthy();
    });
  });

  describe('useSplash Hook Edge Cases', () => {
    it('handles multiple markReady calls', () => {
      const onReady = jest.fn();
      const TestComponent = () => {
        const { markReady } = useSplash({ onReady });
        
        React.useEffect(() => {
          markReady();
          markReady();
          markReady();
        }, []);
        
        return <div>Test</div>;
      };
      
      render(<TestComponent />);
      
      // Should only call onReady once
      expect(onReady).toHaveBeenCalledTimes(1);
    });

    it('handles markReady after unmount', () => {
      const onReady = jest.fn();
      const TestComponent = () => {
        const { markReady } = useSplash({ onReady });
        
        React.useEffect(() => {
          const timer = setTimeout(markReady, 1000);
          return () => clearTimeout(timer);
        }, []);
        
        return <div>Test</div>;
      };
      
      const { unmount } = render(<TestComponent />);
      
      // Unmount before timer completes
      unmount();
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      // Should not call onReady after unmount
      expect(onReady).not.toHaveBeenCalled();
    });

    it('handles zero minimum display time', () => {
      const TestComponent = () => {
        const { isVisible, markReady } = useSplash({
          minimumDisplayTime: 0,
          autoHide: true,
        });
        
        React.useEffect(() => {
          markReady();
        }, []);
        
        return isVisible ? <div>Visible</div> : <div>Hidden</div>;
      };
      
      const { getByText } = render(<TestComponent />);
      
      // Should hide immediately
      expect(getByText('Hidden')).toBeTruthy();
    });
  });

  describe('Memory and Performance Edge Cases', () => {
    it('handles very long app names', () => {
      const longName = 'A'.repeat(1000);
      const props = {
        appName: longName,
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText(longName)).toBeTruthy();
    });

    it('handles very long taglines', () => {
      const longTagline = 'B'.repeat(2000);
      const props = {
        appName: 'Test App',
        tagline: longTagline,
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText(longTagline)).toBeTruthy();
    });

    it('handles many gradient colors', () => {
      const manyColors = Array.from({ length: 100 }, (_, i) => 
        `#${i.toString(16).padStart(6, '0')}`
      );
      
      const props = {
        appName: 'Test App',
        gradientColors: manyColors,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      expect(container).toBeTruthy();
    });
  });

  describe('Component Lifecycle Edge Cases', () => {
    it('handles rapid prop changes', () => {
      const { rerender } = render(
        <SplashScreen appName="App 1" visible={true} />
      );
      
      // Rapidly change props
      for (let i = 2; i <= 100; i++) {
        rerender(<SplashScreen appName={`App ${i}`} visible={i % 2 === 0} />);
      }
      
      // Should not crash
      expect(true).toBe(true);
    });

    it('handles visibility toggle during timer', () => {
      const onReady = jest.fn();
      const { rerender } = render(
        <SplashScreen
          appName="Test App"
          visible={true}
          minimumDisplayTime={2000}
          onReady={onReady}
        />
      );
      
      // Hide before timer completes
      rerender(<SplashScreen appName="Test App" visible={false} />);
      
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Should not call onReady when hidden
      expect(onReady).not.toHaveBeenCalled();
    });

    it('handles component unmount during timer', () => {
      const onReady = jest.fn();
      const { unmount } = render(
        <SplashScreen
          appName="Test App"
          visible={true}
          minimumDisplayTime={2000}
          onReady={onReady}
        />
      );
      
      // Unmount before timer completes
      unmount();
      
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Should not call onReady after unmount
      expect(onReady).not.toHaveBeenCalled();
    });
  });

  describe('Localization Edge Cases', () => {
    it('handles missing localization keys', () => {
      const props = {
        appName: undefined,
        tagline: undefined,
        loadingText: undefined,
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render with empty fallbacks
      expect(container).toBeTruthy();
    });

    it('handles special characters in text', () => {
      const props = {
        appName: 'App with émojis 🎉 and spéci@l ch@rs!',
        tagline: 'Tàglîne wïth äccénts & spëcial chars',
        visible: true,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText('App with émojis 🎉 and spéci@l ch@rs!')).toBeTruthy();
      expect(getByText('Tàglîne wïth äccénts & spëcial chars')).toBeTruthy();
    });
  });

  describe('Theme Edge Cases', () => {
    it('handles invalid color values', () => {
      const props = {
        appName: 'Test App',
        textColor: 'not-a-color',
        iconColor: 'also-not-a-color',
        decorationColor: 'definitely-not-a-color',
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });

    it('handles transparent colors', () => {
      const props = {
        appName: 'Test App',
        textColor: 'transparent',
        backgroundColor: 'transparent',
        visible: true,
      };
      
      const { container } = render(<SplashScreen {...props} />);
      
      // Should render without crashing
      expect(container).toBeTruthy();
    });
  });
});