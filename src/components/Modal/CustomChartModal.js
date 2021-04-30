import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { SensorChart } from "../SensorChart/SensorChart";
import { CustomChart } from "../SensorChart/CustomChart/CustomChart";

import { useAllDataInfo } from "../../api/useAllDataInfo";
import { useDataInfo } from "../../api/useDataInfo";
import { useSensorData } from "../../api/useSensorData";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

export const CustomChartModal = ({ isOpen, closeModal }) => {
  const allDataInfo = useAllDataInfo();
  const dataInfo1 = useDataInfo(3);
  const data1 = useSensorData(
    3,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );
  const dataInfo2 = useDataInfo(5);
  const data2 = useSensorData(
    5,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );
  const dataInfo3 = useDataInfo(6);
  const data3 = useSensorData(
    6,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );
  const dataInfo4 = useDataInfo(7);
  const data4 = useSensorData(
    7,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );

  const sensors = [{ data: data2, dataInfo: dataInfo2 }];
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
            <p className="small">Combine multiple sensor data into one</p>
          </div>

          <div className="chart-content-options">
            <CustomChart sensors={sensors} />
            <div className="sensors">
              <h6>Sensors</h6>
              <form className="sensor-select">
                {allDataInfo &&
                  allDataInfo.map((sensor, i) => (
                    <div key={i} className="sensor-option">
                      <input
                        id={sensor.data_identifier}
                        type="checkbox"
                        onChange={(e) => console.log(e.target)}
                      />
                      <label
                        htmlFor={sensor.data_identifier}
                        className="checkbox-icon"
                      />
                      <label htmlFor={sensor.data_identifier} className="label">
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
