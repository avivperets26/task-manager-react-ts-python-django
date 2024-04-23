import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  // Test 1: Renders correctly
  it("renders correctly when open", () => {
    const { getByText } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        cancelText="Cancel"
        approveText="Confirm"
      >
        <div>Test content</div>
      </Modal>
    );
    expect(getByText("Test content")).toBeInTheDocument();
  });

  // Test 2: Close action
  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
        onConfirm={() => {}}
        cancelText="Cancel"
        approveText="Confirm"
      >
        <div>Test content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText("Cancel")); // Ensure this matches the text or label of your close button
    expect(onClose).toHaveBeenCalled();
  });

  // Test 3: Confirm action
  it("calls onConfirm when the confirm button is clicked", () => {
    const onConfirm = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        onConfirm={onConfirm}
        cancelText="Cancel"
        approveText="Confirm"
      >
        <div>Test content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText("Confirm")); // Ensure this matches the text or label of your confirm button
    expect(onConfirm).toHaveBeenCalled();
  });
});
