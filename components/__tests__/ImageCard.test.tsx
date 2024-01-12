import { Button, View } from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { fireEvent, render } from "@testing-library/react-native";
import image from "../../seed/image.json";
import { ImageCardInternal } from "../ImageCard";
import { HEIGHT_SCALE, WIDTH_SCALE } from "../../constants";

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 851;

const getExpectedStyle = (value: number) => ({
  elevation: value,
  transform: [
    { translateX: value },
    { translateY: value },
    { rotate: `${value}deg` },
  ],
});

function AnimationComponent() {
  const screenWidth = SCREEN_WIDTH;
  const screenHeight = SCREEN_HEIGHT;
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const rotation = useSharedValue("0deg");
  const elevation = useSharedValue(0);

  return (
    <View>
      <ImageCardInternal
        image={image}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        positionX={positionX}
        positionY={positionY}
        rotation={rotation}
        elevation={elevation}
      />
      <Button
        title="Click me"
        onPress={() => {
          positionX.value = withTiming(100, { duration: 500 });
          positionY.value = withTiming(100, { duration: 500 });
          rotation.value = withTiming("100deg", { duration: 500 });
          elevation.value = withTiming(100, { duration: 500 });
        }}
        testID="trigger"
      />
    </View>
  );
}

describe("<ImageCard />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should scale the image width to the screen size", () => {
    const { getByTestId } = render(<AnimationComponent />);

    const view = getByTestId("image-card-container");

    expect(view).toHaveProp(
      "style",
      expect.objectContaining({
        width: SCREEN_WIDTH * WIDTH_SCALE,
      })
    );
  });

  it("should scale the image max height to the screen size", () => {
    const { getByTestId } = render(<AnimationComponent />);

    const view = getByTestId("image-card-container");

    expect(view).toHaveProp(
      "style",
      expect.objectContaining({
        maxHeight: SCREEN_HEIGHT * HEIGHT_SCALE,
      })
    );
  });

  it("should started with the default animated styles", () => {
    const { getByTestId } = render(<AnimationComponent />);

    const view = getByTestId("image-card-container");

    expect(view).toHaveAnimatedStyle(getExpectedStyle(0));
  });

  it("should animate the styles", () => {
    const { getByTestId } = render(<AnimationComponent />);

    const view = getByTestId("image-card-container");
    const trigger = getByTestId("trigger");

    fireEvent.press(trigger);

    jest.advanceTimersByTime(250);

    expect(view).toHaveAnimatedStyle(getExpectedStyle(50));

    jest.advanceTimersByTime(300);

    expect(view).toHaveAnimatedStyle(getExpectedStyle(100));
  });
});
