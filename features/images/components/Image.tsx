import { Image as ExpoImage } from "expo-image";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { UNKNOWN_IMAGE_ALT_TEXT } from "../../../constants/strings";
import { ImageData } from "../../../types/Image";

export interface ImageProps {
  image: ImageData;
}

export default function Image({ image }: ImageProps): ReactNode {
  return (
    <ExpoImage
      style={styles.image}
      placeholder={image.blurHash}
      source={image.imageUrl}
      accessibilityLabel={image.altText ?? UNKNOWN_IMAGE_ALT_TEXT}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    pointerEvents: "none",
  },
});
