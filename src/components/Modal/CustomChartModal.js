import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { SensorChart } from "../SensorChart/SensorChart";
import { CustomChart } from "../SensorChart/CustomChart/CustomChart";

import { useAllDataInfo } from "../../api/useAllDataInfo";
import { useDataInfo } from "../../api/useDataInfo";
import { useSensorData } from "../../api/useSensorData";
import { useColors } from "../../styles/useChartStyles";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

export const CustomChartModal = ({ isOpen, closeModal }) => {
  const [chartName, setChartName] = useState("");
  const [chosenSensors, setChosenSensors] = useState([]);
  const [chartSensors, setChartSensors] = useState([]);
  const colors = useColors();

  const ColorLegend = ({ sensor }) => {
    const id = sensor.data_identifier;
    let markColor = colors.purple;

    // Set color to blue for everything minus these IDs
    if (!(id === 3 || id === 4 || id === 6)) {
      markColor = colors.blue;
    }

    // Rainfall
    if (id === 5) {
      markColor = colors.darkBlue;
    }

    return (
      <div className="legend">
        <svg width={10} height={10}>
          {id !== 5 && <circle r={5} cx={5} cy={5} fill={markColor} />}
          {id === 5 && <rect width={9} height={9} fill={markColor} />}
        </svg>
        <p className="small">
          {sensor.title}
          {id !== 2 && id !== 3 && " (no data)"}
        </p>
      </div>
    );
  };

  const allDataInfo = useAllDataInfo();

  const dataInfo1 = useDataInfo(2);
  const data1 = useSensorData(
    2,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );
  const dataInfo2 = useDataInfo(3);
  const data2 = useSensorData(
    3,
    exampleDate + exampleStartTime,
    exampleDate + exampleEndTime
  );

  let sensors = [
    { data: data1, dataInfo: dataInfo1 },
    { data: data2, dataInfo: dataInfo2 },
  ];

  const handleChange = (currentSensor) => {
    if (chosenSensors.includes(currentSensor)) {
      setChosenSensors(
        chosenSensors.filter(
          (sensor) => sensor.data_identifier !== currentSensor.data_identifier
        )
      );
      if (
        chartSensors.some(
          (sensor) => sensor.dataInfo === sensors[0].dataInfo
        ) ||
        chartSensors.some((sensor) => sensor.dataInfo === sensors[1].dataInfo)
      ) {
        console.log("Remove");
        setChartSensors(
          chartSensors.filter(
            (sensor) =>
              sensor.dataInfo.data_identifier !== currentSensor.data_identifier
          )
        );
      }
    } else {
      setChosenSensors((chosenSensors) => [...chosenSensors, currentSensor]);
      if (
        currentSensor.data_identifier === sensors[0].dataInfo.data_identifier
      ) {
        setChartSensors((chartSensors) => [...chartSensors, sensors[0]]);
      }
      if (
        currentSensor.data_identifier === sensors[1].dataInfo.data_identifier
      ) {
        setChartSensors((chartSensors) => [...chartSensors, sensors[1]]);
      }
    }
  };

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

          <div className="chart-content-options">
            <CustomChart sensors={chartSensors} />
            <div className="sensors">
              <h6>Sensors</h6>
              <form className="sensor-select">
                {allDataInfo &&
                  allDataInfo.map((sensor, i) => (
                    <div key={i} className="sensor-option">
                      <input
                        id={sensor.data_identifier}
                        type="checkbox"
                        onChange={(e) => {
                          handleChange(sensor);
                        }}
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
            <div className="color-legends">
              {chosenSensors.map((sensor, i) => (
                <ColorLegend sensor={sensor} />
              ))}
            </div>
          </div>

          <div className="chart-name">
            <label htmlFor="chart-name">Custom chart name: </label>
            <input
              id="chart-name"
              type="text"
              placeholder="Example chart name"
              value={chartName}
              onChange={(e) => setChartName(e.target.value)}
              required
            />
          </div>
          <Button className="add" text="Add chart" />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
