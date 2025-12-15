/**
 * Splash Screen Component
 *
 * ULTRA MINIMAL - No external dependencies
 * Only basic React Native + expo-linear-gradient + safe-area
 */

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { SplashOptions } from "../../domain/entities/SplashOptions";

export interface SplashScreenProps extends SplashOptions {
  visible?: boolean;
  textColor?: string;
}

const DEFAULT_BG = "#6366F1";
const DEFAULT_TEXT = "#FFFFFF";

export const SplashScreen: React.FC<SplashScreenProps> = ({
  appName = "",
  tagline = "",
  backgroundColor = DEFAULT_BG,
  gradientColors,
  loadingText = "",
  showLoading = true,
  minimumDisplayTime = 1500,
  onReady,
  renderLogo,
  renderContent,
  renderFooter,
  visible = true,
  textColor = DEFAULT_TEXT,
}) => {
  const insets = useSafeAreaInsets();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (__DEV__) console.log("[SplashScreen] visible:", visible);

  useEffect(() => {
    if (!visible) return;

    if (__DEV__) console.log("[SplashScreen] Timer start:", minimumDisplayTime);

    timerRef.current = setTimeout(() => {
      if (__DEV__) console.log("[SplashScreen] onReady called");
      onReady?.();
    }, minimumDisplayTime);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, minimumDisplayTime, onReady]);

  if (!visible) return null;

  const hasGradient = gradientColors && gradientColors.length > 1;
  const colors: [string, string, ...string[]] = hasGradient
    ? (gradientColors as [string, string, ...string[]])
    : [backgroundColor, backgroundColor];

  const content = (
    <View style={[styles.inner, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.center}>
        {renderLogo ? renderLogo() : <View style={styles.logo} />}

        {renderContent ? (
          renderContent()
        ) : (
          <>
            {appName ? <Text style={[styles.title, { color: textColor }]}>{appName}</Text> : null}
            {tagline ? <Text style={[styles.subtitle, { color: textColor }]}>{tagline}</Text> : null}
          </>
        )}
      </View>

      {showLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={textColor} />
          {loadingText ? <Text style={[styles.loadingText, { color: textColor }]}>{loadingText}</Text> : null}
        </View>
      )}

      {renderFooter?.()}
    </View>
  );

  return (
    <View style={styles.container}>
      {hasGradient ? (
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fill}>
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.fill, { backgroundColor }]}>{content}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fill: { flex: 1 },
  inner: { flex: 1, justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  logo: { width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 24 },
  title: { fontSize: 32, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: "center", opacity: 0.9 },
  loading: { alignItems: "center", paddingBottom: 48 },
  loadingText: { fontSize: 14, marginTop: 12, opacity: 0.8 },
});
