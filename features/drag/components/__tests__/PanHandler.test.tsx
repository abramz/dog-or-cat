import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { PanGesture, State } from "react-native-gesture-handler";
import {
  fireGestureHandler,
  getByGestureTestId,
} from "react-native-gesture-handler/jest-utils";
import { useSharedValue } from "react-native-reanimated";

import { ScreenSide } from "../../../../types/ScreenSide";
import { PanHandlerInternal, PanHandlerProps } from "../PanHandler";

function GestureComponent(props: PanHandlerProps) {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const rotation = useSharedValue("0deg");
  const elevation = useSharedValue(0);

  return (
    <View>
      <PanHandlerInternal
        positionX={positionX}
        positionY={positionY}
        rotation={rotation}
        elevation={elevation}
        {...props}
      >
        <View />
      </PanHandlerInternal>
    </View>
  );
}

describe("<PanHandler />", () => {
  const onUpdateMock = jest.fn();
  const onCompleteMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    onUpdateMock.mockReset();
    onCompleteMock.mockReset();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should call onUpdate with `left` when reaching the left side threshold", () => {
    render(
      <GestureComponent onUpdate={onUpdateMock} onComplete={onCompleteMock} />,
    );

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: 0 },
      { state: State.ACTIVE, translationX: -50 },
      { state: State.ACTIVE, translationX: -100 },
      { state: State.END, translationX: -100 },
    ]);

    jest.runAllTimers();

    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith(ScreenSide.left);
  });

  it("should call onUpdate with `right` when reaching the right side threshold", () => {
    render(
      <GestureComponent onUpdate={onUpdateMock} onComplete={onCompleteMock} />,
    );

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: 0 },
      { state: State.ACTIVE, translationX: 50 },
      { state: State.ACTIVE, translationX: 100 },
      { state: State.END, translationX: 100 },
    ]);

    jest.runAllTimers();

    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith(ScreenSide.right);
  });

  it("should call onUpdate with `top` when reaching the top threshold", () => {
    render(
      <GestureComponent onUpdate={onUpdateMock} onComplete={onCompleteMock} />,
    );

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: 0, translationY: 0 },
      { state: State.ACTIVE, translationX: 0, translationY: -50 },
      { state: State.ACTIVE, translationX: 0, translationY: -100 },
      { state: State.END, translationX: 0, translationY: -100 },
    ]);

    jest.runAllTimers();

    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith(ScreenSide.top);
  });

  it("should call onUpdate with `left` when farther past the left threshold than the top threshold", () => {
    render(
      <GestureComponent onUpdate={onUpdateMock} onComplete={onCompleteMock} />,
    );

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: -0, translationY: 0 },
      { state: State.ACTIVE, translationX: -55, translationY: -50 },
      { state: State.ACTIVE, translationX: -110, translationY: -100 },
      { state: State.END, translationX: -110, translationY: -100 },
    ]);

    jest.runAllTimers();

    expect(onUpdateMock).toHaveBeenCalledTimes(1);
    expect(onUpdateMock).toHaveBeenCalledWith(ScreenSide.left);
  });

  it("should call onComplete when the gesture ends", () => {
    render(
      <GestureComponent onUpdate={onUpdateMock} onComplete={onCompleteMock} />,
    );

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN },
      { state: State.ACTIVE },
      { state: State.END },
    ]);

    jest.runAllTimers();

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
