import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { SensorChart } from "../SensorChart/SensorChart";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const CustomChartModal = ({ isOpen, closeModal }) => {
  const allDataInfo = useAllDataInfo();
  // const [chosenSensors, setChosenSensors] = useState([]);
  // const handleAddGroup = () => {};

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Create custom chart</h3>
            <p className="small">Combine multiple sensor data into one chart</p>
          </div>

          <SensorChart />

          <form className="sensor-select">
            {allDataInfo &&
              allDataInfo.map((sensor, i) => (
                <div key={i} className="sensor-option">
                  <input id={i} type="checkbox" />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.title}
                  </label>
                </div>
              ))}
          </form>
          <Button text="Add chart" />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
