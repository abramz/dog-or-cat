import { router } from "expo-router";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { DEMO_BLOCK_CONTINUE_TIMEOUT } from "../../../constants";
import useHasSeenDemo from "../hooks/useHasSeenDemo";

export interface EnsureDemoRuntimeProps {
  render: (
    enabled: boolean,
    onDemoComplete: () => Promise<void>,
  ) => JSX.Element;
}

export default function EnsureDemoRuntime({
  render,
}: EnsureDemoRuntimeProps): ReactNode {
  const [allowContinue, setAllowContinue] = useState(false);

  const { setHasSeenDemo } = useHasSeenDemo();

  const handleDemoComplete = useCallback(async () => {
    await setHasSeenDemo("1");
    router.navigate("/");
  }, [setHasSeenDemo]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAllowContinue(true);
    }, DEMO_BLOCK_CONTINUE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return render(allowContinue, handleDemoComplete);
}
