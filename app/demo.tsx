import { Asset } from "expo-asset";
import { ReactNode } from "react";

import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import Demo from "../features/demo/components/Demo";
import EnsureAssetLoaded from "../features/demo/gates/EnsureAssetLoaded";

export default function DemoScreen(): ReactNode {
  return (
    <EnsureAssetLoaded
      moduleId={require("../assets/videos/dogorcat_howto.webm")}
      render={(asset: Asset) => (
        <EnsureSplashScreenHidden>
          <Demo demoAsset={asset} />
        </EnsureSplashScreenHidden>
      )}
    />
  );
}
