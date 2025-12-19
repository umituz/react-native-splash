/**
 * Splash Screen Component
 *
 * Ultra minimal splash screen - just displays icon, name, and tagline.
 * Parent component controls visibility and timing.
 */

import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SplashOptions } from "../../domain/entities/SplashOptions";

export interface SplashScreenProps extends SplashOptions {
  /** Control visibility from parent */
  visible?: boolean;
}

const DEFAULT_BG = "#6366F1";
const DEFAULT_TEXT = "#FFFFFF";

export const SplashScreen: React.FC<SplashScreenProps> = ({
  icon,
  appName = "",
  tagline = "",
  backgroundColor = DEFAULT_BG,
  gradientColors,
  textColor = DEFAULT_TEXT,
  showLoading = true,
  visible = true,
}) => {
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (__DEV__) {
      console.log(`[SplashScreen] Mounted - appName: ${appName}, visible: ${visible}`);
    }
  }, [appName, visible]);

  if (!visible) {
    if (__DEV__) console.log('[SplashScreen] Not visible, returning null');
    return null;
  }

  const content = (
    <View style={[styles.content, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.center}>
        {icon ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        {appName ? (
          <Text style={[styles.title, { color: textColor }]}>{appName}</Text>
        ) : null}

        {tagline ? (
          <Text style={[styles.subtitle, { color: textColor }]}>{tagline}</Text>
        ) : null}
      </View>

      {showLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={textColor} size="small" />
        </View>
      ) : null}
    </View>
  );

  // Use gradient if colors provided, otherwise solid background
  if (gradientColors && gradientColors.length >= 2) {
    return (
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.9,
  },
  loading: {
    alignItems: "center",
    paddingBottom: 48,
  },
});
