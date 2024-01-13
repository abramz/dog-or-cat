import { ReactNode, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import image from "../seed/image.json";
import ImageAttribution from "./ImageAttribution";
import SwipeHelpers from "./SwipeHelpers";
import { ScreenSide } from "../types/ScreenSide";
import ImageStack from "./ImageStack";
import { ImageData } from "../types/Image";

import dogs from "../seed/dogs.json";
import cats from "../seed/cats.json";

const images: ImageData[] = [];
const dogCount = dogs.length;
const catCount = cats.length;
let dogIdx = 0;
let catIdx = 0;
while (dogIdx < dogCount || catIdx < catCount) {
  const random = Math.random();
  if (
    (dogIdx < dogCount && catIdx == catCount) ||
    (dogIdx < dogCount && random < 0.49)
  ) {
    images.push(dogs[dogIdx]);
    dogIdx += 1;
  } else {
    images.push(cats[catIdx]);
    catIdx += 1;
  }
}

export default function Canvas(): ReactNode {
  const [side, setSide] = useState<ScreenSide>(ScreenSide.middle);
  const handleOnComplete = useCallback(() => {
    setSide(ScreenSide.middle);
  }, []);

  return (
    <View style={styles.container}>
      <ImageStack
        images={images}
        onUpdate={setSide}
        onComplete={handleOnComplete}
      />

      <SwipeHelpers side={side} />

      <ImageAttribution image={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
