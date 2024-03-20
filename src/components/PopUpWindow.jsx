import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PopUpWindow({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Please choose seats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You haven't selected any seats. Please choose seats before proceeding.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
