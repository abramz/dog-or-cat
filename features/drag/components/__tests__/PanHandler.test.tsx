import { render } from "@testing-library/react-native";
import { View } from "react-native";
import { PanGesture, State } from "react-native-gesture-handler";
import {
  fireGestureHandler,
  getByGestureTestId,
} from "react-native-gesture-handler/jest-utils";
import { SharedValue, useSharedValue } from "react-native-reanimated";

import { BASE_ELEVATION, DRAG_ELEVATION } from "../../../../constants";
import { ScreenSide } from "../../../../types/ScreenSide";
import { PanHandlerInternal, PanHandlerProps } from "../PanHandler";

jest.mock("react-native-reanimated");

type TestProps = PanHandlerProps & {
  positionX: SharedValue<number>;
  positionY: SharedValue<number>;
  rotation: SharedValue<string>;
  elevation: SharedValue<number>;
};

function GestureComponent(props: TestProps) {
  return (
    <View>
      <PanHandlerInternal {...props}>
        <View />
      </PanHandlerInternal>
    </View>
  );
}

describe("<PanHandler />", () => {
  const onUpdateMock = jest.fn();
  const onCompleteMock = jest.fn();

  let positionX: SharedValue<number>;
  let positionY: SharedValue<number>;
  let rotation: SharedValue<string>;
  let elevation: SharedValue<number>;

  let props: TestProps;

  beforeEach(() => {
    jest.useFakeTimers();
    onUpdateMock.mockReset();
    onCompleteMock.mockReset();

    positionX = useSharedValue(0);
    positionY = useSharedValue(0);
    rotation = useSharedValue("0deg");
    elevation = useSharedValue(BASE_ELEVATION);

    props = {
      onUpdate: onUpdateMock,
      onComplete: onCompleteMock,
      positionX,
      positionY,
      rotation,
      elevation,
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should update positionX when the x position changes", () => {
    const sequence = [0, -50, -100, -50, -0, 50, 100];
    render(<GestureComponent {...props} />);

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: 0 },
      ...sequence.map((v) => ({ state: State.ACTIVE, translationX: v })),
      { state: State.END, translationX: 100 },
    ]);

    jest.runAllTimers();

    expect(positionX.values).toEqual([...sequence, 0]);
  });

  it("should update positionY when the Y position changes, clamping <0", () => {
    const matchSequence = [0, -50, -100, -50, -0];
    const clampSequence = [50, 100];
    const sequence = [...matchSequence, ...clampSequence];
    render(<GestureComponent {...props} />);

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationY: 0 },
      ...sequence.map((v) => ({ state: State.ACTIVE, translationY: v })),
      { state: State.END, translationY: 100 },
    ]);

    jest.runAllTimers();

    expect(positionY.values).toEqual([...matchSequence, 0, 0, 0]);
  });

  it("should update the rotation based on progress in the X direction", () => {
    const sequence = [0, -50, -100, -50, -0, 50, 100];
    const rotations = [0, -5, -10, -5, 0, 5, 10].map((v) => `${v}deg`);
    render(<GestureComponent {...props} />);

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN, translationX: 0 },
      ...sequence.map((v) => ({ state: State.ACTIVE, translationX: v })),
      { state: State.END, translationX: 100 },
    ]);

    jest.runAllTimers();

    expect(rotation.values).toEqual([...rotations, "0deg"]);
  });

  it("should update elevation while the gesture is active", () => {
    render(<GestureComponent {...props} />);

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"));

    jest.runAllTimers();

    expect(elevation.values).toEqual([
      BASE_ELEVATION,
      DRAG_ELEVATION,
      BASE_ELEVATION,
    ]);
  });

  it("should call onUpdate with `left` when reaching the left side threshold", () => {
    render(<GestureComponent {...props} />);

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
    render(<GestureComponent {...props} />);

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
    render(<GestureComponent {...props} />);

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
    render(<GestureComponent {...props} />);

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
    render(<GestureComponent {...props} />);

    fireGestureHandler<PanGesture>(getByGestureTestId("pan-gesture"), [
      { state: State.BEGAN },
      { state: State.ACTIVE },
      { state: State.END },
    ]);

    jest.runAllTimers();

    expect(onCompleteMock).toHaveBeenCalledTimes(1);
  });
});
