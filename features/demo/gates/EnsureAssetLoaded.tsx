import { Asset, useAssets } from "expo-asset";
import { ReactNode, useEffect } from "react";

export interface EnsureAssetLoadedProps {
  moduleId: number;
  render: (asset: Asset) => JSX.Element;
}

export default function EnsureAssetLoaded({
  moduleId,
  render,
}: EnsureAssetLoadedProps): ReactNode {
  const [assets, error] = useAssets(moduleId);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  if (!assets) {
    return null;
  }

  return render(assets[0]);
}
