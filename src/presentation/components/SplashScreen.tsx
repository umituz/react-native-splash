/**
 * Splash Screen Component
 *
 * Simple splash screen with logo, app name, and loading indicator
 */

import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalization } from "@umituz/react-native-localization";
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
  
  const styles = getStyles(insets, backgroundColor);

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
      {/* Main Content */}
      <View style={styles.content}>
        {renderLogo ? (
          renderLogo()
        ) : (
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              {typeof logo === "string" ? (
                <AtomicIcon name={logo || "Sparkles"} size="xl" color="primary" />
              ) : logo ? (
                logo
              ) : (
                <AtomicIcon name="Sparkles" size="xl" color="primary" />
              )}
            </View>
          </View>
        )}

        {renderContent ? (
          renderContent()
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.appName}>{displayAppName}</Text>
            {displayTagline && <Text style={styles.tagline}>{displayTagline}</Text>}
          </View>
        )}
      </View>

      {/* Loading Indicator */}
      {showLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>{displayLoadingText}</Text>
        </View>
      )}

      {/* Footer */}
      {renderFooter && renderFooter()}
    </View>
  );
};

const getStyles = (
  insets: { top: number; bottom: number },
  backgroundColor?: string,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor || "#6366F1",
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    logoContainer: {
      marginBottom: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    logoBackground: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    textContainer: {
      alignItems: "center",
      marginBottom: 48,
    },
    appName: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      marginBottom: 12,
    },
    tagline: {
      fontSize: 16,
      color: "#FFFFFF",
      textAlign: "center",
      opacity: 0.9,
      maxWidth: 280,
    },
    loadingContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 48,
    },
    loadingText: {
      fontSize: 14,
      color: "#FFFFFF",
      opacity: 0.8,
      marginTop: 16,
    },
  });
};

