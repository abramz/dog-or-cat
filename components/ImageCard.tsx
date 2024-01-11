import { ReactNode, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Image } from "expo-image";
import { BASE_ELEVATION } from "../constants";
import { ImageData } from "../types/Image";
import { usePanGesture } from "../context/PanGesture";

export interface ImageCardProps {
  image: ImageData;
}

export default function ImageCard({ image }: ImageCardProps): ReactNode {
  const { positionX, positionY, rotation, elevation } = usePanGesture();
  const dimensions = useWindowDimensions();

  const width = useMemo(() => dimensions.width * 0.9, [dimensions.width]);
  const maxHeight = useMemo(() => dimensions.height * 0.8, [dimensions.height]);

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
