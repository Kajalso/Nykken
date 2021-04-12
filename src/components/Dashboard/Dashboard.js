import React from "react";

import { SensorChart } from "./SensorChart/SensorChart";
import { Button } from "../Button/Button";

export const Dashboard = () => {
  return (
    <>
      <h1>Sensor measurements</h1>
      <Button text="Edit dashboard" />
      <div className="sensor-grid">
        <SensorChart />
      </div>
    </>
  );
};
