import React from "react";

import Modal from "react-modal";
import { CustomCharts } from "../CustomCharts/CustomCharts";
import { SensorGroups } from "../SensorGroups/SensorGroups";
import { SensorMeasurements } from "../SensorMeasurements/SensorMeasurements";

import "./dashboard.scss";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

export const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <CustomCharts /> */}
      <SensorGroups />
      <SensorMeasurements />
    </div>
  );
};
