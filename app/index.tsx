import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import EnsureHasSeenDemo from "../features/demo/gates/EnsureHasSeenDemo";
import ImageStack from "../features/images/components/ImageStack";
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
              <ImageStack />
            </EnsureSplashScreenHidden>
          </EnsureImagesInitialized>
        </ImagesContextProvider>
      </EnsureUnsplashAccessKey>
    </EnsureHasSeenDemo>
  );
}
