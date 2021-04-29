import React from "react";

import Modal from "react-modal";
import { SensorGroups } from "../SensorMeasurements/SensorGroups";

import { SensorMeasurements } from "../SensorMeasurements/SensorMeasurements";

import "./dashboard.scss";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

const groupsAmount = JSON.parse(localStorage.getItem('Groups')) ? JSON.parse(localStorage.getItem('Groups')) : 0;

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <SensorMeasurements />
      <h2 className="title">My Groups</h2>
      {groupsAmount.length === 0 && <p>No groups to show</p>}
      {groupsAmount &&
      groupsAmount.map((group) => (
        <SensorGroups
          group={group}
        />  
      ))}
    </div>
  );
};
