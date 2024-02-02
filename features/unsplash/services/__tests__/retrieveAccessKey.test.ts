import { deleteItemAsync, getItemAsync } from "expo-secure-store";

import { UNSPLASH_ACCESS_KEY_STORAGE_KEY } from "../../../../constants";
import retrieveAccessKey from "../retrieveAccessKey";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe("retrieveAccessKey", () => {
  it("should return the access key", async () => {
    (getItemAsync as jest.Mock).mockResolvedValue("foo");

    const result = await retrieveAccessKey();

    expect(getItemAsync).toHaveBeenCalledTimes(1);
    expect(getItemAsync).toHaveBeenCalledWith(UNSPLASH_ACCESS_KEY_STORAGE_KEY);

    expect(result).toEqual("foo");
  });

  it("should return null and clean up if there is an error reading the access key", async () => {
    (getItemAsync as jest.Mock).mockRejectedValue(new Error("boo"));

    const result = await retrieveAccessKey();

    expect(deleteItemAsync).toHaveBeenCalledTimes(1);
    expect(deleteItemAsync).toHaveBeenCalledWith(
      UNSPLASH_ACCESS_KEY_STORAGE_KEY,
    );

    expect(result).toEqual(null);
  });

  it("should throw an error if we can't clean up", async () => {
    (getItemAsync as jest.Mock).mockRejectedValue(new Error("boo"));
    (deleteItemAsync as jest.Mock).mockRejectedValue(new Error("boo"));

    await expect(retrieveAccessKey()).rejects.toThrow();
  });
});
