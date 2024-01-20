import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import ActionHelpers from "./ActionHelpers";
import ImageAttribution from "./ImageAttribution";
import ImageStack from "./ImageStack";
import { ImagesContextProvider } from "../../images/context/Images";
import useScreenSide from "../hooks/useScreenSide";

export default function Canvas(): ReactNode {
  const { side, setScreenSide, resetScreenSide } = useScreenSide();

  return (
    <ImagesContextProvider>
      <View style={styles.container}>
        <ActionHelpers side={side} />

        <ImageAttribution />

        <ImageStack
          onImageUpdate={setScreenSide}
          onImageComplete={resetScreenSide}
        />
      </View>
    </ImagesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b7cece",
  },
});
