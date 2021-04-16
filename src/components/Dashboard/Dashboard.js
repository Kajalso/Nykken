import React, { useState } from "react";

import { SensorChart } from "../SensorChart/SensorChart";
import { Button } from "../Button/Button";
import Modal from "react-modal";

import { EditSensorsModal } from "../Modal/EditSensorsModal";
import { SensorMeasurements } from "../SensorMeasurements/SensorMeasurements";

import "./dashboard.scss";

import plusIcon from "../../icons/plus.svg";
import editIcon from "../../icons/edit.svg";

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <SensorMeasurements />
    </div>
  );
};
