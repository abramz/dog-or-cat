import * as SecureStore from "expo-secure-store";

import {
  SKIP_ACCESS_KEY,
  UNSPLASH_ACCESS_KEY_STORAGE_KEY,
} from "../../../constants";

export default async function saveAccessKey(accessKey: string): Promise<void> {
  if (accessKey === SKIP_ACCESS_KEY) {
    console.log("skipping because it is not a real access key");
    return;
  }

  await SecureStore.setItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY, accessKey);
}
