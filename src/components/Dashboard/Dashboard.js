import React, { useContext } from "react";

import Modal from "react-modal";
import { SensorGroups } from "../SensorMeasurements/SensorGroups";

import { SensorMeasurements } from "../SensorMeasurements/SensorMeasurements";

import { GroupsContext } from '..//../context/GroupsContext';

import "./dashboard.scss";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

export const Dashboard = () => {
  const { groups } = useContext(GroupsContext);
  return (
    <div className="dashboard">
      <SensorMeasurements />
      <h2 className="title">My Groups</h2>
      {groups.length === 0 && <p>No groups to show</p>}
      {groups &&
      groups.map((group) => (
        <SensorGroups
          groupName={group.groupName}
          group={group}
          key={group.id}
        />  
      ))}
    </div>
  );
};
