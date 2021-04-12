import React from "react";
import Modal from "react-modal";

export const EditModal = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <h4>Edit dashboard</h4>
      <p>Select which sensors you want to see on the dashboard</p>
    </Modal>
  );
};
