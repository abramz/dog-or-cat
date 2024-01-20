import * as SplashScreen from "expo-splash-screen";
import { PropsWithChildren, ReactNode, useEffect } from "react";

export default function EnsureSplashScreenHidden({
  children,
}: PropsWithChildren): ReactNode {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return children;
}
