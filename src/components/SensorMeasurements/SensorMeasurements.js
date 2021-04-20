import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";

import { EditSensorsModal } from "../Modal/EditSensorsModal";

import editIcon from "../../icons/edit.svg";
import "./sensorMeasurements.scss";

export const SensorMeasurements = () => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sensors, setSensors] = useState([]);

  const closeEditModal = () => setEditModalIsOpen(false);

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

      <div className="sensor-grid">
        {sensors.length === 0 && <p>No sensors chosen</p>}
        {sensors &&
          sensors.map((sensor, i) => (
            <SensorChart
              key={i}
              id={sensor.data_identifier}
              dataInfo={sensor}
            />
          ))}
      </div>
    </div>
  );
};
