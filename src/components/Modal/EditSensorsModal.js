import React, { useState, useEffect } from "react";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import "./modals.scss";

export const EditSensorsModal = () => {
  const [chosenSensors, setChosenSensors] = useState([]);
  const allDataInfo = useAllDataInfo();

  const chooseSensor = (currentSensor) => {
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

  const handleSave = () => {
    console.log(chosenSensors);
    console.log("saving...");
  };

  return (
    <>
      <div className="modal-title">
        <h3>Edit sensors</h3>
        <p className="small">
          Select which sensors you want to see on the dashboard
        </p>
      </div>

      <div className="sensor-select">
        {allDataInfo &&
          allDataInfo.map((sensor, i) => (
            <div key={i} className="sensor-option">
              <input
                id={i}
                type="checkbox"
                value={sensor.description}
                onClick={() => chooseSensor(sensor)}
              />
              <label htmlFor={i} className="checkbox-icon" />
              <label htmlFor={i} className="label">
                {sensor.description}
              </label>
            </div>
          ))}
      </div>
      <Button text="Save changes" onClick={handleSave} />
    </>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
