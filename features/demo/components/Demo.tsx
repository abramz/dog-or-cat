import { Asset } from "expo-asset";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import ContinueDemo from "./ContinueDemo";
import EnsureDemoRuntime from "../gates/EnsureDemoRuntime";
import { ResizeMode, Video } from "expo-av";

export interface DemoProps {
  demoAsset: Asset;
}

export default function Demo({ demoAsset }: DemoProps): ReactNode {
  return (
    <View style={styles.container}>
      <EnsureDemoRuntime
        render={(enabled, onDemoComplete) => (
          <ContinueDemo enabled={enabled} onComplete={onDemoComplete}>
            {/* <Image style={styles.image} source={demoAsset} /> */}
            <Video
              style={styles.image}
              source={demoAsset}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              isMuted
            />
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
    width: 500,
    height: "100%",
  },
});
