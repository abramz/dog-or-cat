import { StatusBar } from "expo-status-bar";

import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import EnsureHasSeenDemo from "../features/demo/gates/EnsureHasSeenDemo";
import Canvas from "../features/drag/components/Canvas";

export default function App() {
  return (
    <EnsureHasSeenDemo>
      <EnsureSplashScreenHidden>
        <Canvas />

        <StatusBar style="auto" />
      </EnsureSplashScreenHidden>
    </EnsureHasSeenDemo>
  );
}
