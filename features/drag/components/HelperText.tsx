import { ReactNode } from "react";
import { Platform, ViewProps } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

export default function HelperText({
  children,
  style = {},
  ...props
}: ViewProps): ReactNode {
  return (
    <Animated.View
      {...props}
      style={style}
      entering={
        Platform.OS === "web"
          ? undefined
          : FadeIn.duration(150).easing(Easing.ease)
      }
      exiting={
        Platform.OS === "web"
          ? undefined
          : FadeOut.duration(150).easing(Easing.ease)
      }
    >
      {children}
    </Animated.View>
  );
}
