import { router } from "expo-router";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import useHasSeenDemo from "../hooks/useHasSeenDemo";

export default function EnsureHasSeenDemo({
  children,
}: PropsWithChildren): ReactNode {
  const [showContent, setShowContent] = useState(false);
  const { getHasSeenDemo } = useHasSeenDemo();

  useEffect(() => {
    getHasSeenDemo().then((result) => {
      if (result) {
        setShowContent(true);
      } else {
        router.navigate("/demo");
      }
    });
  }, [getHasSeenDemo]);

  if (!showContent) {
    return null;
  }

  return children;
}
