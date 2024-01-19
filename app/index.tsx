import { useEffect, useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Canvas from "../components/Canvas";
import HideSplashScreen from "../components/HideSplashScreen";
import useHasSeenDemo from "../hooks/useHasSeenDemo";

export const HAS_SEEN_DEMO_FLAG = "dog-or-cat-has-seen-demo";

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const { getHasSeenDemo } = useHasSeenDemo();

  useEffect(() => {
    getHasSeenDemo().then((result) => {
      if (result) {
        setShowContent(true);
      } else {
        router.replace("/demo");
      }
    });
  }, []);

  if (!showContent) {
    return null;
  }

  return (
    <HideSplashScreen>
      <GestureHandlerRootView style={styles.container}>
        <Canvas />

        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </HideSplashScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
