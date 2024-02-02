import { fireEvent, render } from "@testing-library/react-native";

import openExternalLink from "../../features/linking/services/openExternalLink";
import SimpleMarkdown from "../SimpleMarkdown";

jest.mock("../../features/linking/services/openExternalLink");

describe("<SimpleMarkdown />", () => {
  it("should return text as is if there are no links", () => {
    const text = "Foo bar baz bot bing bang boot";

    const { getByText } = render(<SimpleMarkdown text={text} />);

    expect(getByText(text)).toBeVisible();
  });

  it("should turn markdown links into actual links", () => {
    const text = "foo [bar|baz] bang [bot|bing] boot";

    const { getByText } = render(<SimpleMarkdown text={text} />);

    expect(getByText("foo bar bang bot boot")).toBeVisible();
  });

  it("should open the links when pressed", () => {
    const text = "foo [bar|baz] bang [bot|bing] boot";

    const { getByText } = render(<SimpleMarkdown text={text} />);

    fireEvent.press(getByText("bar"), {});

    expect(openExternalLink).toHaveBeenCalledWith("baz");
    expect(openExternalLink).not.toHaveBeenCalledWith("bing");
  });
});
