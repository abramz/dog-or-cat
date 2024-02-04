import { PropsWithChildren, ReactNode, useMemo } from "react";
import { Platform, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import PanHandler from "./PanHandler";
import { BASE_ELEVATION, HEIGHT_SCALE, WIDTH_SCALE } from "../../../constants";
import { ScreenSide } from "../../../types/ScreenSide";
import { PanGestureProvider, usePanGesture } from "../context/PanGesture";

export interface DraggableProps {
  onUpdate: (side: ScreenSide) => void;
  onComplete: (side: ScreenSide) => void;
}

export function DraggableView({ children }: PropsWithChildren): ReactNode {
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
    <Animated.View
      style={[styles.container, { width, maxHeight }, animatedStyle]}
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
      testID="draggable-view"
    >
      {children}
    </Animated.View>
  );
}

export default function Draggable({
  children,
  onUpdate,
  onComplete,
}: PropsWithChildren<DraggableProps>): ReactNode {
  return (
    <PanGestureProvider>
      <PanHandler onUpdate={onUpdate} onComplete={onComplete}>
        <DraggableView>{children}</DraggableView>
      </PanHandler>
    </PanGestureProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    maxWidth: 720,
    borderRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderStyle: "solid",
    elevation: BASE_ELEVATION,
    zIndex: 10,
    overflow: "hidden",
  },
});
