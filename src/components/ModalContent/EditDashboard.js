import React from "react";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import "./modals.scss";

export const EditDashboard = () => {
  const allDataInfo = useAllDataInfo();

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <h4>Edit dashboard</h4>
          <p>Select which sensors you want to see on the dashboard</p>
        </div>

        <div className="sensor-select">
          {allDataInfo.map((sensor, i) => (
            <div key={i} className="sensor-option">
              <input id={i} type="checkbox" />
              <div className="checkbox-icon" />
              <label for={i}>{sensor.description}</label>
            </div>
          ))}
        </div>
        <Button text="Save changes" />
      </div>
    </div>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
