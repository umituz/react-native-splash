/**
 * Splash Typography Component
 * Single Responsibility: Render splash screen typography
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { DesignTokens } from "@umituz/react-native-design-system-theme";

export interface SplashTypographyProps {
  appName: string;
  tagline?: string;
  tokens: DesignTokens;
  textColor?: string;
}

export const SplashTypography: React.FC<SplashTypographyProps> = ({
  appName,
  tagline,
  tokens,
  textColor = "#FFFFFF",
}) => {
  const styles = getStyles(tokens, textColor);

  return (
    <View style={styles.container}>
      <Text style={styles.appName} numberOfLines={1}>
        {appName}
      </Text>
      {tagline && (
        <Text style={styles.tagline} numberOfLines={2}>
          {tagline}
        </Text>
      )}
    </View>
  );
};

const getStyles = (tokens: DesignTokens, textColor: string) => {
  return StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: tokens.spacing.xl,
    },
    appName: {
      fontSize: 48,
      fontWeight: "800" as const,
      color: textColor,
      textAlign: "center" as const,
      marginBottom: tokens.spacing.md,
      letterSpacing: -1.2,
      lineHeight: 56,
      textShadowColor: "rgba(0, 0, 0, 0.25)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
    },
    tagline: {
      fontSize: 17,
      color: textColor,
      textAlign: "center" as const,
      opacity: 0.95,
      maxWidth: 320,
      lineHeight: 24,
      fontWeight: "500" as const,
      letterSpacing: 0.2,
      textShadowColor: "rgba(0, 0, 0, 0.2)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
  });
};

