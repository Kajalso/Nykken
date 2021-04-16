import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";

import { EditSensorsModal } from "../Modal/EditSensorsModal";

import editIcon from "../../icons/edit.svg";

export const SensorMeasurements = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sensors, setSensors] = useState([]);

  const closeEditModal = () => setEditModalIsOpen(false);

  const ChosenSensors = () => {
    return (
      <>
        <h4>Sensors chosen:</h4>
        {console.log(sensors)}
        {sensors &&
          sensors.map((sensor) => (
            <p key={sensor.data_identifier}>{sensor.description}</p>
          ))}
      </>
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
      <EditSensorsModal
        sensors={sensors}
        closeModal={closeEditModal}
        isOpen={editModalIsOpen}
        handleSave={(chosenSensors) => setSensors(chosenSensors)}
      />
      {sensors && <ChosenSensors />}

      <div className="sensor-grid">
        {sensors &&
          sensors.map((sensor, i) => (
            <SensorChart id={sensor.data_identifier} dataInfo={sensor} />
          ))}
      </div>
    </div>
  );
};
