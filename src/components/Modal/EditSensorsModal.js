import React from "react";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import "./modals.scss";

export const EditSensorsModal = () => {
  const allDataInfo = useAllDataInfo();

  return (
    <>
      <div className="modal-title">
        <h3>Manage sensors</h3>
        <p className="small">
          Select which sensors you want to see on the dashboard
        </p>
      </div>

      <div className="sensor-select">
        {allDataInfo &&
          allDataInfo.map((sensor, i) => (
            <div key={i} className="sensor-option">
              <input id={i} type="checkbox" />
              <label htmlFor={i} className="checkbox-icon" />
              <label htmlFor={i} className="label">
                {sensor.description}
              </label>
            </div>
          ))}
      </div>
      <Button text="Save changes" />
    </>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
