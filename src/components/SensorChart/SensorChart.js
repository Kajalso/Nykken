import React, { useState } from "react";

import { ReactSelect as Select } from "../Select/Select";

import { LineChart } from "./LineChart/LineChart";
import { BarChart } from "./BarChart/BarChart";
import { Button } from "../Button/Button";
import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";

import "./sensorChart.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

const barChartIDs = [5, 8, 10, 12];

export const SensorChart = ({ id, dataInfo }) => {
  const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);

  const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

  const [startDate, setStartDate] = useState(exampleDate);
  const [endDate, setEndDate] = useState(exampleDate);

  const [startTime, setStartTime] = useState(exampleStartTime);
  const [endTime, setEndTime] = useState(exampleEndTime);

  const [startDateTime, setStartDateTime] = useState(startDate + startTime);
  const [endDateTime, setEndDateTime] = useState(endDate + endTime);

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime);

  const timeOptions = [
    {
      value: "custom",
      label: "Custom",
    },
  ];

  const handleConfirm = (
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput
  ) => {
    setStartTime(startTimeFromInput);
    setEndTime(endTimeFromInput);
    setStartDate(startDateFromInput);
    setEndDate(endDateFromInput);

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
  /*

  const CustomTimeframe = () => {
    return (
      <>
        <div className="date-picker">
          <div className="from">
            <label>From:</label>
            <input
              type="date"
              value={startDateFromInput}
              onChange={(e) => setStartDateFromInput(e.target.value)}
            />
            <input
              type="time"
              value={startTimeFromInput}
              onChange={(e) => setStartTimeFromInput(e.target.value)}
              step="1"
            />
          </div>
          <div className="until">
            <label>Until:</label>
            <input
              type="date"
              value={endDateFromInput}
              onChange={(e) => setEndDateFromInput(e.target.value)}
            />
            <input
              type="time"
              value={endTimeFromInput}
              onChange={(e) => setEndTimeFromInput(e.target.value)}
              step="1"
            />
          </div>
        </div>
        <Button
          text="Fetch data"
          className="fetch-data"
          onClick={handleConfirm}
        />
      </>
    );
  };*/

  return (
    <div className="sensor-chart">
      <>
        <h3 className="section-title">{dataInfo.title}</h3>
        <div className="select-time">
          <p>Time frame:</p>
          <Button
            text="Custom time frame"
            onClick={() => setCustomTimeModalIsOpen(true)}
          />
          <CustomTimeModal
            sensor={dataInfo}
            isOpen={customTimeModalIsOpen}
            handleConfirm={handleConfirm}
            closeModal={closeCustomTimeModal}
          />
          {/*<Select options={timeOptions} />*/}
        </div>
        {(!sensorData || !sensorData[0]) && (
          <p className="loading">Loading ...</p>
        )}
        {sensorData && sensorData[0] && (
          <>
            {barChartIDs.includes(id) && (
              <BarChart data={sensorData} dataInfo={dataInfo} />
            )}
            {!barChartIDs.includes(id) && (
              <LineChart data={sensorData} dataInfo={dataInfo} />
            )}
          </>
        )}
      </>
    </div>
  );
};
