import { useAssets } from "expo-asset";
import { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HideSplashScreen from "../components/HideSplashScreen";
import Demo from "../components/Demo";

export default function DemoScreen(): ReactNode {
  const [assets, error] = useAssets(
    require("../assets/images/dogorcat_howto.png")
  );

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!assets) {
    return null;
  }

  return (
    <HideSplashScreen>
      <GestureHandlerRootView style={styles.container}>
        <Demo demoAsset={assets[0]} />
      </GestureHandlerRootView>
    </HideSplashScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  text: {
    fontFamily: "TitanOne",
    fontSize: 30,
  },
});
