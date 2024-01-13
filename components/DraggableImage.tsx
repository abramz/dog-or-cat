import { ReactNode } from "react";
import Image from "./Image";
import { ImageData } from "../types/Image";
import { PanGestureProvider } from "../context/PanGesture";
import PanHandler from "./PanHandler";
import { ScreenSide } from "../types/ScreenSide";

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
