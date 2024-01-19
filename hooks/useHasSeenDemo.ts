import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Callback,
  CallbackWithResult,
} from "@react-native-async-storage/async-storage/lib/typescript/types";

export const HAS_SEEN_DEMO_FLAG = "dog-or-cat-has-seen-demo";

export interface UseHasSeenDemoReturnValue {
  getHasSeenDemo: (
    callback?: CallbackWithResult<string>
  ) => Promise<string | null>;
  setHasSeenDemo: (value: string, callback?: Callback) => Promise<void>;
}

export default function useHasSeenDemo() {
  const { getItem, setItem, removeItem } = useAsyncStorage(HAS_SEEN_DEMO_FLAG);

  return { getHasSeenDemo: getItem, setHasSeenDemo: setItem };
}
