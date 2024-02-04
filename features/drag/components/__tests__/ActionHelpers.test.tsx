import { render } from "@testing-library/react-native";

import {
  ACTION_HELPER_CAT,
  ACTION_HELPER_DOG,
  ACTION_HELPER_INCONCLUSIVE,
} from "../../../../constants/strings";
import { ScreenSide } from "../../../../types/ScreenSide";
import ActionHelpers from "../ActionHelpers";

describe("<ActionHelpers />", () => {
  it("should show nothing if there is no matching side", () => {
    const { queryByText } = render(<ActionHelpers side={ScreenSide.none} />);

    expect(queryByText(ACTION_HELPER_DOG)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_CAT)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_INCONCLUSIVE)).not.toBeVisible();
  });

  it("should show the dog helper when moving to the right", () => {
    const { queryByText } = render(<ActionHelpers side={ScreenSide.right} />);

    expect(queryByText(ACTION_HELPER_DOG)).toBeVisible();
    expect(queryByText(ACTION_HELPER_CAT)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_INCONCLUSIVE)).not.toBeVisible();
  });

  it("should show the cat helper when moving to the left", () => {
    const { queryByText } = render(<ActionHelpers side={ScreenSide.left} />);

    expect(queryByText(ACTION_HELPER_DOG)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_CAT)).toBeVisible();
    expect(queryByText(ACTION_HELPER_INCONCLUSIVE)).not.toBeVisible();
  });

  it("should show the inconclusive helper when moving to up", () => {
    const { queryByText } = render(<ActionHelpers side={ScreenSide.top} />);

    expect(queryByText(ACTION_HELPER_DOG)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_CAT)).not.toBeVisible();
    expect(queryByText(ACTION_HELPER_INCONCLUSIVE)).toBeVisible();
  });
});
