import { render } from "@testing-library/react-native";
import { useFonts } from "expo-font";

import ChildComponent, { TEST_ID } from "../../../__fixtures__/ChildComponent";
import EnsureFontsLoaded from "../EnsureFontsLoaded";

describe("<EnsureFontsLoaded />", () => {
  it("should hide content when fonts aren't loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([false, null]);

    const { queryByTestId } = render(
      <EnsureFontsLoaded>
        <ChildComponent />
      </EnsureFontsLoaded>,
    );

    expect(queryByTestId(TEST_ID)).not.toBeVisible();
  });

  it("should show the content when fonts are loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([true, null]);

    const { queryByTestId } = render(
      <EnsureFontsLoaded>
        <ChildComponent />
      </EnsureFontsLoaded>,
    );

    expect(queryByTestId(TEST_ID)).toBeVisible();
  });

  it("should throw an error if there is an error", () => {
    (useFonts as jest.Mock).mockReturnValue([false, new Error("boo")]);

    expect(() => {
      render(
        <EnsureFontsLoaded>
          <ChildComponent />
        </EnsureFontsLoaded>,
      );
    }).toThrow();
  });
});
