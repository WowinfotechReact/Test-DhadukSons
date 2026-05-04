import { FC } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface SuccessPopUPAction {
  show: boolean;
  onHide: () => void;
  message: string;
}

const SuccessPopUP: FC<SuccessPopUPAction> = ({ show, onHide, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton />
      <Modal.Body className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="Success"
          style={{ width: "80px", marginBottom: "15px" }}
        />
        <div style={{ fontSize: "20px" }}>{message}</div>
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
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessPopUP;
