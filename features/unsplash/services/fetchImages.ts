import { createApi } from "unsplash-js";

import fetchLocalImages from "./fetchLocalImages";
import { SKIP_ACCESS_KEY } from "../../../constants";
import { ImageData } from "../../../types/Image";
import { FetchImagesResult } from "../types/FetchImagesResult";

async function request(query: string, accessKey: string): Promise<ImageData[]> {
  const api = createApi({
    accessKey,
  });
  console.log(`Fetching images for "${query}"`);
  const result = await api.photos.getRandom({
    query,
    orientation: "portrait",
    contentFilter: "high",
    count: 30,
  });

  if (result.errors) {
    console.log(result.errors);

    throw new Error(`an unknown error occurred fetching "${query}"`);
  }

  const data =
    result.response instanceof Array ? result.response : [result.response];

  return data.map(
    (d): ImageData => ({
      id: d.id,
      blurHash: d.blur_hash,
      imageUrl: d.urls.small,
      accountName: d.user.name,
      accountUrl: d.user.links.html,
      altText: d.alt_description ?? undefined,
    }),
  );
}

export default function fetchImages(
  accessKey: string,
): Promise<FetchImagesResult> {
  if (accessKey === SKIP_ACCESS_KEY) {
    return fetchLocalImages();
  }

  return Promise.all([request("dog", accessKey), request("cat", accessKey)]);
}
