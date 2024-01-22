import { Asset } from "expo-asset";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import ContinueDemo from "./ContinueDemo";
import EnsureDemoRuntime from "../gates/EnsureDemoRuntime";

export interface DemoProps {
  demoAsset: Asset;
}

export default function Demo({ demoAsset }: DemoProps): ReactNode {
  return (
    <View style={styles.container}>
      <EnsureDemoRuntime
        render={(enabled, onDemoComplete) => (
          <ContinueDemo enabled={enabled} onComplete={onDemoComplete}>
            <Image style={styles.image} source={demoAsset} />
          </ContinueDemo>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#b7cece",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
