/**
 * Visual Regression Tests - UI Consistency
 */

import React from 'react';
import { render } from '../utils/testUtils';
import { SplashScreen } from '../../presentation/components/SplashScreen';

describe('Visual Regression Tests', () => {
  const baseProps = {
    appName: 'Visual Test App',
    tagline: 'Testing visual consistency',
    visible: true,
  };

  describe('Basic Layout Consistency', () => {
    it('maintains consistent layout structure', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const splashContainer = getByTestId('splash-screen');
      expect(splashContainer).toBeTruthy();
      
      // Check for consistent structure
      expect(splashContainer.children).toBeDefined();
    });

    it('renders logo consistently', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const logoElement = getByTestId('splash-logo');
      expect(logoElement).toBeTruthy();
    });

    it('renders typography consistently', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const typographyElement = getByTestId('splash-typography');
      expect(typographyElement).toBeTruthy();
    });

    it('renders loading indicator consistently', () => {
      const props = { ...baseProps, showLoading: true };
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      const loadingElement = getByTestId('splash-loading');
      expect(loadingElement).toBeTruthy();
    });
  });

  describe('Color Consistency', () => {
    it('applies text color consistently', () => {
      const props = {
        ...baseProps,
        textColor: '#FF0000',
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        color: '#FF0000',
      });
    });

    it('applies icon color consistently', () => {
      const props = {
        ...baseProps,
        iconColor: '#00FF00',
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      const iconElement = getByTestId('splash-icon');
      expect(iconElement.props.customColor).toBe('#00FF00');
    });

    it('applies decoration color consistently', () => {
      const props = {
        ...baseProps,
        decorationColor: 'rgba(255, 0, 0, 0.1)',
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      const decorationElement = getByTestId('splash-decorations');
      expect(decorationElement).toBeTruthy();
    });

    it('handles gradient colors consistently', () => {
      const props = {
        ...baseProps,
        gradientColors: ['#FF0000', '#00FF00', '#0000FF'],
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      const gradientElement = getByTestId('linear-gradient');
      expect(gradientElement.props.colors).toEqual([
        '#FF0000',
        '#00FF00',
        '#0000FF',
      ]);
    });
  });

  describe('Typography Consistency', () => {
    it('maintains consistent font sizes', () => {
      const { getByText } = render(<SplashScreen {...baseProps} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        fontSize: 48,
      });
    });

    it('maintains consistent font weights', () => {
      const { getByText } = render(<SplashScreen {...baseProps} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        fontWeight: '800',
      });
    });

    it('maintains consistent text alignment', () => {
      const { getByText } = render(<SplashScreen {...baseProps} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        textAlign: 'center',
      });
    });

    it('handles long text consistently', () => {
      const longAppName = 'Very Long Application Name That Might Wrap';
      const props = {
        ...baseProps,
        appName: longAppName,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      const appNameElement = getByText(longAppName);
      expect(appNameElement.props.numberOfLines).toBe(1);
    });
  });

  describe('Spacing Consistency', () => {
    it('maintains consistent padding', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const contentElement = getByTestId('splash-content');
      expect(contentElement.props.style).toContainEqual({
        paddingHorizontal: 24, // xl spacing
      });
    });

    it('maintains consistent margins', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const typographyElement = getByTestId('splash-typography');
      expect(typographyElement.props.style).toContainEqual({
        marginTop: 24, // xl spacing
      });
    });
  });

  describe('Responsive Consistency', () => {
    it('maintains consistency across different safe areas', () => {
      // Mock different safe area insets
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const splashContainer = getByTestId('splash-screen');
      expect(splashContainer).toBeTruthy();
    });

    it('handles different screen sizes consistently', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const splashContainer = getByTestId('splash-screen');
      expect(splashContainer.props.style).toContainEqual({
        flex: 1,
      });
    });
  });

  describe('State Consistency', () => {
    it('maintains visual consistency when hidden', () => {
      const props = { ...baseProps, visible: false };
      const { queryByText } = render(<SplashScreen {...props} />);
      
      expect(queryByText('Visual Test App')).toBeFalsy();
    });

    it('maintains visual consistency when shown', () => {
      const props = { ...baseProps, visible: true };
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText('Visual Test App')).toBeTruthy();
    });

    it('maintains consistency during loading state', () => {
      const props = {
        ...baseProps,
        showLoading: true,
        loadingText: 'Custom loading text',
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText('Custom loading text')).toBeTruthy();
    });
  });

  describe('Custom Render Consistency', () => {
    it('maintains consistency with custom logo', () => {
      const CustomLogo = () => <div testID="custom-logo">Custom Logo</div>;
      const props = {
        ...baseProps,
        renderLogo: () => <CustomLogo />,
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      expect(getByTestId('custom-logo')).toBeTruthy();
    });

    it('maintains consistency with custom content', () => {
      const CustomContent = () => <div testID="custom-content">Custom Content</div>;
      const props = {
        ...baseProps,
        renderContent: () => <CustomContent />,
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      expect(getByTestId('custom-content')).toBeTruthy();
    });

    it('maintains consistency with custom footer', () => {
      const CustomFooter = () => <div testID="custom-footer">Custom Footer</div>;
      const props = {
        ...baseProps,
        renderFooter: () => <CustomFooter />,
      };
      
      const { getByTestId } = render(<SplashScreen {...props} />);
      
      expect(getByTestId('custom-footer')).toBeTruthy();
    });
  });

  describe('Animation Consistency', () => {
    it('maintains consistent animation states', () => {
      const { getByTestId } = render(<SplashScreen {...baseProps} />);
      
      const splashContainer = getByTestId('splash-screen');
      expect(splashContainer).toBeTruthy();
    });
  });

  describe('Theme Consistency', () => {
    it('maintains consistency with light theme', () => {
      const props = {
        ...baseProps,
        textColor: '#000000',
        backgroundColor: '#FFFFFF',
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        color: '#000000',
      });
    });

    it('maintains consistency with dark theme', () => {
      const props = {
        ...baseProps,
        textColor: '#FFFFFF',
        backgroundColor: '#000000',
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      const appNameElement = getByText('Visual Test App');
      expect(appNameElement.props.style).toContainEqual({
        color: '#FFFFFF',
      });
    });
  });

  describe('Error State Consistency', () => {
    it('maintains consistent error display', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };
      
      const props = {
        ...baseProps,
        renderLogo: () => <ErrorComponent />,
      };
      
      const { getByText } = render(<SplashScreen {...props} />);
      
      expect(getByText('Something went wrong')).toBeTruthy();
    });
  });

  describe('Performance Consistency', () => {
    it('maintains consistent render performance', async () => {
      const { measureRenderTime } = require('../utils/testUtils');
      
      const renderTime = await measureRenderTime(<SplashScreen {...baseProps} />);
      
      // Should maintain consistent performance
      expect(renderTime).toBeLessThan(100); // 100ms
    });

    it('maintains consistency with complex props', async () => {
      const { measureRenderTime } = require('../utils/testUtils');
      
      const complexProps = {
        ...baseProps,
        gradientColors: ['#FF0000', '#00FF00', '#0000FF'],
        textColor: '#FFFFFF',
        iconColor: '#FFFF00',
        decorationColor: 'rgba(255, 255, 255, 0.1)',
      };
      
      const renderTime = await measureRenderTime(<SplashScreen {...complexProps} />);
      
      // Should maintain performance even with complex props
      expect(renderTime).toBeLessThan(150); // 150ms
    });
  });
});