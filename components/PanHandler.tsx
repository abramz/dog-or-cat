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
import { usePanGesture } from "../context/PanGesture";

export interface PanHandlerProps {
  onUpdate: (side: ScreenSide | undefined) => void;
  onComplete: () => void;
}

export default function PanHandler({
  children,
  onUpdate,
  onComplete,
}: PropsWithChildren<PanHandlerProps>): ReactNode {
  const { positionX, positionY, rotation, elevation } = usePanGesture();
  const gesture = Gesture.Pan()
    .withTestId("pan-gesture")
    .onStart(() => {
      elevation.value = withTiming(DRAG_ELEVATION, { duration: 100 });
    })
    .onUpdate((e) => {
      positionX.value = e.translationX;
      positionY.value = Math.min(e.translationY, 0);
      let horizontalProgress = 0;
      if (e.translationX >= 0) {
        horizontalProgress = Math.min(
          e.translationX / END_THRESHOLD_HORIZONTAL,
          1
        );
      } else {
        horizontalProgress = Math.max(
          e.translationX / END_THRESHOLD_HORIZONTAL,
          -1
        );
      }
      const verticalProgress = Math.max(
        e.translationY / END_THRESHOLD_VERTICAL,
        -1
      );

      if (verticalProgress === -1) {
        runOnJS(onUpdate)(ScreenSide.top);
      } else if (horizontalProgress === 1) {
        runOnJS(onUpdate)(ScreenSide.right);
      } else if (horizontalProgress === -1) {
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
