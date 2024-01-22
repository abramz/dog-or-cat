import { render } from "@testing-library/react-native";
import {
  fireGestureHandler,
  getByGestureTestId,
} from "react-native-gesture-handler/jest-utils";

import ChildComponent, {
  TEST_ID,
} from "../../../../__fixtures__/ChildComponent";
import { DEMO_TAP_TO_CONTINUE } from "../../../../constants/strings";
import ContinueDemo from "../ContinueDemo";

describe("<ContinueDemo />", () => {
  it("should render children", () => {
    const { getByTestId } = render(
      <ContinueDemo enabled={false} onComplete={jest.fn()}>
        <ChildComponent />
      </ContinueDemo>,
    );

    expect(getByTestId(TEST_ID)).toBeVisible();
  });

  it("should show the continue text when enabled", () => {
    const { getByText } = render(
      <ContinueDemo enabled onComplete={jest.fn()}>
        <ChildComponent />
      </ContinueDemo>,
    );

    expect(getByText(DEMO_TAP_TO_CONTINUE)).toBeVisible();
  });

  it("should not show the continue text when not enabled", () => {
    const { queryByText } = render(
      <ContinueDemo enabled={false} onComplete={jest.fn()}>
        <ChildComponent />
      </ContinueDemo>,
    );

    expect(queryByText(DEMO_TAP_TO_CONTINUE)).not.toBeVisible();
  });

  it("should call onComplete when enabled and tapped", () => {
    const handleComplete = jest.fn();

    render(
      <ContinueDemo enabled onComplete={handleComplete}>
        <ChildComponent />
      </ContinueDemo>,
    );

    fireGestureHandler(getByGestureTestId("continue-demo"));

    expect(handleComplete).toHaveBeenCalled();
  });

  it("should not call onComplete when not enabled and tapped", () => {
    const handleComplete = jest.fn();

    render(
      <ContinueDemo enabled={false} onComplete={handleComplete}>
        <ChildComponent />
      </ContinueDemo>,
    );

    fireGestureHandler(getByGestureTestId("continue-demo"));

    expect(handleComplete).not.toHaveBeenCalled();
  });
});
