import { Asset } from "expo-asset";

import imageData from "../../../seed/stockImages.json";
import { FetchImagesResult } from "../types/FetchImagesResult";

export default async function fetchLocalImages(): Promise<FetchImagesResult> {
  try {
    const [
      { localUri: dogUri },
      { localUri: catUri },
      { localUri: rabbituri },
    ] = await Asset.loadAsync([
      require("../../../assets/images/dog.png"),
      require("../../../assets/images/cat.png"),
      require("../../../assets/images/rabbit.png"),
    ]);

    return [
      [{ ...imageData.dog, imageUrl: dogUri! }],
      [{ ...imageData.cat, imageUrl: catUri! }],
      [{ ...imageData.rabbit, imageUrl: rabbituri! }],
    ];
  } catch (error) {
    console.error(error);
    return [];
  }
}
