import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  beforeEach(() => {
    // Setup a div with the same ID as the portal div.
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });
  afterEach(() => {
    // Cleanup the document body
    document.body.innerHTML = "";
  });
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
  it("calls onClose when the close button is clicked", async () => {
    let onCloseCalled = false;
    const onClose = () => {
      onCloseCalled = true;
    };
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
    expect(onCloseCalled).toBe(true);
  });

  // Test 3: Confirm action
  it("calls onConfirm when the confirm button is clicked", async () => {
    let onConfirmCalled = false;
    const onConfirm = () => {
      onConfirmCalled = true;
    };
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
    expect(onConfirmCalled).toBe(true);
  });
});
