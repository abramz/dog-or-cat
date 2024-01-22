import { render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import ChildComponent, {
  TEST_ID,
} from "../../../../__fixtures__/ChildComponent";
import EnsureHasSeenDemo from "../EnsureHasSeenDemo";

jest.mock("../../hooks/useHasSeenDemo");

describe("<EnsureHasSeenDemo />", () => {
  it("should hide content by default", () => {
    (
      require("../../hooks/useHasSeenDemo").mockGetHasSeenDemo as jest.Mock
    ).mockResolvedValue(false);

    const { queryByTestId } = render(
      <EnsureHasSeenDemo>
        <ChildComponent />
      </EnsureHasSeenDemo>,
    );

    expect(queryByTestId(TEST_ID)).not.toBeVisible();
  });

  it("should navigate to /demo when we haven't seen the demo", async () => {
    (
      require("../../hooks/useHasSeenDemo").mockGetHasSeenDemo as jest.Mock
    ).mockResolvedValue(false);

    render(
      <EnsureHasSeenDemo>
        <ChildComponent />
      </EnsureHasSeenDemo>,
    );

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledWith("/demo");
    });
  });

  it("should show content if we have seen the demo", async () => {
    (
      require("../../hooks/useHasSeenDemo").mockGetHasSeenDemo as jest.Mock
    ).mockResolvedValue(true);

    const { queryByTestId } = render(
      <EnsureHasSeenDemo>
        <ChildComponent />
      </EnsureHasSeenDemo>,
    );

    await waitFor(() => {
      expect(queryByTestId(TEST_ID)).toBeVisible();
    });
  });
});
