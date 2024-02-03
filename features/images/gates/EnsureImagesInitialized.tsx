import { PropsWithChildren, ReactNode } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useImages } from "../context/Images";

export default function EnsureImagesInitialized({
  children,
}: PropsWithChildren): ReactNode {
  const { currentImage } = useImages();

  if (!currentImage) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" testID="loading" />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b7cece",
    justifyContent: "center",
    alignItems: "center",
  },
});
