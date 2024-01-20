import { ReactNode } from "react";

import Image from "./Image";
import PanHandler from "./PanHandler";
import { ImageData } from "../../../types/Image";
import { ScreenSide } from "../../../types/ScreenSide";
import { PanGestureProvider } from "../context/PanGesture";

export interface DraggableImageProps {
  image: ImageData;
  onUpdate: (side: ScreenSide) => void;
  onComplete: (side: ScreenSide) => void;
}

export default function DraggableImage({
  image,
  onUpdate,
  onComplete,
}: DraggableImageProps): ReactNode {
  return (
    <PanGestureProvider>
      <PanHandler onUpdate={onUpdate} onComplete={onComplete}>
        <Image image={image} />
      </PanHandler>
    </PanGestureProvider>
  );
}
