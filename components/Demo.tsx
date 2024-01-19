import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import useHasSeenDemo from "../hooks/useHasSeenDemo";
import { router } from "expo-router";

export interface DemoProps {
  demoAsset: Asset;
}

export default function Demo({ demoAsset }: DemoProps): ReactNode {
  const { setHasSeenDemo } = useHasSeenDemo();
  const [allowContinue, setAllowContinue] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAllowContinue(true);
    }, 6500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const tap = Gesture.Tap()
    .enabled(allowContinue)
    .runOnJS(true)
    .onTouchesUp(() => {
      setHasSeenDemo(`1`).then(() => {
        router.replace("/");
      });
    });

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        <Image style={styles.image} source={demoAsset} />
        {allowContinue ? (
          <Animated.View entering={FadeIn.duration(500)}>
            <Text style={styles.text}>{"Tap to continue"}</Text>
          </Animated.View>
        ) : (
          <></>
        )}
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
