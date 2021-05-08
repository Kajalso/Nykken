import React, { useRef, useState, useEffect } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { SensorChart } from "../SensorChart/SensorChart";
import { CustomChart } from "../SensorChart/CustomChart/CustomChart";

import { useAllDataInfo } from "../../api/useAllDataInfo";
import { useDataInfo } from "../../api/useDataInfo";
import { useSensorData } from "../../api/useSensorData";
import { useColors } from "../../styles/useChartStyles";
import { useSessionStorage } from "../../storage/useSessionStorage";

import { exportComponentAsPNG } from "react-component-export-image";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

export const CustomChartModal = ({ isOpen, closeModal }) => {
  const [chartName, setChartName] = useState("");
  const [chosenSensors, setChosenSensors] = useState([]);
  const [chartSensors, setChartSensors] = useState([]);
  const [newChart, setNewChart] = useState([]);
  const componentRef = useRef();
  let id = 1;
  const [granularity, setGranularity] = useSessionStorage(
    id + "granularity",
    "measured"
  );
  const [errorMessage, setErrorMessage] = useState(
    "Please select more than one sensor in chart"
  );
  const [displayError, setDisplayError] = useState("none");

  // Time frame for chart
  const [startDate, setStartDate] = useState(exampleDate); //useSessionStorage('startDate', exampleDate);
  const [endDate, setEndDate] = useState(exampleDate); //useSessionStorage('endDate', exampleDate);

  const [startTime, setStartTime] = useState(exampleStartTime);
  const [endTime, setEndTime] = useState(exampleEndTime);

  const [startDateTime, setStartDateTime] = useSessionStorage(
    id + "start",
    startDate + startTime
  ); //useState(startDate + startTime)
  const [endDateTime, setEndDateTime] = useSessionStorage(
    id + "end",
    endDate + endTime
  ); //useState(endDate + endTime)

  const colors = useColors();

  // Handle confirm custom time frame from modal
  const handleConfirm = (
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput,
    granularity
  ) => {
    setStartTime(startTimeFromInput);
    setEndTime(endTimeFromInput);
    setStartDate(startDateFromInput);
    setEndDate(endDateFromInput);
    setGranularity(granularity);

    // Check for correct time format when using Chrome
    if (startTimeFromInput.length < 6) {
      setStartDateTime(startDateFromInput + startTimeFromInput + ":00");
    } else {
      setStartDateTime(startDateFromInput + startTimeFromInput);
    }
    if (endTimeFromInput.length < 6) {
      setEndDateTime(endDateFromInput + endTimeFromInput + ":00");
    } else {
      setEndDateTime(endDateFromInput + endTimeFromInput);
    }
  };

  const handleDownloadPNG = () => {
    exportComponentAsPNG(componentRef, {
      fileName:
        "combined_chart" + "_from_" + startDateTime + "_to_" + endDateTime,
    });
  };

  const ColorLegend = ({ sensor }) => {
    let markColor = colors.purple;
    const id = sensor.data_identifier;

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
  const data1 = useSensorData(2, startDateTime, endDateTime, granularity);
  const dataInfo2 = useDataInfo(3);
  const data2 = useSensorData(3, startDateTime, endDateTime, granularity);

  let sensors = [
    { data: data1, dataInfo: dataInfo1 },
    { data: data2, dataInfo: dataInfo2 },
  ];

  useEffect(() => {
    console.log("Sensors changed.");
    if (chartSensors && chartSensors[0]) {
      setChartSensors(sensors);
    }
    console.log(sensors);
  }, [data1, data2]);

  const handleAddChart = () => {
    // Check if the chart has a name and more than one sensor

    if (chosenSensors.length <= 1) {
      setErrorMessage("Please choose more than one sensor");
      setDisplayError("");
    } else if (chartName === "" && chosenSensors.length > 1) {
      setErrorMessage("Please give your chart a name");
      setDisplayError();
    } else {
      setNewChart(chosenSensors);
      setChosenSensors([]);
      closeModal();
      setDisplayError("none");
    }

    for (let sensor of chosenSensors) {
      console.log(sensor);
      if (
        sensor.data_identifier !== sensors[0].dataInfo.data_identifier &&
        sensor.data_identifier !== sensors[1].dataInfo.data_identifier
      ) {
        setErrorMessage("Please only choose sensors with data");
        setDisplayError("");
      }
    }
  };

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
            <CustomChart
              sensors={chartSensors}
              handleDownloadPNG={handleDownloadPNG}
              handleConfirm={handleConfirm}
            />
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
          <p
            className="error small"
            style={{ color: `${colors.red}`, display: displayError }}
          >
            {errorMessage}
          </p>
          <Button className="add" text="Add chart" onClick={handleAddChart} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
