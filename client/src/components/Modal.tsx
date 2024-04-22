import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  approveText,
  cancelText,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  approveText?: string;
  cancelText: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalActions}>
          <Button
            onClick={onClose}
            color="green"
            fontColor="white"
            borderColor="green"
            hoverColor="black"
            hoverBorderColor="white"
            hoverFontColor="white"
          >
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              onClick={onConfirm}
              color="red"
              fontColor="white"
              borderColor="red"
              hoverColor="black"
              hoverBorderColor="white"
              hoverFontColor="white"
            >
              {approveText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
