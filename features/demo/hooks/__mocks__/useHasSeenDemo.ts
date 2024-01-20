import {
  Callback,
  CallbackWithResult,
} from "@react-native-async-storage/async-storage/lib/typescript/types";

export const mockGetHasSeenDemo = jest.fn<
  Promise<string | null>,
  [CallbackWithResult<string> | undefined]
>();

export const mockSetHasSeenDemo = jest.fn<
  Promise<void>,
  [string, Callback | undefined]
>();

export default function useHasSeenDemo() {
  return {
    getHasSeenDemo: mockGetHasSeenDemo,
    setHasSeenDemo: mockSetHasSeenDemo,
  };
}
