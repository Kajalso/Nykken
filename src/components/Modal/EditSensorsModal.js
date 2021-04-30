import React, { useState } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";


export const EditSensorsModal = ({
  sensorID,
  sensors,
  isOpen,
  saveSensor,
  saveSensorID,
  closeModal,
}) => {
  //Create a copy of the list of sensor IDs in local storage
  const [checklistSensors, setChecklistSensors] = useState(sensorID);
  //Create a copy of the list of sensor objects in local storage
  const [chosenSensors, setChosenSensors] = useState(sensors);
  const allDataInfo = useAllDataInfo();

  //When a sensor is (un)checked
  //This only affect the copied list of sensor IDs and sensor objects
  const handleChange = (currentSensor) => {
    const sensorIdentifier = currentSensor.data_identifier;
    //If the list of sensor ID's contain the current sensor's ID,
    //remove the item from both the list of sensor ID's and the list of sensor objects
    if (checklistSensors.includes(sensorIdentifier)) {
      setChecklistSensors(
        checklistSensors.filter((IDs) => IDs !== sensorIdentifier)
      );
      setChosenSensors(
        chosenSensors.filter(
          (sensor) => sensor.data_identifier !== currentSensor.data_identifier
        )
      );
      console.log("Removing " + currentSensor.title);
    }
    //If the sensor is not in the lists,
    //add the sensor ID to the checklistSensors list and the list of sensor objects
    else {
      setChecklistSensors((checklistSensors) => [
        ...checklistSensors,
        sensorIdentifier,
      ]);
      setChosenSensors((chosenSensors) => [...chosenSensors, currentSensor]);
      console.log("Adding " + currentSensor.title);
    }
  };

  //When the save button is clicked, the local storage lists are updated
  const handleClick = () => {
    console.log("Saving sensors...");
    saveSensor(chosenSensors);
    saveSensorID(checklistSensors);
    console.log("Sensors saved.");
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
                    onChange={e => {handleChange(sensor)}}
                    checked={checklistSensors.includes(sensor.data_identifier)}
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
