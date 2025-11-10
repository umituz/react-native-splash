/**
 * Splash Screen Component
 *
 * Generic splash screen with animations, gradients, and customizable branding
 */

import React, { useEffect, useRef, useMemo } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "@umituz/react-native-theme";
import { useLocalization } from "@umituz/react-native-localization";
import { useResponsive, AtomicIcon, AtomicText, STATIC_TOKENS, withAlpha } from "@umituz/react-native-design-system";
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
  gradientColors,
  loadingText,
  showLoading = true,
  showProgressBar = true,
  footerText,
  versionText,
  animationDuration = 2000,
  minimumDisplayTime = 1500,
  onReady,
  renderLogo,
  renderContent,
  renderFooter,
  visible = true,
}) => {
  const tokens = useAppDesignTokens();
  const responsive = useResponsive();
  const insets = useSafeAreaInsets();
  const { t } = useLocalization();
  const styles = useMemo(
    () => getStyles(tokens, responsive, insets, backgroundColor, gradientColors),
    [tokens, responsive, insets, backgroundColor, gradientColors],
  );

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  /**
   * Initialize animations
   */
  useEffect(() => {
    if (!visible) return;

    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Call onReady after minimum display time
    const timer = setTimeout(() => {
      if (onReady) {
        onReady();
      }
    }, Math.max(minimumDisplayTime, animationDuration));

    return () => clearTimeout(timer);
  }, [visible, fadeAnim, scaleAnim, slideAnim, minimumDisplayTime, animationDuration, onReady]);

  if (!visible) return null;

  const displayAppName = appName || t("branding.appName", "App Name");
  const displayTagline = tagline || t("branding.tagline", "Your tagline here");
  const displayLoadingText = loadingText || t("general.loading", "Loading...");
  const displayFooterText = footerText || t("branding.poweredBy", "Powered by");
  const displayVersionText = versionText;

  return (
    <View style={styles.container}>
      {/* Background Gradient Effect */}
      {gradientColors && gradientColors.length > 0 ? (
        <View style={[styles.backgroundGradient, { backgroundColor: gradientColors[0] }]} />
      ) : (
        <View style={[styles.backgroundGradient, { backgroundColor: backgroundColor || tokens.colors.primary }]} />
      )}

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {renderLogo ? (
          renderLogo()
        ) : (
          <View style={styles.logoContainer}>
            <Animated.View
              style={[
                styles.logoBackground,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {typeof logo === "string" ? (
                <AtomicIcon name={logo || "Sparkles"} size="xl" color="primary" />
              ) : logo ? (
                logo
              ) : (
                <AtomicIcon name="Sparkles" size="xl" color="primary" />
              )}
            </Animated.View>
          </View>
        )}

        {renderContent ? (
          renderContent()
        ) : (
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <AtomicText style={styles.appName}>{displayAppName}</AtomicText>
            <AtomicText style={styles.tagline}>{displayTagline}</AtomicText>
          </Animated.View>
        )}
      </Animated.View>

      {/* Loading Indicator */}
      {showLoading && (
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {showProgressBar && (
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [{ scaleX: scaleAnim }],
                  },
                ]}
              />
            </View>
          )}
          <AtomicText style={styles.loadingText}>{displayLoadingText}</AtomicText>
        </Animated.View>
      )}

      {/* Footer */}
      {renderFooter ? (
        renderFooter()
      ) : (
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          {displayFooterText && (
            <AtomicText style={styles.footerText}>{displayFooterText}</AtomicText>
          )}
          {displayVersionText && (
            <AtomicText style={styles.versionText}>{displayVersionText}</AtomicText>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const getStyles = (
  tokens: ReturnType<typeof useAppDesignTokens>,
  responsive: ReturnType<typeof useResponsive>,
  insets: { top: number; bottom: number },
  backgroundColor?: string,
  gradientColors?: string[],
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || tokens.colors.primary,
      paddingHorizontal: responsive.horizontalPadding,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    backgroundGradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.9,
    },
    content: {
      flex: 3,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: tokens.spacing.lg,
    },
    logoContainer: {
      marginBottom: tokens.spacing.xxl * 2,
      alignItems: "center",
      justifyContent: "center",
    },
    logoBackground: {
      width: responsive.logoSize,
      height: responsive.logoSize,
      borderRadius: STATIC_TOKENS.borders.radius.full,
      backgroundColor: tokens.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      padding: STATIC_TOKENS.spacing.md,
    },
    textContainer: {
      alignItems: "center",
      marginBottom: tokens.spacing.xxl * 2,
    },
    appName: {
      ...STATIC_TOKENS.typography.headingLarge,
      color: tokens.colors.textInverse,
      textAlign: "center",
      marginBottom: tokens.spacing.md,
      fontSize: responsive.getFontSize(STATIC_TOKENS.typography.headingLarge.fontSize ?? 32),
      fontWeight: STATIC_TOKENS.typography.bold,
    },
    tagline: {
      ...STATIC_TOKENS.typography.bodyLarge,
      color: tokens.colors.textInverse,
      textAlign: "center",
      opacity: 0.9,
      maxWidth: responsive.maxContentWidth,
      fontSize: responsive.getFontSize(STATIC_TOKENS.typography.bodyLarge.fontSize ?? 18),
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: responsive.maxContentWidth,
      alignSelf: "center",
    },
    loadingBar: {
      width: "100%",
      height: 4,
      backgroundColor: withAlpha(tokens.colors.textInverse, 0.3),
      borderRadius: STATIC_TOKENS.borders.radius.xs,
      marginBottom: tokens.spacing.md,
      overflow: "hidden",
    },
    loadingProgress: {
      width: "100%",
      height: "100%",
      backgroundColor: tokens.colors.textInverse,
      borderRadius: STATIC_TOKENS.borders.radius.xs,
    },
    loadingText: {
      ...STATIC_TOKENS.typography.bodyMedium,
      color: tokens.colors.textInverse,
      opacity: 0.8,
      fontSize: responsive.getFontSize(STATIC_TOKENS.typography.bodyMedium.fontSize ?? 16),
    },
    footer: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingBottom: tokens.spacing.md,
    },
    footerText: {
      ...STATIC_TOKENS.typography.caption,
      color: tokens.colors.textInverse,
      opacity: 0.7,
      marginBottom: tokens.spacing.xs,
      fontSize: responsive.getFontSize(STATIC_TOKENS.typography.caption.fontSize ?? 12),
    },
    versionText: {
      ...STATIC_TOKENS.typography.caption,
      color: tokens.colors.textInverse,
      opacity: 0.5,
      fontSize: responsive.getFontSize(STATIC_TOKENS.typography.caption.fontSize ?? 12),
    },
  });

