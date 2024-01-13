import { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenSide } from "../types/ScreenSide";
import { useImages } from "../context/Images";
import DraggableImage from "./DraggableImage";

export interface ImageStackProps {
  onUpdate: (side: ScreenSide) => void;
  onComplete: (side: ScreenSide) => void;
}

export default function ImageStack({
  onUpdate,
  onComplete,
}: ImageStackProps): ReactNode {
  const { currentImage, changeImage } = useImages();
  const handleOnComplete = useCallback(
    (side: ScreenSide) => {
      onComplete(side);

      if (side !== ScreenSide.middle) {
        changeImage();
      }
    },
    [changeImage, onComplete]
  );

  return (
    <View style={styles.container}>
      <DraggableImage
        key={currentImage.id}
        image={currentImage}
        onUpdate={onUpdate}
        onComplete={handleOnComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
