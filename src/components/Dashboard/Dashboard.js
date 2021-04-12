import React, { useState } from "react";

import { SensorChart } from "./SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import "./dashboard.scss";

export const Dashboard = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const EditModal = ({ isOpen }) => {
    return (
      <Modal isOpen={isOpen}>
        <h4>Edit dashboard</h4>
        <p>Select which sensors you want to see on the dashboard</p>
        <button onClick={() => setEditModalIsOpen(false)}>Close</button>
      </Modal>
    );
  };

  return (
    <>
      <div className="title-buttons">
        <h2 className="title">Sensor measurements</h2>
        <div className="buttons"></div>
        <EditModal isOpen={editModalIsOpen} />
      </div>

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </>
  );
};
