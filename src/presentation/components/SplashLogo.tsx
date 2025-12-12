/**
 * Splash Logo Component
 * Single Responsibility: Render splash screen logo
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicIcon } from "@umituz/react-native-design-system-atoms";

export interface SplashLogoProps {
  logo?: string | React.ReactNode;
  logoSize?: number;
  glowSize?: number;
  iconColor?: string;
}

export const SplashLogo: React.FC<SplashLogoProps> = ({
  logo,
  logoSize = 140,
  glowSize = 160,
  iconColor = "#FFFFFF",
}) => {
  const styles = getStyles(logoSize, glowSize);

  return (
    <View style={styles.container}>
      <View style={styles.glow} />
      <View style={styles.background}>
        {typeof logo === "string" ? (
          <AtomicIcon name={logo || "Sparkles"} size="xxl" customColor={iconColor} />
        ) : logo ? (
          logo
        ) : (
          <AtomicIcon name="Sparkles" size="xxl" customColor={iconColor} />
        )}
      </View>
    </View>
  );
};

const getStyles = (logoSize: number, glowSize: number) => {
  const radius = logoSize / 2;
  const glowRadius = glowSize / 2;

  return StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    glow: {
      position: "absolute",
      width: glowSize,
      height: glowSize,
      borderRadius: glowRadius,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      shadowColor: "#FFFFFF",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 30,
      elevation: 10,
    },
    background: {
      width: logoSize,
      height: logoSize,
      borderRadius: radius,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.3)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });
};

