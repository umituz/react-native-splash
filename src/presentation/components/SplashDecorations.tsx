/**
 * Splash Decorations Component
 * Single Responsibility: Render decorative background elements
 */

import React from "react";
import { View, StyleSheet } from "react-native";

export interface SplashDecorationsProps {
  decorationColor?: string;
}

export const SplashDecorations: React.FC<SplashDecorationsProps> = ({
  decorationColor = "rgba(255, 255, 255, 0.05)",
}) => {
  const styles = getStyles(decorationColor);

  return (
    <>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />
    </>
  );
};

const getStyles = (decorationColor: string) => StyleSheet.create({
  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: decorationColor,
    top: -100,
    right: -100,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: decorationColor.replace("0.05", "0.03"),
    bottom: -50,
    left: -50,
  },
  circle3: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: decorationColor.replace("0.05", "0.04"),
    top: "30%",
    right: "10%",
  },
});

