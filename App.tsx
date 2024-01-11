import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Canvas from "./components/Canvas";
import EnsureFontsLoaded from "./components/EnsureFontsLoaded";
import HideSplashScreen from "./components/HideSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <EnsureFontsLoaded>
      <HideSplashScreen>
        <GestureHandlerRootView style={styles.container}>
          <Canvas />

          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </HideSplashScreen>
    </EnsureFontsLoaded>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#b7cece",
  },
});
