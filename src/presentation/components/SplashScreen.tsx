/**
 * Splash Screen Component
 *
 * Simple splash screen with logo, app name, and loading indicator
 */

import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalization } from "@umituz/react-native-localization";
import {
  useDesignSystemTheme,
  useAppDesignTokens,
} from "@umituz/react-native-design-system-theme";
import { AtomicIcon } from "@umituz/react-native-design-system-atoms";
import type { SplashOptions } from "../../domain/entities/SplashOptions";

export interface SplashScreenProps extends SplashOptions {
  /**
   * Whether splash is visible
   */
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
  const colors = tokens.colors;
  const spacing = tokens.spacing;
  
  // Use provided backgroundColor or theme-based color
  const finalBackgroundColor = backgroundColor || colors.primary;
  
  // Generate gradient colors based on theme
  const gradientColors: [string, string] = backgroundColor
    ? [backgroundColor, adjustColorBrightness(backgroundColor, isDark ? -15 : 10)]
    : isDark
    ? [colors.primary, adjustColorBrightness(colors.primary, -20)]
    : [colors.primary, adjustColorBrightness(colors.primary, 15)];
  
  const styles = getStyles(insets, finalBackgroundColor, colors, spacing, isDark);

  /**
   * Call onReady after minimum display time
   */
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
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Main Content */}
        <View style={styles.content}>
          {renderLogo ? (
            renderLogo()
          ) : (
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                {typeof logo === "string" ? (
                  <AtomicIcon
                    name={logo || "Sparkles"}
                    size="xl"
                    color={isDark ? "primary" : "textInverse"}
                  />
                ) : logo ? (
                  logo
                ) : (
                  <AtomicIcon
                    name="Sparkles"
                    size="xl"
                    color={isDark ? "primary" : "textInverse"}
                  />
                )}
              </View>
            </View>
          )}

          {renderContent ? (
            renderContent()
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.appName}>{displayAppName}</Text>
              {displayTagline && (
                <Text style={styles.tagline}>{displayTagline}</Text>
              )}
            </View>
          )}
        </View>

        {/* Loading Indicator */}
        {showLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={isDark ? colors.primary : "#FFFFFF"}
            />
            <Text style={styles.loadingText}>{displayLoadingText}</Text>
          </View>
        )}

        {/* Footer */}
        {renderFooter && renderFooter()}
      </LinearGradient>
    </View>
  );
};

/**
 * Adjust color brightness
 */
const adjustColorBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

const getStyles = (
  insets: { top: number; bottom: number },
  backgroundColor: string,
  colors: any,
  spacing: any,
  isDark: boolean,
) => {
  const textColor = isDark ? colors.textPrimary : "#FFFFFF";
  const logoBgOpacity = isDark ? 0.15 : 0.2;
  const textOpacity = isDark ? 1 : 0.95;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    gradient: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    logoContainer: {
      marginBottom: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
    },
    logoBackground: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isDark
        ? `${colors.primary}${Math.round(logoBgOpacity * 255).toString(16).padStart(2, "0")}`
        : `rgba(255, 255, 255, ${logoBgOpacity})`,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.md,
      borderWidth: isDark ? 2 : 0,
      borderColor: isDark ? `${colors.primary}40` : "transparent",
    },
    textContainer: {
      alignItems: "center",
      marginBottom: spacing.xxxl,
    },
    appName: {
      fontSize: 32,
      fontWeight: "700",
      color: textColor,
      textAlign: "center",
      marginBottom: spacing.sm,
      letterSpacing: -0.5,
    },
    tagline: {
      fontSize: 16,
      color: textColor,
      textAlign: "center",
      opacity: textOpacity * 0.85,
      maxWidth: 300,
      lineHeight: 22,
      fontWeight: "400",
    },
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: spacing.xxxl,
    },
    loadingText: {
      fontSize: 14,
      color: textColor,
      opacity: textOpacity * 0.7,
      marginTop: spacing.md,
      fontWeight: "500",
    },
  });
};

