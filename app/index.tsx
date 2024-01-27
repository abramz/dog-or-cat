import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import EnsureHasSeenDemo from "../features/demo/gates/EnsureHasSeenDemo";
import Canvas from "../features/drag/components/Canvas";
import { ImagesContextProvider } from "../features/images/context/Images";
import EnsureImagesInitialized from "../features/images/gates/EnsureImagesInitialized";
import EnsureUnsplashAccessKey from "../features/unsplash/gates/EnsureUnsplashAccessKey";

export default function App() {
  return (
    <EnsureHasSeenDemo>
      <EnsureUnsplashAccessKey>
        <ImagesContextProvider>
          <EnsureImagesInitialized>
            <EnsureSplashScreenHidden>
              <Canvas />
            </EnsureSplashScreenHidden>
          </EnsureImagesInitialized>
        </ImagesContextProvider>
      </EnsureUnsplashAccessKey>
    </EnsureHasSeenDemo>
  );
}
