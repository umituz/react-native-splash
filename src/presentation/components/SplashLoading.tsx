/**
 * Splash Loading Component
 * Single Responsibility: Render splash screen loading indicator
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system-theme";

export interface SplashLoadingProps {
  loadingText: string;
  tokens: DesignTokens;
  bottomInset: number;
}

export const SplashLoading: React.FC<SplashLoadingProps> = ({
  loadingText,
  tokens,
  bottomInset,
}) => {
  const styles = getStyles(tokens, bottomInset);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
      </View>
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
};

const getStyles = (tokens: DesignTokens, bottomInset: number) => {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: tokens.spacing.xxxl + bottomInset,
      zIndex: 1,
    },
    barContainer: {
      width: 120,
      height: 4,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 2,
      overflow: "hidden",
      marginBottom: tokens.spacing.md,
    },
    bar: {
      width: "60%",
      height: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 2,
      shadowColor: "#FFFFFF",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 4,
    },
    text: {
      fontSize: 13,
      color: "#FFFFFF",
      opacity: 0.9,
      fontWeight: "500" as const,
      letterSpacing: 0.8,
      textShadowColor: "rgba(0, 0, 0, 0.15)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });
};

