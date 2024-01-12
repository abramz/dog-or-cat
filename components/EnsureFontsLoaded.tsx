import { useFonts } from "expo-font";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function EnsureFontsLoaded({
  children,
}: PropsWithChildren): ReactNode {
  const [loaded, error] = useFonts({
    TitanOne: require("../assets/fonts/TitanOne-Regular.ttf"),
    ...FontAwesome5.font,
  });

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!loaded) {
    return null;
  }

  return children;
}
