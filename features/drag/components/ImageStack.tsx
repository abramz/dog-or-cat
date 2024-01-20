import { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import DraggableImage from "./DraggableImage";
import { ScreenSide } from "../../../types/ScreenSide";
import { useImages } from "../../images/context/Images";

export interface ImageStackProps {
  onImageUpdate: (side: ScreenSide) => void;
  onImageComplete: (side: ScreenSide) => void;
}

export default function ImageStack({
  onImageUpdate,
  onImageComplete,
}: ImageStackProps): ReactNode {
  const { currentImage, changeImage } = useImages();
  const handleOnComplete = useCallback(
    (side: ScreenSide) => {
      onImageComplete(side);

      if (side !== ScreenSide.middle) {
        changeImage();
      }
    },
    [changeImage, onImageComplete],
  );

  return (
    <View style={styles.container}>
      <DraggableImage
        key={currentImage.id}
        image={currentImage}
        onUpdate={onImageUpdate}
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
