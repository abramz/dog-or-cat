import { ReactNode, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenSide } from "../types/ScreenSide";
import { ImagesContextProvider } from "../context/Images";
import ImageStack from "./ImageStack";
import ImageAttribution from "./ImageAttribution";
import SwipeHelpers from "./SwipeHelpers";

export default function Canvas(): ReactNode {
  const [side, setSide] = useState<ScreenSide>(ScreenSide.middle);
  const handleOnComplete = useCallback(() => {
    setSide(ScreenSide.middle);
  }, []);

  return (
    <View style={styles.container}>
      <ImagesContextProvider>
        <ImageStack onUpdate={setSide} onComplete={handleOnComplete} />

        <SwipeHelpers side={side} />

        <ImageAttribution />
      </ImagesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
