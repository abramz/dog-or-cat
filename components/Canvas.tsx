import { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import image from "../seed/image.json";
import ImageCard from "./ImageCard";
import ImageAttribution from "./ImageAttribution";
import SwipeHelpers from "./SwipeHelpers";
import { ScreenSide } from "../types/ScreenSide";
import PanHandler from "./PanHandler";
import { PanGestureProvider } from "../context/PanGesture";

export default function Canvas(): ReactNode {
  const [side, setSide] = useState<ScreenSide | undefined>(undefined);

  return (
    <View style={styles.container}>
      <PanGestureProvider>
        <PanHandler
          onUpdate={setSide}
          onComplete={() => {
            setSide(undefined);
          }}
        >
          <ImageCard image={image} />
        </PanHandler>
      </PanGestureProvider>

      <SwipeHelpers side={side} />

      <ImageAttribution image={image} />
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
