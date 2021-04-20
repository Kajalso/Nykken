import React, { useState, useEffect } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const EditSensorsModal = ({
  sensors,
  isOpen,
  handleSave,
  closeModal,
}) => {
  const [chosenSensors, setChosenSensors] = useState(sensors);
  const allDataInfo = useAllDataInfo();

  const handleChange = (currentSensor) => {
    if (chosenSensors.includes(currentSensor)) {
      setChosenSensors(
        chosenSensors.filter((sensor) => sensor !== currentSensor)
      );
      console.log("removing " + currentSensor.description);
    } else {
      setChosenSensors((chosenSensors) => [...chosenSensors, currentSensor]);
      console.log("adding " + currentSensor.description);
    }
  };

  const handleClick = () => {
    console.log("saving...");
    handleSave(chosenSensors);
    closeModal();
  };

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Edit sensors</h3>
            <p className="small">
              Select which sensors you want to see on the dashboard
            </p>
          </div>

          <form className="sensor-select">
            {allDataInfo &&
              allDataInfo.map((sensor, i) => (
                <div key={i} className="sensor-option">
                  <input
                    id={i}
                    type="checkbox"
                    value={sensor.description}
                    onChange={() => handleChange(sensor)}
                    checked={chosenSensors.includes(sensor)}
                  />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.title}
                  </label>
                </div>
              ))}
          </form>
          <Button text="Save changes" onClick={handleClick} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
