import seed from "../../../../seed/image.json";
import { ImageData } from "../../../../types/Image";
import randomizeImages from "../randomizeImages";

function makeImageData(id: string): ImageData {
  return {
    ...seed,
    id,
  };
}

describe("randomizeImages", () => {
  it("should return the same number of images as it got", () => {
    const result = randomizeImages(
      [makeImageData("dog")],
      [makeImageData("cat")],
    );

    expect(result).toHaveLength(2);
  });

  it("should push a dog image when the PRNG returns a number <.5", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.4999999999999999);

    const result = randomizeImages(
      [makeImageData("dog")],
      [makeImageData("cat")],
    );

    expect(result[0]).toHaveProperty("id", "dog");
  });

  it("should push a dog image when the PRNG returns a number >=.5", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    const result = randomizeImages(
      [makeImageData("dog")],
      [makeImageData("cat")],
    );

    expect(result[0]).toHaveProperty("id", "cat");
  });

  it("should add remaining dogs to the end when the cats set is used up", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    const result = randomizeImages(
      [makeImageData("dog")],
      [makeImageData("cat1"), makeImageData("cat2")],
    );

    expect(result[2]).toHaveProperty("id", "dog");
  });

  it("should add remaining cats to the end when the dogs set is used up", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.4999999999999999);

    const result = randomizeImages(
      [makeImageData("dog1"), makeImageData("dog2")],
      [makeImageData("cat")],
    );

    expect(result[2]).toHaveProperty("id", "cat");
  });
});
