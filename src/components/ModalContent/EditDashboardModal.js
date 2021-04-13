import React from "react";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import "./modals.scss";

export const EditDashboardModal = () => {
  const allDataInfo = useAllDataInfo();

  return (
    <>
      <div className="title">
        <h4>Edit dashboard</h4>
        <p>Select which sensors you want to see on the dashboard</p>
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
