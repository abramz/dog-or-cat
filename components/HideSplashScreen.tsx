import { PropsWithChildren, ReactNode, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function HideSplashScreen({
  children,
}: PropsWithChildren): ReactNode {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return children;
}
