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
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCloseCalled).toBe(true);
  });

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
    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirmCalled).toBe(true);
  });
});
