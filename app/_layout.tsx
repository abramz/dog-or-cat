import { ReactNode } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import EnsureFontsLoaded from "../components/EnsureFontsLoaded";

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
    <View style={styles.container}>
      <EnsureFontsLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="demo" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </EnsureFontsLoaded>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#b7cece" },
});
