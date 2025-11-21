/**
 * Splash Screen Component
 * Single Responsibility: Orchestrate splash screen UI
 */

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { SplashLogo } from "./SplashLogo";
import { SplashTypography } from "./SplashTypography";
import { SplashLoading } from "./SplashLoading";
import { SplashDecorations } from "./SplashDecorations";
import {
  getDefaultGradient,
  generateGradientFromColor,
} from "../utils/splashGradient.utils";
import type { SplashOptions } from "../../domain/entities/SplashOptions";

export interface SplashScreenProps extends SplashOptions {
  visible?: boolean;
}

/**
 * Splash Screen Component
 */
export const SplashScreen: React.FC<SplashScreenProps> = ({
  appName,
  tagline,
  logo,
  backgroundColor,
  loadingText,
  showLoading = true,
  minimumDisplayTime = 1500,
  onReady,
  renderLogo,
  renderContent,
  renderFooter,
  visible = true,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const { themeMode } = useDesignSystemTheme();
  const tokens = useAppDesignTokens();

  const isDark = themeMode === "dark";

  const gradientColors = backgroundColor
    ? generateGradientFromColor(backgroundColor, isDark)
    : getDefaultGradient(isDark);

  const styles = getStyles(insets, tokens.spacing);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      if (onReady) {
        onReady();
      }
    }, minimumDisplayTime);

    return () => clearTimeout(timer);
  }, [visible, minimumDisplayTime, onReady]);

  if (!visible) return null;

  const displayAppName = appName || t("branding.appName", "App Name");
  const displayTagline = tagline || t("branding.tagline", "Your tagline here");
  const displayLoadingText = loadingText || t("general.loading", "Loading...");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors as readonly string[]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SplashDecorations />

        <View style={styles.content}>
          {renderLogo ? (
            renderLogo()
          ) : (
            <SplashLogo logo={logo} />
          )}

          {renderContent ? (
            renderContent()
          ) : (
            <SplashTypography
              appName={displayAppName}
              tagline={displayTagline}
              tokens={tokens}
            />
          )}
        </View>

        {showLoading && (
          <SplashLoading
            loadingText={displayLoadingText}
            tokens={tokens}
            bottomInset={insets.bottom}
          />
        )}

        {renderFooter && renderFooter()}
      </LinearGradient>
    </View>
  );
};

const getStyles = (
  insets: { top: number; bottom: number },
  spacing: any,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    gradient: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      position: "relative",
      overflow: "hidden",
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
      zIndex: 1,
    },
  });
};
