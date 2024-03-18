import { router } from "expo-router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import Cat from "./Cat";
import Dog from "./Dog";
import Rabbit from "./Rabbit";
import Slide from "./Slide";
import SwipeLeft from "./SwipeLeft";
import SwipeRight from "./SwipeRight";
import SwipeUp from "./SwipeUp";
import {
  CAT_INSTRUCTIONS,
  DEMO_TAP_TO_CONTINUE,
  DOG_INSTRUCTIONS,
  OTHER_INSTRUCTIONS,
} from "../../../constants/strings";
import { ScreenSide } from "../../../types/ScreenSide";
import useHasSeenDemo from "../hooks/useHasSeenDemo";

export default function Demo(): ReactNode {
  const [showDog, setShowDog] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [showRabbit, setShowRabbit] = useState(false);
  const [allowContinue, setAllowContinue] = useState(false);
  const { setHasSeenDemo } = useHasSeenDemo();

  const handleDogComplete = useCallback(() => {
    "worklet";
    runOnJS(setShowDog)(false);
    runOnJS(setShowCat)(true);
  }, []);

  const handleCatComlete = useCallback(() => {
    "worklet";
    runOnJS(setShowCat)(false);
    runOnJS(setShowRabbit)(true);
  }, []);

  const handleRabbitComplete = useCallback(() => {
    "worklet";
    runOnJS(setShowRabbit)(false);
    runOnJS(setShowDog)(true);
    runOnJS(setAllowContinue)(true);
  }, []);

  const tap = Gesture.Tap()
    .withTestId("continue-demo")
    .runOnJS(true)
    .enabled(allowContinue)
    .onEnd(async () => {
      setHasSeenDemo("1").then(() => router.navigate("/"));
    });

  useEffect(() => {
    setShowDog(true);
  }, []);

  return (
    <GestureDetector gesture={tap}>
      <View style={styles.container}>
        {showDog ? (
          <Slide
            text={DOG_INSTRUCTIONS}
            screenSide={ScreenSide.right}
            onComplete={handleDogComplete}
          >
            <Dog style={[styles.img, styles.dog]} />
            <SwipeRight style={styles.finger} />
          </Slide>
        ) : null}
        {showCat ? (
          <Slide
            text={CAT_INSTRUCTIONS}
            screenSide={ScreenSide.left}
            onComplete={handleCatComlete}
          >
            <Cat style={styles.img} />
            <SwipeLeft style={styles.finger} />
          </Slide>
        ) : null}
        {showRabbit ? (
          <Slide
            text={OTHER_INSTRUCTIONS}
            screenSide={ScreenSide.top}
            onComplete={handleRabbitComplete}
          >
            <Rabbit style={styles.img} />
            <SwipeUp style={[styles.finger, styles.rabbitFinger]} />
          </Slide>
        ) : null}
        {allowContinue ? (
          <Text style={styles.text}>{DEMO_TAP_TO_CONTINUE}</Text>
        ) : null}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#b7cece",
  },
  dog: {
    transform: [{ rotateY: "180deg" }],
  },
  img: {
    maxWidth: 288,
  },
  finger: {
    position: "absolute",
    transform: [{ translateY: 30 }],
    maxWidth: 144,
  },
  rabbitFinger: {
    transform: [{ translateX: 30 }],
  },
  text: {
    position: "absolute",
    bottom: "20%",
    fontFamily: "TitanOne",
    fontSize: 30,
    alignSelf: "center",
  },
});
