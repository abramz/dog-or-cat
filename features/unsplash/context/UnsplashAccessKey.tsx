import * as SecureStore from "expo-secure-store";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
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

    try {
      const result = await SecureStore.getItemAsync(
        UNSPLASH_ACCESS_KEY_STORAGE_KEY,
      );
      setAccessKey(result);

      return result;
    } catch {
      // so far the only error I have encountered is being unable to decrypt the key because app version have changed
      // I *hope* this would only happen switching between dev/prod version like it did to me but we will find out.
      // this is *good enough* for the purposes of a toy that no one will ever use but me
      await SecureStore.deleteItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY);

      // retry
      const result = await SecureStore.getItemAsync(
        UNSPLASH_ACCESS_KEY_STORAGE_KEY,
      );
      setAccessKey(result);

      return result;
    }
  }, [accessKey]);

  const saveKey = useCallback(async (value: string) => {
    await SecureStore.setItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY, value);

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
