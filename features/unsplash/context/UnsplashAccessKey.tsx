import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { UNSPLASH_ACCESS_KEY_STORAGE_KEY } from "../../../constants";
import { UnsplashAccessKeyContext } from "../types/UnsplashAccessKeyContext";

const Context = createContext<UnsplashAccessKeyContext | undefined>(undefined);

export function UnsplashAccessKeyProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [accessKey, setAccessKey] = useState<string | null | undefined>(
    undefined,
  );

  const retrieveKey = useCallback(async () => {
    if (accessKey) {
      return accessKey;
    }

    const result = await SecureStore.getItemAsync(
      UNSPLASH_ACCESS_KEY_STORAGE_KEY,
    );
    setAccessKey(result);

    return result;
  }, [accessKey]);

  const saveKey = useCallback(async (value: string) => {
    await SecureStore.setItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY, value);

    setAccessKey(value);
  }, []);

  useEffect(() => {
    SecureStore.getItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY).then((result) =>
      setAccessKey(result),
    );
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
