import { ImageData } from "../../../types/Image";

export default function randomizeImages(...sets: ImageData[][]): ImageData[] {
  const images: ImageData[] = [];
  const maxLength = sets.reduce(
    (max, current) => Math.max(max, current.length),
    0,
  );

  // interleave all the image sets into 1 array
  for (let i = 0; i < maxLength; i++) {
    sets.forEach((set) => {
      const item = set[i];

      if (item) {
        images.push(item);
      }
    });
  }

  // shuffle the array of images
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }

  return images;
}
