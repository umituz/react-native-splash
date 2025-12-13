/**
 * Splash Error Boundary
 * Single Responsibility: Handle splash screen errors gracefully
 */

import React, { Component, ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  backgroundColor?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SplashErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (__DEV__) {
      console.error("Splash Screen Error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const dynamicStyles = getStyles(this.props.backgroundColor);
      return <View style={dynamicStyles.container} />;
    }

    return this.props.children;
  }
}

const getStyles = (backgroundColor?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: backgroundColor ?? "transparent",
    },
  });