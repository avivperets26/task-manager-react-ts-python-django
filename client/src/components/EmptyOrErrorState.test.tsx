import { render, screen } from "@testing-library/react";
import EmptyOrErrorState from "./EmptyOrErrorState";

describe("EmptyOrErrorState Component", () => {
  it("displays error message when there is an error", () => {
    render(<EmptyOrErrorState error={true} />);
    const errorMessage = screen.getByText(
      "It seems we have a problem to get your tasks"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays empty message when there is no error", () => {
    render(<EmptyOrErrorState error={false} />);
    const emptyMessage = screen.getByText("The list is empty");
    expect(emptyMessage).toBeInTheDocument();
  });
});
