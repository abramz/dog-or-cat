import { PropsWithChildren, ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, withTiming } from "react-native-reanimated";
import {
  BASE_ELEVATION,
  DRAG_ELEVATION,
  END_THRESHOLD_HORIZONTAL,
  END_THRESHOLD_VERTICAL,
} from "../constants";
import { ScreenSide } from "../types/ScreenSide";
import { PanGestureContext, usePanGesture } from "../context/PanGesture";

export interface PanHandlerProps {
  onUpdate: (side: ScreenSide | undefined) => void;
  onComplete: () => void;
}

export function PanHandlerInternal({
  positionX,
  positionY,
  rotation,
  elevation,
  children,
  onUpdate,
  onComplete,
}: PropsWithChildren<PanHandlerProps & PanGestureContext>): ReactNode {
  const gesture = Gesture.Pan()
    .withTestId("pan-gesture")
    .onStart(() => {
      elevation.value = withTiming(DRAG_ELEVATION, { duration: 100 });
    })
    .onUpdate((e) => {
      positionX.value = e.translationX;
      positionY.value = Math.min(e.translationY, 0);

      const horizontalProgress = e.translationX / END_THRESHOLD_HORIZONTAL;
      const verticalProgress = e.translationY / END_THRESHOLD_VERTICAL;

      if (
        verticalProgress <= -1 &&
        Math.abs(verticalProgress) > Math.abs(horizontalProgress)
      ) {
        runOnJS(onUpdate)(ScreenSide.top);
      } else if (horizontalProgress >= 1) {
        runOnJS(onUpdate)(ScreenSide.right);
      } else if (horizontalProgress <= -1) {
        runOnJS(onUpdate)(ScreenSide.left);
      } else {
        runOnJS(onUpdate)(undefined);
      }

      rotation.value = `${horizontalProgress * 10}deg`;
    })
    .onEnd(() => {
      positionX.value = withTiming(0, { duration: 100 });
      positionY.value = withTiming(0, { duration: 100 });
      rotation.value = withTiming(`0deg`, { duration: 100 });
      elevation.value = withTiming(BASE_ELEVATION, { duration: 100 });

      runOnJS(onComplete)();
    });

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
}

export default function PanHandler({
  children,
  ...props
}: PropsWithChildren<PanHandlerProps>): ReactNode {
  const gestureValues = usePanGesture();

  return (
    <PanHandlerInternal {...props} {...gestureValues}>
      {children}
    </PanHandlerInternal>
  );
}
