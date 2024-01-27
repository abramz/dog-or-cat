import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import EnsureFontsLoaded from "../components/gates/EnsureFontsLoaded";
import { UnsplashAccessKeyProvider } from "../features/unsplash/context/UnsplashAccessKey";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): ReactNode {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.background}>
      <GestureHandlerRootView style={styles.container}>
        <EnsureFontsLoaded>
          <UnsplashAccessKeyProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="demo" options={{ headerShown: false }} />
                <Stack.Screen name="collect" options={{ headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </UnsplashAccessKeyProvider>
        </EnsureFontsLoaded>
      </GestureHandlerRootView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#b7cece",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, width: "100%", maxWidth: 720 },
});
