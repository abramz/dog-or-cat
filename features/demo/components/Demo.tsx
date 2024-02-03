import { Asset } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
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
            <Video
              style={styles.demo}
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
  demo: {
    width: 500,
    height: "100%",
  },
});
