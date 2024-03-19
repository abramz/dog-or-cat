import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ImageData } from "../../../types/Image";
import { useUnsplashAccessKey } from "../../unsplash/context/UnsplashAccessKey";
import fetchImages from "../../unsplash/services/fetchImages";
import randomizeImages from "../services/randomizeImages";

export interface ImagesContext {
  currentImage: ImageData;
  changeImage: () => void;
}

const Context = createContext<ImagesContext | undefined>(undefined);

export function ImagesContextProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<ImageData[]>([]);
  const loadingRef = useRef(false);
  const { accessKey } = useUnsplashAccessKey();

  const changeImage = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex === images.length) {
        return 0;
      }

      return newIndex;
    });
  }, [images]);

  useEffect(() => {
    if (!loadingRef.current && index + 10 > images.length) {
      if (accessKey) {
        loadingRef.current = true;
        fetchImages(accessKey)
          .then((imageSets) => {
            setImages((prevImages) => [
              ...prevImages,
              ...randomizeImages(...imageSets),
            ]);
          })
          .finally(() => {
            loadingRef.current = false;
          });
      }
    }
  }, [index, images, accessKey]);

  return (
    <Context.Provider
      value={{
        currentImage: images[index],
        changeImage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useImages(): ImagesContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useImages should be used within a ImagesContextProvider");
  }

  return context;
}
