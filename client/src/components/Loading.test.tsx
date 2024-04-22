import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Loading />);
    expect(container).toBeDefined();
  });

  it("displays loading text", () => {
    const { getByText } = render(<Loading />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("displays the correct logo image", () => {
    const { getByAltText } = render(<Loading />);
    const logoImage = getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      expect.stringContaining("TaskManagerLogo.svg")
    );
    expect(logoImage).toHaveAttribute(
      "style",
      expect.stringContaining("height: 50px")
    );
    expect(logoImage).toHaveAttribute(
      "style",
      expect.stringContaining("width: 50px")
    );
  });
});
