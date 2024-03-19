import { ImageSource } from "expo-image";

export interface ImageData {
  id: string;
  blurHash: string | null;
  imageUrl: string | ImageSource;
  accountName: string;
  accountUrl: string;
  altText?: string;
  stock?: boolean;
}
