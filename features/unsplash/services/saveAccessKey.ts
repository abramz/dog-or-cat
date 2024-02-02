import * as SecureStore from "expo-secure-store";

import { UNSPLASH_ACCESS_KEY_STORAGE_KEY } from "../../../constants";

export default async function saveAccessKey(accessKey: string): Promise<void> {
  await SecureStore.setItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY, accessKey);
}
