/**
 * Use Splash Hook
 * Single Responsibility: Manage splash screen state and timing
 */

import { useEffect, useState, useRef } from "react";

interface UseSplashOptions {
  minimumDisplayTime?: number;
  onReady?: () => void | Promise<void>;
  autoHide?: boolean;
}

export const useSplash = ({
  minimumDisplayTime = 1500,
  onReady,
  autoHide = true,
}: UseSplashOptions = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const isReadyRef = useRef(false);

  const hide = () => {
    setIsVisible(false);
  };

  const show = () => {
    setIsVisible(true);
  };

  const markReady = async () => {
    if (isReadyRef.current) return;

    isReadyRef.current = true;
    setIsReady(true);

    if (onReady) {
      try {
        await onReady();
      } catch (error) {
        if (__DEV__) {
          console.error("Splash onReady error:", error);
        }
      }
    }

    if (autoHide) {
      timerRef.current = setTimeout(() => {
        hide();
      }, minimumDisplayTime);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    isVisible,
    isReady,
    hide,
    show,
    markReady,
  };
};