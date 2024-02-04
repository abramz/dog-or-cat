import { render } from "@testing-library/react-native";

import { BASE_ELEVATION } from "../../../../constants";
import Draggable from "../Draggable";

jest.mock("react-native-reanimated");

describe("<Draggable />", () => {
  it("should animate the shared values", () => {
    const { getByTestId } = render(
      <Draggable onUpdate={jest.fn()} onComplete={jest.fn()} />,
    );

    const image = getByTestId("draggable-view");

    expect(image).toHaveStyle({
      elevation: BASE_ELEVATION,
      transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    });
  });
});
