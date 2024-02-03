import { render, userEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import { useUnsplashAccessKey } from "../../context/UnsplashAccessKey";
import CollectAccessKey from "../CollectAccessKey";

jest.mock("expo-router");
jest.mock("../../context/UnsplashAccessKey");

describe("<CollectAccessKey />", () => {
  const saveKeyMock = jest.fn();

  beforeEach(() => {
    (useUnsplashAccessKey as jest.Mock).mockReturnValue({
      saveKey: saveKeyMock,
    });
    saveKeyMock.mockResolvedValue(undefined);
  });

  it("should save the access key when submitted", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<CollectAccessKey />);

    user.type(getByTestId("input"), "foo", { submitEditing: true });

    await waitFor(() => {
      expect(saveKeyMock).toHaveBeenCalledTimes(1);
      expect(saveKeyMock).toHaveBeenCalledWith("foo");
    });
  });

  it("should go back to the main page when submitted", async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<CollectAccessKey />);

    user.type(getByTestId("input"), "foo", { submitEditing: true });

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith("/");
    });
  });
});
