import { ImageData } from "../../../types/Image";

export default function randomizeImages(
  dogImages: ImageData[],
  catImages: ImageData[],
): ImageData[] {
  const images: ImageData[] = [];
  const dogCount = dogImages.length;
  const catCount = catImages.length;
  let dogIdx = 0;
  let catIdx = 0;
  while (dogIdx < dogCount || catIdx < catCount) {
    const random = Math.random();
    if (
      (dogIdx < dogCount && catIdx === catCount) ||
      (dogIdx < dogCount && random < 0.5)
    ) {
      images.push(dogImages[dogIdx]);
      dogIdx += 1;
    } else {
      images.push(catImages[catIdx]);
      catIdx += 1;
    }
  }

  return images;
}
