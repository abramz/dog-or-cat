import { ReactNode } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import EnsureFontsLoaded from "../components/EnsureFontsLoaded";
import HideSplashScreen from "../components/HideSplashScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
  const colorScheme = useColorScheme();
  return (
    <EnsureFontsLoaded>
      <HideSplashScreen>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </HideSplashScreen>
    </EnsureFontsLoaded>
  );
}
