import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  Callback,
  CallbackWithResult,
} from "@react-native-async-storage/async-storage/lib/typescript/types";

import { HAS_SEEN_DEMO_FLAG } from "../../../constants";

export interface UseHasSeenDemoReturnValue {
  getHasSeenDemo: (
    callback?: CallbackWithResult<string>,
  ) => Promise<string | null>;
  setHasSeenDemo: (value: string, callback?: Callback) => Promise<void>;
}

export default function useHasSeenDemo(): UseHasSeenDemoReturnValue {
  const { getItem, setItem } = useAsyncStorage(HAS_SEEN_DEMO_FLAG);

  return { getHasSeenDemo: getItem, setHasSeenDemo: setItem };
}
