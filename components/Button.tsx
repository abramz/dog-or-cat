import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export interface ButtonProps {
  onPress: () => void;
  testId: string;
}

const INITIAL_VALUE = {
  opacity: 0.25,
  height: 2,
  radius: 3.84,
  elevation: 5,
};

const PRESSED_VALUE = {
  opacity: 0.18,
  height: 1,
  radius: 1.0,
  elevation: 1,
};

export default function Button({
  children,
  onPress,
  testId,
}: PropsWithChildren<ButtonProps>): ReactNode {
  const pressed = useSharedValue(INITIAL_VALUE);
  const tap = Gesture.Tap()
    .withTestId(testId)
    .onTouchesDown(() => {
      pressed.value = withSpring(PRESSED_VALUE);
    })
    .onTouchesUp(() => {
      pressed.value = withSpring(INITIAL_VALUE);
      runOnJS(onPress)();
    });

  const animated = useAnimatedStyle(() => ({
    boxShadow: `rgba(0, 0, 0, ${pressed.value.opacity}) 0px ${pressed.value.height}px ${pressed.value.radius}px`,
    elevation: pressed.value.elevation,
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.button, animated]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 12,
    cursor: "pointer",
  },
  text: {
    fontSize: 18,
  },
});
