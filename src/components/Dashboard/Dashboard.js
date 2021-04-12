import React from "react";

import { SensorChart } from "./SensorChart/SensorChart";
import { Button } from "../Button/Button";

import "./dashboard.scss";

export const Dashboard = () => {
  return (
    <>
      <div className="title-buttons">
        <h2 className="title">Sensor measurements</h2>
        <div className="buttons">
          <Button text="Edit dashboard" />
          <Button text="Create section" />
          <Button text="Create custom chart" />
        </div>
      </div>

      <div className="sensor-grid">
        <SensorChart />
      </div>
    </>
  );
};
