import { createApi } from "unsplash-js";

import { ImageData } from "../../../../types/Image";
import fetchImages from "../fetchImages";

jest.mock("unsplash-js", () => ({ createApi: jest.fn() }));

const MOCK_IMAGE = {
  id: "id",
  blur_hash: "blur_hash",
  alt_description: "alt_description",
  urls: {
    small: "urls.small",
  },
  user: {
    name: "user.name",
    links: {
      html: "user.links.html",
    },
  },
};
const RESULT_IMAGE: ImageData = {
  id: "id",
  blurHash: "blur_hash",
  altText: "alt_description",
  imageUrl: "urls.small",
  accountName: "user.name",
  accountUrl: "user.links.html",
};

describe("fetchImages", () => {
  const getRandom = jest.fn();

  beforeEach(() => {
    (createApi as jest.Mock).mockReturnValue({ photos: { getRandom } });
  });

  it("should initialize the api client with the provided access key", async () => {
    getRandom.mockResolvedValue({ response: [] });

    await fetchImages("foo");

    expect(createApi).toHaveBeenCalledTimes(2);
    expect(createApi).toHaveBeenCalledWith({ accessKey: "foo" });
  });

  it("should return transformed image data for dogs", async () => {
    getRandom.mockResolvedValue({ response: [MOCK_IMAGE] });

    const { dogs } = await fetchImages("foo");

    expect(dogs).toHaveLength(1);
    expect(dogs[0]).toEqual(RESULT_IMAGE);
  });

  it("should return transformed image data for cats", async () => {
    getRandom.mockResolvedValue({ response: [MOCK_IMAGE] });

    const { cats } = await fetchImages("foo");

    expect(cats).toHaveLength(1);
    expect(cats[0]).toEqual(RESULT_IMAGE);
  });

  it("should throw an error if there is one", async () => {
    getRandom.mockRejectedValue(new Error("boo :("));

    await expect(fetchImages("foo")).rejects.toThrow();
  });
});
