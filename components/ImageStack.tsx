import { ReactNode, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ImageData } from "../types/Image";
import { ScreenSide } from "../types/ScreenSide";
import DraggableImage from "./DraggableImage";

export interface ImageStackProps {
  images: ImageData[];
  onUpdate: (side: ScreenSide) => void;
  onComplete: (side: ScreenSide) => void;
}

export default function ImageStack({
  images,
  onUpdate,
  onComplete,
}: ImageStackProps): ReactNode {
  const [index, setIndex] = useState(0);
  const handleOnComplete = useCallback(
    (side: ScreenSide) => {
      onComplete(side);

      if (side !== ScreenSide.middle) {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex === images.length) {
            return 0;
          }

          return newIndex;
        });
      }
    },
    [images]
  );

  const currentImage = images[index];

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
