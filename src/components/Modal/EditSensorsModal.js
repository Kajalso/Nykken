import React, { useState, useEffect } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const EditSensorsModal = ({
  sensors,
  sensorID,
  isOpen,
  saveSensor,
  saveSensorID,
  closeModal,
}) => {
  const [chosenSensors, setChosenSensors] = useState(sensors);
  const allDataInfo = useAllDataInfo();
  const [checklistSensors, setChecklistSensors] = useState(sensorID);

  const handleChange = (currentSensor) => {
    const sensorIdentifier = currentSensor.data_identifier;
    if (checklistSensors.includes(sensorIdentifier)) {
      setChecklistSensors(
        checklistSensors.filter((IDs) => IDs !== sensorIdentifier),
      );
      const newSensors = chosenSensors.filter((sensor) => sensor.data_identifier !== currentSensor.data_identifier);
      setChosenSensors(newSensors);
      console.log("removing name " + sensorIdentifier);
      console.log('chosen sensors unchecked ' + chosenSensors);
    } 
    else {
      setChecklistSensors((checklistSensors) => [...checklistSensors, sensorIdentifier]);
      setChosenSensors((chosenSensors) => [...chosenSensors, currentSensor]);
      console.log("adding name " + currentSensor.data_identifier);
    }
  };

  const handleClick = () => {
    console.log("saving...");
    setChosenSensors(chosenSensors);
    setChecklistSensors(checklistSensors);
    saveSensor(chosenSensors);
    saveSensorID(checklistSensors);
    closeModal();
  };


  return (
    <Modal
      className="modal-background"
      isOpen={isOpen} //console.log(chosenSensors)}
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
                    onChange={e => {handleChange(sensor)}}
                    checked={checklistSensors.includes(sensor.data_identifier)}
                  />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.description}
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
