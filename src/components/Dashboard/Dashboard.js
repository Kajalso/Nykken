import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import { EditDashboardModal } from "../ModalContent/EditDashboardModal";
import { CreateGroupModal } from "../ModalContent/CreateGroupModal";

import "./dashboard.scss";

import plusIcon from "../../icons/plus_icon.svg";
import editIcon from "../../icons/edit_icon.svg";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

export const Dashboard = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);

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

  const GroupModal = ({ isOpen }) => {
    return (
      <Modal
        className="modal-background"
        isOpen={isOpen}
        onRequestClose={() => setGroupModalIsOpen(false)}
      >
        <div className="modal">
          <div className="modal-content">
            <CreateGroupModal />
          </div>
          <Button
            className="close"
            icon={plusIcon}
            onClick={() => setGroupModalIsOpen(false)}
          />
        </div>
      </Modal>
    );
  };

  return (
    <>
      <div className="title-buttons">
        <h2 className="title">Sensor measurements</h2>
        <div className="buttons">
          <Button
            icon={editIcon}
            text="Edit dashboard"
            onClick={() => setEditModalIsOpen(true)}
          />
          <Button
            icon={plusIcon}
            text="Create group"
            onClick={() => setGroupModalIsOpen(true)}
          />
          <Button icon={plusIcon} text="Create custom chart" />
        </div>
        <EditModal isOpen={editModalIsOpen} />
        <GroupModal isOpen={groupModalIsOpen} />
      </div>

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </>
  );
};
