import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import { EditDashboardModal } from "../ModalContent/EditDashboardModal";

import "./dashboard.scss";

import plusIcon from "../../icons/plus.svg";
import editIcon from "../../icons/edit.svg";

Modal.setAppElement("#root");

export const Dashboard = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const EditModal = ({ isOpen }) => {
    return (
      <Modal
        className="modal-background"
        isOpen={isOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <div className="modal">
          <div className="modal-content">
            <EditDashboardModal />
          </div>
          <Button
            className="close"
            icon={plusIcon}
            onClick={() => setEditModalIsOpen(false)}
          />
        </div>
      </Modal>
    );
  };

  return (
    <div className="dashboard">
      <div className="title-buttons">
        <h2 className="title">Sensor measurements</h2>
        <div className="buttons">
          <Button
            icon={editIcon}
            text="Add/remove sensors"
            onClick={() => setEditModalIsOpen(true)}
            className="small"
          />
        </div>
        <EditModal isOpen={editModalIsOpen} />
      </div>

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </div>
  );
};
