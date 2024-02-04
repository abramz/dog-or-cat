import { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import Image from "./Image";
import ImageAttribution from "./ImageAttribution";
import { ScreenSide } from "../../../types/ScreenSide";
import ActionHelpers from "../../drag/components/ActionHelpers";
import Draggable from "../../drag/components/Draggable";
import useScreenSide from "../../drag/hooks/useScreenSide";
import { useImages } from "../context/Images";

export default function ImageStack(): ReactNode {
  const { side, setScreenSide, resetScreenSide } = useScreenSide();
  const { currentImage, changeImage } = useImages();
  const handleOnComplete = useCallback(
    (side: ScreenSide) => {
      resetScreenSide();

      if (side !== ScreenSide.none) {
        changeImage();
      }
    },
    [changeImage, resetScreenSide],
  );

  return (
    <View style={styles.container}>
      <ActionHelpers side={side} />

      <ImageAttribution />

      <View style={styles.images}>
        <Draggable
          key={currentImage.id}
          onUpdate={setScreenSide}
          onComplete={handleOnComplete}
        >
          <Image image={currentImage} />
        </Draggable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b7cece",
  },
  images: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
