import { ReactNode } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

import {
  ATTRIBUTION_ON,
  ATTRIBUTION_PHOTO_BY,
  ATTRIBUTION_UNSPLASH,
} from "../../../constants/strings";
import { useImages } from "../../images/context/Images";

export default function ImageAttribution(): ReactNode {
  const { currentImage } = useImages();

  return (
    <View style={styles.container}>
      <Text>{ATTRIBUTION_PHOTO_BY}</Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            `${currentImage.accountUrl}?utm_source=dog-or-cat&utm_medium=referral`,
          )
        }
      >
        {currentImage.accountName}
      </Text>
      <Text>{ATTRIBUTION_ON}</Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            "https://unsplash.com/?utm_source=dog-or-cat&utm_medium=referral",
          )
        }
      >
        {ATTRIBUTION_UNSPLASH}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  link: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
