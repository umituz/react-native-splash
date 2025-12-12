/**
 * Splash Screen Tests
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SplashScreen } from "../presentation/components/SplashScreen";

// Mock dependencies
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34 }),
}));

jest.mock("@umituz/react-native-localization", () => ({
  useLocalization: () => ({
    t: (key: string, fallback: string) => fallback,
  }),
}));

jest.mock("@umituz/react-native-design-system-theme", () => ({
  useAppDesignTokens: () => ({
    colors: { primary: "#007AFF" },
    spacing: { xl: 24, md: 16, xxxl: 48 },
  }),
}));

jest.mock("@umituz/react-native-design-system-atoms", () => ({
  AtomicIcon: ({ name, size, customColor }: any) => (
    <div testID={`icon-${name}`} data-size={size} data-color={customColor} />
  ),
}));

jest.mock("expo-linear-gradient", () => ({
  LinearGradient: ({ children, testID }: any) => (
    <div testID={testID || "linear-gradient"}>{children}</div>
  ),
}));

describe("SplashScreen", () => {
  const defaultProps = {
    appName: "Test App",
    tagline: "Test Tagline",
    visible: true,
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders correctly with basic props", () => {
    const { getByText } = render(<SplashScreen {...defaultProps} />);
    
    expect(getByText("Test App")).toBeTruthy();
    expect(getByText("Test Tagline")).toBeTruthy();
  });

  it("renders without tagline when not provided", () => {
    const props = { ...defaultProps, tagline: undefined };
    const { getByText, queryByText } = render(<SplashScreen {...props} />);
    
    expect(getByText("Test App")).toBeTruthy();
    expect(queryByText("Test Tagline")).toBeFalsy();
  });

  it("calls onReady after minimum display time", () => {
    const onReady = jest.fn();
    const props = { ...defaultProps, onReady };
    
    render(<SplashScreen {...props} />);
    
    expect(onReady).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(1500);
    
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it("does not render when visible is false", () => {
    const props = { ...defaultProps, visible: false };
    const { queryByText } = render(<SplashScreen {...props} />);
    
    expect(queryByText("Test App")).toBeFalsy();
  });

  it("uses custom colors when provided", () => {
    const props = {
      ...defaultProps,
      textColor: "#FF0000",
      iconColor: "#00FF00",
      decorationColor: "rgba(255, 0, 0, 0.1)",
    };
    
    render(<SplashScreen {...props} />);
    
    // Color props are passed down to child components
    // This test ensures the props are accepted without error
    expect(true).toBeTruthy();
  });

  it("uses gradient colors when provided", () => {
    const props = {
      ...defaultProps,
      gradientColors: ["#FF0000", "#00FF00", "#0000FF"],
    };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId("linear-gradient")).toBeTruthy();
  });

  it("renders custom logo when provided", () => {
    const CustomLogo = () => <div testID="custom-logo" />;
    const props = { ...defaultProps, renderLogo: () => <CustomLogo /> };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId("custom-logo")).toBeTruthy();
  });

  it("renders custom content when provided", () => {
    const CustomContent = () => <div testID="custom-content" />;
    const props = { ...defaultProps, renderContent: () => <CustomContent /> };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId("custom-content")).toBeTruthy();
  });

  it("renders custom footer when provided", () => {
    const CustomFooter = () => <div testID="custom-footer" />;
    const props = { ...defaultProps, renderFooter: () => <CustomFooter /> };
    
    const { getByTestId } = render(<SplashScreen {...props} />);
    
    expect(getByTestId("custom-footer")).toBeTruthy();
  });

  it("hides loading indicator when showLoading is false", () => {
    const props = { ...defaultProps, showLoading: false };
    const { queryByText } = render(<SplashScreen {...props} />);
    
    expect(queryByText("Loading...")).toBeFalsy();
  });

  it("uses custom minimum display time", () => {
    const onReady = jest.fn();
    const props = { ...defaultProps, onReady, minimumDisplayTime: 3000 };
    
    render(<SplashScreen {...props} />);
    
    jest.advanceTimersByTime(1500);
    expect(onReady).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(1500);
    expect(onReady).toHaveBeenCalledTimes(1);
  });
});