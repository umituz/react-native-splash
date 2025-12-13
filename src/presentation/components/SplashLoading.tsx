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
  textColor?: string;
}

export const SplashLoading: React.FC<SplashLoadingProps> = ({
  loadingText,
  tokens,
  bottomInset,
  textColor = "#FFFFFF",
}) => {
  const styles = getStyles(tokens, bottomInset, textColor);

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.bar} />
      </View>
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
};

const getStyles = (tokens: DesignTokens, bottomInset: number, textColor: string) => {
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
      backgroundColor: textColor,
      borderRadius: 2,
    },
    text: {
      fontSize: 13,
      color: textColor,
      opacity: 0.9,
      fontWeight: "500" as const,
      letterSpacing: 0.8,
    },
  });
};

