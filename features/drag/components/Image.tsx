import { ReactNode, useMemo } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from "react-native-reanimated";

import AnimatedExpoImage from "./AnimatedImage";
import { BASE_ELEVATION, HEIGHT_SCALE, WIDTH_SCALE } from "../../../constants";
import { ImageData } from "../../../types/Image";
import { usePanGesture } from "../context/PanGesture";

export interface ImageProps {
  image: ImageData;
}

export default function Image({ image }: ImageProps): ReactNode {
  const dimensions = useWindowDimensions();
  const width = useMemo(
    () => dimensions.width * WIDTH_SCALE,
    [dimensions.width],
  );
  const maxHeight = useMemo(
    () => dimensions.height * HEIGHT_SCALE,
    [dimensions.height],
  );

  const { positionX, positionY, elevation, rotation } = usePanGesture();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      elevation: elevation.value,
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
        { rotate: rotation.value },
      ],
    };
  });

  return (
    <AnimatedExpoImage
      style={[styles.image, { width, maxHeight }, animatedStyle]}
      placeholder={image.blurHash}
      source={image.imageUrl}
      accessibilityLabel={image.altText}
      entering={
        Platform.OS === "web"
          ? undefined
          : FadeIn.duration(250).easing(Easing.ease)
      }
      exiting={
        Platform.OS === "web"
          ? undefined
          : FadeOut.duration(200).easing(Easing.ease)
      }
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    maxWidth: 720,
    borderRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderStyle: "solid",
    elevation: BASE_ELEVATION,
    zIndex: 10,
  },
});
