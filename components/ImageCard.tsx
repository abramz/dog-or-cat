import { ReactNode, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Image } from "expo-image";
import { BASE_ELEVATION, HEIGHT_SCALE, WIDTH_SCALE } from "../constants";
import { ImageData } from "../types/Image";
import { PanGestureContext, usePanGesture } from "../context/PanGesture";

export interface ImageCardProps {
  image: ImageData;
}

export function ImageCardInternal({
  image,
  screenWidth,
  screenHeight,
  positionX,
  positionY,
  rotation,
  elevation,
}: {
  screenWidth: number;
  screenHeight: number;
} & ImageCardProps &
  PanGestureContext): ReactNode {
  const width = useMemo(() => screenWidth * WIDTH_SCALE, [screenWidth]);
  const maxHeight = useMemo(() => screenHeight * HEIGHT_SCALE, [screenHeight]);

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
    <Animated.View
      style={[styles.container, { width, maxHeight }, animatedStyle]}
      testID="image-card-container"
    >
      <Image
        style={styles.image}
        placeholder={image.blurHash}
        source={image.imageUrl}
        accessibilityLabel={image.altText}
      />
    </Animated.View>
  );
}

export default function ImageCard(props: ImageCardProps): ReactNode {
  const animationValues = usePanGesture();
  const dimensions = useWindowDimensions();

  return (
    <ImageCardInternal
      screenWidth={dimensions.width}
      screenHeight={dimensions.height}
      {...props}
      {...animationValues}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderRadius: 25,
    elevation: BASE_ELEVATION,
    zIndex: 10,
  },
  image: {
    flex: 1,
    borderRadius: 25,
  },
});
