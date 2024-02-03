import { render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import ChildComponent, {
  TEST_ID,
} from "../../../../__fixtures__/ChildComponent";
import { useUnsplashAccessKey } from "../../context/UnsplashAccessKey";
import EnsureUnsplashAccessKey from "../EnsureUnsplashAccessKey";

jest.mock("expo-router");
jest.mock("../../context/UnsplashAccessKey");

describe("<EnsureUnsplashAccessKey />", () => {
  const retrieveKeyMock = jest.fn();

  beforeEach(() => {
    (useUnsplashAccessKey as jest.Mock).mockReturnValue({
      retrieveKey: retrieveKeyMock,
    });
  });

  it("should hide content when the access key isn't available", () => {
    retrieveKeyMock.mockResolvedValue(null);

    const { queryByTestId } = render(
      <EnsureUnsplashAccessKey>
        <ChildComponent />
      </EnsureUnsplashAccessKey>,
    );

    expect(queryByTestId(TEST_ID)).not.toBeVisible();
    expect(retrieveKeyMock).toHaveBeenCalled();
  });

  it("should show content when the access key is available", async () => {
    retrieveKeyMock.mockResolvedValue("123");

    const { queryByTestId } = render(
      <EnsureUnsplashAccessKey>
        <ChildComponent />
      </EnsureUnsplashAccessKey>,
    );

    await waitFor(() => {
      expect(queryByTestId(TEST_ID)).toBeVisible();
    });
    expect(retrieveKeyMock).toHaveBeenCalled();
  });

  it("should redirect to the collection page if the access key doesn't exist", async () => {
    retrieveKeyMock.mockResolvedValue(null);

    render(
      <EnsureUnsplashAccessKey>
        <ChildComponent />
      </EnsureUnsplashAccessKey>,
    );

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith("/collect");
    });

    expect(retrieveKeyMock).toHaveBeenCalled();
  });
});
