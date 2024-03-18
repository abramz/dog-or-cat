import { PropsWithChildren, ReactNode, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  withRepeat,
  Easing,
} from "react-native-reanimated";

import { ROTATION_MAX_DEG } from "../../../constants";
import { ScreenSide } from "../../../types/ScreenSide";

export interface SlideProps {
  text: string;
  screenSide: ScreenSide;
  onComplete?: () => void;
}

export default function Slide({
  children,
  text,
  screenSide,
  onComplete,
}: PropsWithChildren<SlideProps>): ReactNode {
  const animated = useSharedValue({
    opacity: 1,
    offset: 0,
    rotation: 0,
  });
  const sharedScreenSide = useSharedValue(screenSide);

  useEffect(() => {
    animated.value = withSequence(
      // fade in
      withTiming(
        { opacity: 1, offset: 0, rotation: 0 },
        { duration: 250, easing: Easing.ease },
      ),
      // drag the dog right a few times
      withRepeat(
        withSpring({
          opacity: 1,
          offset: 200,
          rotation: ROTATION_MAX_DEG,
        }),
        3,
        true,
      ),
      // fade out
      withTiming(
        { opacity: 0, offset: 200, rotation: ROTATION_MAX_DEG },
        { duration: 250, easing: Easing.ease },
        (finished) => {
          "worklet";

          if (onComplete && finished) {
            onComplete();
          }
        },
      ),
    );
  }, [animated, onComplete]);

  const animatedContainer = useAnimatedStyle(() => ({
    opacity: animated.value.opacity,
  }));
  const animatedContent = useAnimatedStyle(() => {
    if (sharedScreenSide.value === ScreenSide.right) {
      return {
        transform: [
          { translateX: animated.value.offset },
          { rotate: `${animated.value.rotation}deg` },
        ],
      };
    } else if (sharedScreenSide.value === ScreenSide.left) {
      return {
        transform: [
          { translateX: -animated.value.offset },
          { rotate: `${-animated.value.rotation}deg` },
        ],
      };
    }

    return {
      transform: [{ translateY: -animated.value.offset }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <Animated.View style={[styles.content, animatedContent]}>
        {children}
      </Animated.View>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    fontFamily: "TitanOne",
    fontSize: 28,
    top: "20%",
    alignSelf: "center",
  },
});
