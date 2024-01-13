import { ReactNode } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { useImages } from "../context/Images";

export default function ImageAttribution(): ReactNode {
  const { currentImage } = useImages();

  return (
    <View style={styles.container}>
      <Text>{"Photo by "}</Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            `${currentImage.accountUrl}?utm_source=dog-or-cat&utm_medium=referral`
          )
        }
      >
        {currentImage.accountName}
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
