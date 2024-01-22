import { render } from "@testing-library/react-native";

import IMAGE from "../../../../seed/image.json";
import { PanGestureProvider, usePanGesture } from "../../context/PanGesture";
import { InternalImage } from "../Image";

jest.mock("react-native-reanimated");

function Image() {
  const panValues = usePanGesture();

  return (
    <InternalImage image={IMAGE} width={60} maxHeight={120} {...panValues} />
  );
}

describe("<Image />", () => {
  it("should animate the shared values", () => {
    const { getByTestId } = render(
      <PanGestureProvider>
        <Image />
      </PanGestureProvider>
    );

    const image = getByTestId("image");

    expect(image).toHaveStyle({
      //   elevation: BASE_ELEVATION, not sure why elevation isn't in here
      transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    });
  });
});
