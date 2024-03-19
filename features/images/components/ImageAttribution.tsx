import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import SimpleMarkdown from "../../../components/SimpleMarkdown";
import { REPLACE_ARTIST, REPLACE_ARTIST_HREF } from "../../../constants";
import { ATTRIBUTION, STOCK_ATTRIBUTION } from "../../../constants/strings";
import { useImages } from "../context/Images";

export default function ImageAttribution(): ReactNode {
  const { currentImage } = useImages();

  return (
    <View style={styles.container}>
      <SimpleMarkdown
        text={(currentImage.stock ? STOCK_ATTRIBUTION : ATTRIBUTION)
          .replace(REPLACE_ARTIST, currentImage.accountName)
          .replace(REPLACE_ARTIST_HREF, currentImage.accountUrl)}
      />
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
