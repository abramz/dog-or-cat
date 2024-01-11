import { ReactNode } from "react";
import { ImageData } from "../types/Image";
import { Linking, StyleSheet, Text, View } from "react-native";

export interface ImageAttributionProps {
  image: ImageData;
}

export default function ImageAttribution({
  image,
}: ImageAttributionProps): ReactNode {
  return (
    <View style={styles.container}>
      <Text>{"Photo by "}</Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            `${image.accountUrl}?utm_source=dog-or-cat&utm_medium=referral`
          )
        }
      >
        {image.accountName}
      </Text>
      <Text>{" on "}</Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            "https://unsplash.com/?utm_source=dog-or-cat&utm_medium=referral"
          )
        }
      >
        {"Unsplash"}
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
    zIndex: 1,
  },
  link: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
});
