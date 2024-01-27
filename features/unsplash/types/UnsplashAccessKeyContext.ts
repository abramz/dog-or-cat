export interface UnsplashAccessKeyContext {
  accessKey: string | null | undefined;
  retrieveKey: () => Promise<string | null | undefined>;
  saveKey: (value: string) => Promise<void>;
}
