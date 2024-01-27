import { createApi } from "unsplash-js";

import { ImageData } from "../../../types/Image";

async function request(query: string, accessKey: string): Promise<ImageData[]> {
  const api = createApi({
    accessKey: accessKey as string, // this isn't loaded if the access key is not defined,
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
      altText: d.alt_description ?? "unknown picture",
    }),
  );
}

export default async function fetchImages(
  accessKey: string,
): Promise<ImageData[]> {
  const [dogResults, catResults] = await Promise.all([
    request("dog", accessKey),
    request("cat", accessKey),
  ]);

  const images: ImageData[] = [];
  const dogCount = dogResults.length;
  const catCount = catResults.length;
  let dogIdx = 0;
  let catIdx = 0;
  while (dogIdx < dogCount || catIdx < catCount) {
    const random = Math.random();
    if (
      (dogIdx < dogCount && catIdx === catCount) ||
      (dogIdx < dogCount && random < 0.49)
    ) {
      images.push(dogResults[dogIdx]);
      dogIdx += 1;
    } else {
      images.push(catResults[catIdx]);
      catIdx += 1;
    }
  }

  return images;
}
