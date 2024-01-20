import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import cats from "../../../seed/cats.json";
import dogs from "../../../seed/dogs.json";
import { ImageData } from "../../../types/Image";

const images: ImageData[] = [];
const dogCount = dogs.length;
const catCount = cats.length;
let dogIdx = 0;
let catIdx = 0;
while (dogIdx < dogCount || catIdx < catCount) {
  const random = Math.random();
  if (
    (dogIdx < dogCount && catIdx === catCount) ||
    (dogIdx < dogCount && random < 0.49)
  ) {
    images.push(dogs[dogIdx]);
    dogIdx += 1;
  } else {
    images.push(cats[catIdx]);
    catIdx += 1;
  }
}

export interface ImagesContext {
  currentImage: ImageData;
  changeImage: () => void;
}

const Context = createContext<ImagesContext | undefined>(undefined);

export function ImagesContextProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [index, setIndex] = useState(0);
  const changeImage = useCallback(() => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex === images.length) {
        return 0;
      }

      return newIndex;
    });
  }, []);

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
