import { ReactNode, useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function HelperText({
  children,
  style = {},
  ...props
}: ViewProps): ReactNode {
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 150, easing: Easing.linear });

    return () => {
      opacity.value = 0;
    };
  }, []);

  return (
    <Animated.View {...props} style={[style, animatedStyles]}>
      {children}
    </Animated.View>
  );
}
