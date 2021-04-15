import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import { EditSensorsModal } from "../Modal/EditSensorsModal";

import plusIcon from "../../icons/plus.svg";
import editIcon from "../../icons/edit.svg";

export const SensorMeasurements = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const closeEditModal = () => setEditModalIsOpen(false);

  const EditModal = ({ isOpen, closeModal = closeEditModal }) => {
    return (
      <Modal
        className="modal-background"
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <div className="modal">
          <div className="modal-content">
            <EditSensorsModal />
          </div>
          <Button className="close" icon={plusIcon} onClick={closeModal} />
        </div>
      </Modal>
    );
  };

  return (
    <div className="sensor-measurements">
      <h2 className="title">Sensor measurements</h2>
      <Button
        icon={editIcon}
        text="Add/remove sensors"
        onClick={() => setEditModalIsOpen(true)}
        className="small"
      />
      <EditModal isOpen={editModalIsOpen} />

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </div>
  );
};
