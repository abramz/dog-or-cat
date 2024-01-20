import { PropsWithChildren, ReactNode, createContext, useContext } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

import { BASE_ELEVATION } from "../../../constants";

export interface PanGestureContext {
  positionX: SharedValue<number>;
  positionY: SharedValue<number>;
  rotation: SharedValue<string>;
  elevation: SharedValue<number>;
}

const Context = createContext<PanGestureContext | undefined>(undefined);

export function PanGestureProvider({ children }: PropsWithChildren): ReactNode {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const rotation = useSharedValue("0deg");
  const elevation = useSharedValue(BASE_ELEVATION);

  return (
    <Context.Provider value={{ positionX, positionY, rotation, elevation }}>
      {children}
    </Context.Provider>
  );
}

export function usePanGesture(): PanGestureContext {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "usePanGesture should be used inside of a PanGestureProvider",
    );
  }

  return context;
}
