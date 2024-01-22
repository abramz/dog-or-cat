import { render } from "@testing-library/react-native";
import { router } from "expo-router";
import { act } from "react-test-renderer";

import ChildComponent from "../../../../__fixtures__/ChildComponent";
import { DEMO_BLOCK_CONTINUE_TIMEOUT } from "../../../../constants";
import EnsureDemoRuntime from "../EnsureDemoRuntime";

jest.mock("expo-router");
jest.mock("../../hooks/useHasSeenDemo");

describe("<EnsureDemoRuntime />", () => {
  const mockRenderFn = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });

    jest.useFakeTimers();
  });

  it("should call render with enabled=false until the timeout", () => {
    mockRenderFn.mockReturnValue(<ChildComponent />);

    render(<EnsureDemoRuntime render={mockRenderFn} />);

    expect(mockRenderFn).toHaveBeenCalledWith(false, expect.any(Function));

    act(() => {
      jest.advanceTimersByTime(DEMO_BLOCK_CONTINUE_TIMEOUT + 150);
    });

    expect(mockRenderFn).toHaveBeenCalledWith(true, expect.any(Function));
  });

  it("should pass a handler to set the demo flag to seen", async () => {
    mockRenderFn.mockReturnValue(<ChildComponent />);

    render(<EnsureDemoRuntime render={mockRenderFn} />);

    const handleComplete = mockRenderFn.mock.calls[0][1];
    expect(handleComplete).toBeInstanceOf(Function);

    await handleComplete();

    expect(
      require("../../hooks/useHasSeenDemo").mockSetHasSeenDemo as jest.Mock,
    ).toHaveBeenCalledTimes(1);
    expect(
      require("../../hooks/useHasSeenDemo").mockSetHasSeenDemo as jest.Mock,
    ).toHaveBeenCalledWith("1");
  });

  it("should pass a handler to go back to the main page", async () => {
    mockRenderFn.mockReturnValue(<ChildComponent />);

    render(<EnsureDemoRuntime render={mockRenderFn} />);

    const handleComplete = mockRenderFn.mock.calls[0][1];
    expect(handleComplete).toBeInstanceOf(Function);

    await handleComplete();

    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith("/");
  });
});
