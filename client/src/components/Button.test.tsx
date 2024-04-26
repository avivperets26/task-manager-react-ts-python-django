import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  // Test suite
  it("renders correctly", () => {
    // Test case
    const mockOnClick = vi.fn(); // Mock function
    const { getByText } = render(
      // Render the component
      <Button onClick={mockOnClick}>Click me</Button> // Component with mock function
    );
    expect(getByText("Click me")).toBeInTheDocument(); // Check if the button is rendered
  });

  it("responds to click events", () => {
    // Test case
    const mockOnClick = vi.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button> // Component with mock function
    );
    fireEvent.click(getByText("Click me"));
    expect(mockOnClick).toHaveBeenCalledTimes(1); // Check if the mock function is called
  });
});
