import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip component", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <Tooltip title="Sample Tooltip">
        <button>Hover over me</button>
      </Tooltip>
    );
    expect(getByText("Hover over me")).toBeInTheDocument();
  });

  it("shows the correct tooltip text", () => {
    const tooltipText = "Sample Tooltip";
    const { getByText } = render(
      <Tooltip title={tooltipText}>
        <button>Hover over me</button>
      </Tooltip>
    );
    expect(getByText(tooltipText)).toBeInTheDocument();
  });
});
