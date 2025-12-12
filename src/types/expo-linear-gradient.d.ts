declare module 'expo-linear-gradient' {
  import { View, ViewProps } from 'react-native';
  
  export interface LinearGradientProps extends ViewProps {
    colors: readonly string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: readonly number[];
  }
  
  export const LinearGradient: React.FC<LinearGradientProps>;
}