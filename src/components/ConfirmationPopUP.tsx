import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationPopUPAction {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationPopUP: FC<ConfirmationPopUPAction> = ({
  show,
  onHide,
  message,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header />
      <Modal.Body className="text-center">
        <FaExclamationTriangle
          style={{ fontSize: "40px", color: "#2e7d32", marginBottom: "15px" }}
        />

        <div>{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            borderRadius: "0.375rem",
            padding: "10px 30px",
            whiteSpace: "nowrap",
          }}
          onClick={onHide}
        >
          No
        </button>
        <button
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            borderRadius: "0.375rem",
            padding: "10px 30px",
            whiteSpace: "nowrap",
          }}
          onClick={onConfirm}
        >
          Yes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopUP;
