import { PropsWithChildren, ReactNode } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

import { DEMO_TAP_TO_CONTINUE } from "../../../constants/strings";

export interface ContinueDemoProps {
  enabled: boolean;
  onComplete: () => void;
}

export default function ContinueDemo({
  enabled,
  onComplete,
  children,
}: PropsWithChildren<ContinueDemoProps>): ReactNode {
  const tap = Gesture.Tap()
    .withTestId("continue-demo")
    .enabled(enabled)
    .runOnJS(true)
    .onEnd(() => {
      if (enabled) {
        onComplete();
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        {children}
        {enabled ? (
          <Animated.View
            entering={Platform.OS === "web" ? undefined : FadeIn.duration(500)}
          >
            <Text style={styles.text}>{DEMO_TAP_TO_CONTINUE}</Text>
          </Animated.View>
        ) : null}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    fontFamily: "TitanOne",
    fontSize: 30,
  },
});
