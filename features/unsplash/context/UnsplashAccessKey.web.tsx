import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { UnsplashAccessKeyContext } from "../types/UnsplashAccessKeyContext";

const Context = createContext<UnsplashAccessKeyContext | undefined>(undefined);

export function UnsplashAccessKeyProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [accessKey, setAccessKey] = useState<string | null | undefined>(
    undefined,
  );

  const retrieveKey = useCallback(async () => accessKey, [accessKey]);

  const saveKey = useCallback(async (value: string) => {
    setAccessKey(value);
  }, []);

  return (
    <Context.Provider value={{ accessKey, retrieveKey, saveKey }}>
      {children}
    </Context.Provider>
  );
}

export function useUnsplashAccessKey(): UnsplashAccessKeyContext {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useUnsplashAccessKey should be used within a UnsplashAccessKeyProvider",
    );
  }

  return context;
}
