import React from "react";

import Modal from "react-modal";
import { SensorGroups } from "../SensorMeasurements/SensorGroups";

import { SensorMeasurements } from "../SensorMeasurements/SensorMeasurements";

import "./dashboard.scss";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <SensorGroups />
      <SensorMeasurements />
    </div>
  );
};
