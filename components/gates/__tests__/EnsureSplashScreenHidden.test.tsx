import { render } from "@testing-library/react-native";
import * as SplashScreen from "expo-splash-screen";

import ChildComponent, { TEST_ID } from "../../../__fixtures__/ChildComponent";
import EnsureSplashScreenHidden from "../EnsureSplashScreenHidden";

jest.mock("expo-splash-screen", () => ({ hideAsync: jest.fn() }));

describe("<EnsureSplashScreenHidden />", () => {
  it("should hide the splash screen on mount", () => {
    render(
      <EnsureSplashScreenHidden>
        <ChildComponent />
      </EnsureSplashScreenHidden>,
    );

    expect(SplashScreen.hideAsync as jest.Mock).toHaveBeenCalled();
  });

  it("should render children", () => {
    const { getByTestId } = render(
      <EnsureSplashScreenHidden>
        <ChildComponent />
      </EnsureSplashScreenHidden>,
    );

    expect(getByTestId(TEST_ID)).toBeVisible();
  });
});
