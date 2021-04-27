import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { SensorChart } from "../SensorChart/SensorChart";

import { useAllDataInfo } from "../../api/useAllDataInfo";
import { useDataInfo } from "../../api/useDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const CustomChartModal = ({ isOpen, closeModal }) => {
  const allDataInfo = useAllDataInfo();
  const dataInfo = useDataInfo(1);
  // const [chosenSensors, setChosenSensors] = useState([]);
  // const handleAddGroup = () => {};

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal custom-chart-modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Create custom chart</h3>
            <p className="small">Combine multiple sensor data into one chart</p>
          </div>

          <div className="custom-chart">
            <SensorChart dataInfo={dataInfo} />
            <div className="sensors">
              <h6>Sensors</h6>
              <form className="sensor-select">
                {allDataInfo &&
                  allDataInfo.map((sensor, i) => (
                    <div key={i} className="sensor-option">
                      <input id={i} type="checkbox" />
                      <label htmlFor={i} className="checkbox-icon" />
                      <label htmlFor={i} className="label">
                        {sensor.title}
                      </label>
                    </div>
                  ))}
              </form>
            </div>
          </div>

          <Button text="Add chart" />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
