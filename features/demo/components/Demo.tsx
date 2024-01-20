import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";

import { DEMO_TAP_TO_CONTINUE } from "../../../constants/strings";
import useHasSeenDemo from "../hooks/useHasSeenDemo";

export interface DemoProps {
  demoAsset: Asset;
}

export default function Demo({ demoAsset }: DemoProps): ReactNode {
  const [allowContinue, setAllowContinue] = useState(false);

  const { setHasSeenDemo } = useHasSeenDemo();

  const handleDemoComplete = useCallback(async () => {
    await setHasSeenDemo("1");
    router.navigate("/");
  }, [setHasSeenDemo]);

  const tap = Gesture.Tap()
    .enabled(allowContinue)
    .runOnJS(true)
    .onTouchesUp(() => {
      handleDemoComplete();
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAllowContinue(true);
    }, 6500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        <Image style={styles.image} source={demoAsset} />
        {allowContinue ? (
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
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#b7cece",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontFamily: "TitanOne",
    fontSize: 30,
  },
});
