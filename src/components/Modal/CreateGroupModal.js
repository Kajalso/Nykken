import React from "react";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import "./modals.scss";

export const CreateGroupModal = () => {
  const allDataInfo = useAllDataInfo();

  return (
    <>
      <div className="modal-title">
        <h3>Create group</h3>
        <p className="small">
          Compare multiple sensor data during the same time frame
        </p>
      </div>

      <div className="sensor-select">
        {allDataInfo &&
          allDataInfo.map((sensor, i) => (
            <div key={i} className="sensor-option">
              <input id={i} type="checkbox" />
              <label for={i} className="checkbox-icon" />
              <label for={i} className="label">
                {sensor.description}
              </label>
            </div>
          ))}
      </div>
      <Button text="Add group" />
    </>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
