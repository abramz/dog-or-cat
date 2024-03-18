import { ReactNode } from "react";

import EnsureSplashScreenHidden from "../components/gates/EnsureSplashScreenHidden";
import Demo from "../features/demo/components/Demo";

export default function DemoScreen(): ReactNode {
  return (
    <EnsureSplashScreenHidden>
      <Demo />
    </EnsureSplashScreenHidden>
  );
}
