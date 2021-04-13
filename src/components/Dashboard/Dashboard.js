import React, { useState } from "react";

import { SensorChart } from "./SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import "./dashboard.scss";

export const Dashboard = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);
  const [customChartModalIsOpen, setCustomChartModalIsOpen] = useState(false);

  const EditModal = ({ isOpen }) => {
    return (
      <Modal isOpen={isOpen} onRequestClose={() => setEditModalIsOpen(false)}>
        <h4>Edit dashboard</h4>
        <p>Select which sensors you want to see on the dashboard</p>
        <button onClick={() => setEditModalIsOpen(false)}>Close</button>
      </Modal>
    );
  };

  const GroupModal = ({ isOpen }) => {
    return (
      <Modal isOpen={isOpen} onRequestClose={() => setGroupModalIsOpen(false)}>
        <h4>Edit dashboard</h4>
        <p>Select which sensors you want to see on the dashboard</p>
        <button onClick={() => setGroupModalIsOpen(false)}>Close</button>
      </Modal>
    );
  };

  const CustomChartModal = ({ isOpen }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setCustomChartModalIsOpen(false)}
      >
        <h4>Edit dashboard</h4>
        <p>Select which sensors you want to see on the dashboard</p>
        <button onClick={() => setCustomChartModalIsOpen(false)}>Close</button>
      </Modal>
    );
  };

  return (
    <>
      <div className="title-buttons">
        <h2 className="title">Sensor measurements</h2>
        <div className="buttons">
          <Button
            text="Edit dashboard"
            onClick={() => setEditModalIsOpen(true)}
          />
          <Button
            text="Create section"
            onClick={() => setGroupModalIsOpen(true)}
          />
          <Button
            text="Create custom chart"
            onClick={() => setCustomChartModalIsOpen(true)}
          />
        </div>
        <EditModal isOpen={editModalIsOpen} />
        <GroupModal isOpen={groupModalIsOpen} />
        <CustomChartModal isOpen={customChartModalIsOpen} />
      </div>

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </>
  );
};
