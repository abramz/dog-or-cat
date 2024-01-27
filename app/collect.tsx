import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import CollectAccessKey from "../features/unsplash/components/CollectAccessKey";

export default function CollectScreen() {
  return (
    <EnsureSplashScreenHidden>
      <CollectAccessKey />
    </EnsureSplashScreenHidden>
  );
}
