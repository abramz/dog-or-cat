import * as SecureStore from "expo-secure-store";

import { UNSPLASH_ACCESS_KEY_STORAGE_KEY } from "../../../constants";

export default async function retrieveAccessKey(): Promise<string | null> {
  try {
    const result = await SecureStore.getItemAsync(
      UNSPLASH_ACCESS_KEY_STORAGE_KEY,
    );

    // temp var is necessary because we want to actually await here and catch the error
    return result;
  } catch (error) {
    console.log(error);
  }

  // so far the only error I have encountered is being unable to decrypt the key because app version have changed
  // I *hope* this would only happen switching between dev/prod version like it did to me but we will find out.
  // this is *good enough* for the purposes of a toy that no one will ever use but me
  try {
    await SecureStore.deleteItemAsync(UNSPLASH_ACCESS_KEY_STORAGE_KEY);

    return null;
  } catch (error) {
    console.log(error);

    throw new Error("An unknown error occurred fetching the access key");
  }
}
