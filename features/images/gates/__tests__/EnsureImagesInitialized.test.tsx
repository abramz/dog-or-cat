import { render } from "@testing-library/react-native";

import ChildComponent, {
  TEST_ID,
} from "../../../../__fixtures__/ChildComponent";
import { useImages } from "../../context/Images";
import EnsureImagesInitialized from "../EnsureImagesInitialized";

jest.mock("../../context/Images", () => ({ useImages: jest.fn() }));

describe("<EnsureImagesInitialized />", () => {
  it("should show the loading indicator if there is no current image", () => {
    (useImages as jest.Mock).mockReturnValue({});

    const { queryByTestId } = render(
      <EnsureImagesInitialized>
        <ChildComponent />
      </EnsureImagesInitialized>,
    );

    expect(queryByTestId("loading")).toBeVisible();
    expect(queryByTestId(TEST_ID)).not.toBeVisible();
  });

  it("should show the content if there is a current image", () => {
    (useImages as jest.Mock).mockReturnValue({ currentImage: "foo" });

    const { queryByTestId } = render(
      <EnsureImagesInitialized>
        <ChildComponent />
      </EnsureImagesInitialized>,
    );

    expect(queryByTestId("loading")).not.toBeVisible();
    expect(queryByTestId(TEST_ID)).toBeVisible();
  });
});
