import { useCallback, useState } from "react";

import { ScreenSide } from "../../../types/ScreenSide";

export interface UseScreenSideReturnValue {
  side: ScreenSide;
  setScreenSide: (newSide: ScreenSide) => void;
  resetScreenSide: () => void;
}

export default function useScreenSide(): UseScreenSideReturnValue {
  const [side, setScreenSide] = useState<ScreenSide>(ScreenSide.middle);
  const resetScreenSide = useCallback(() => {
    setScreenSide(ScreenSide.middle);
  }, []);

  return {
    side,
    setScreenSide,
    resetScreenSide,
  };
}
