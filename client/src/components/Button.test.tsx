// Button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button"; // Adjust the path as necessary

describe("Button component", () => {
  it("renders correctly", () => {
    const mockOnClick = vi.fn(); // Use vi.fn() to create a mock function
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button>
    );
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("responds to click events", () => {
    const mockOnClick = vi.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me</Button>
    );
    fireEvent.click(getByText("Click me"));
    expect(mockOnClick).toHaveBeenCalledTimes(1); // Check if the function was called exactly once
  });
});
