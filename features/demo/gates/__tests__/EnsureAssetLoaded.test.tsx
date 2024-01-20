import { render } from "@testing-library/react-native";
import { useAssets } from "expo-asset";

import ChildComponent, {
  TEST_ID,
} from "../../../../__fixtures__/ChildComponent";
import EnsureAssetLoaded from "../EnsureAssetLoaded";

describe("<EnsureAssetLoaded />", () => {
  it("should hide content when the asset isn't loaded", () => {
    (useAssets as jest.Mock).mockReturnValue([null, null]);

    const { queryByTestId } = render(
      <EnsureAssetLoaded moduleId={1} render={() => <ChildComponent />} />,
    );

    expect(queryByTestId(TEST_ID)).not.toBeVisible();
  });

  it("should show the content when the asset is loaded", () => {
    (useAssets as jest.Mock).mockReturnValue([["foo"], null]);

    const { queryByTestId } = render(
      <EnsureAssetLoaded
        moduleId={1}
        render={(asset) => {
          expect(asset).toEqual("foo");

          return <ChildComponent />;
        }}
      />,
    );

    expect(queryByTestId(TEST_ID)).toBeVisible();
  });

  it("should throw an error if there is an error", () => {
    (useAssets as jest.Mock).mockReturnValue([null, new Error("boo")]);

    expect(() => {
      render(
        <EnsureAssetLoaded moduleId={1} render={() => <ChildComponent />} />,
      );
    }).toThrow();
  });
});
