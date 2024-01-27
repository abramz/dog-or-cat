import { router } from "expo-router";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import { useUnsplashAccessKey } from "../context/UnsplashAccessKey";

export default function EnsureUnsplashAccessKey({
  children,
}: PropsWithChildren): ReactNode {
  const [showContent, setShowContent] = useState(false);
  const { retrieveKey } = useUnsplashAccessKey();

  useEffect(() => {
    retrieveKey().then((result) => {
      if (result) {
        setShowContent(true);
      } else {
        router.navigate("/collect");
      }
    });
  }, [retrieveKey]);

  if (!showContent) {
    return null;
  }

  return children;
}
