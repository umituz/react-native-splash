/**
 * React Native Splash - Public API
 *
 * Ultra minimal splash screen for React Native apps.
 * Just displays icon, app name, and tagline.
 * Parent component controls visibility and timing.
 *
 * Usage:
 *   import { SplashScreen } from '@umituz/react-native-splash';
 *
 *   // In your app:
 *   const [showSplash, setShowSplash] = useState(true);
 *
 *   useEffect(() => {
 *     // Your initialization logic
 *     initializeApp().then(() => setShowSplash(false));
 *   }, []);
 *
 *   if (showSplash) {
 *     return (
 *       <SplashScreen
 *         icon={require('./assets/icon.png')}
 *         appName="My App"
 *         tagline="Your tagline here"
 *       />
 *     );
 *   }
 */

export type { SplashOptions } from "./domain/entities/SplashOptions";
export { SplashScreen, type SplashScreenProps } from "./presentation/components/SplashScreen";
