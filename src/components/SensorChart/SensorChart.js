import React, { useState } from "react";

import { ReactSelect as Select } from "../Select/Select";

import { ExportCSV } from "./ExportCSV";

import { LineChart } from "./LineChart/LineChart";

import { Button } from "../Button/Button";

import { useSensorData } from "../../api/useSensorData";

import "./sensorChart.scss";


const exampleDate = "2021-03-01";

export const SensorChart = ({ id, dataInfo }) => {
  const [startTimeFromInput, setStartTimeFromInput] = useState("00:00:00");
  const [endTimeFromInput, setEndTimeFromInput] = useState("00:11:00");
  const [startDateFromInput, setStartDateFromInput] = useState(exampleDate);
  const [endDateFromInput, setEndDateFromInput] = useState(exampleDate);

  const [startDate, setStartDate] = useState(exampleDate);
  const [endDate, setEndDate] = useState(exampleDate);

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:11:00");

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

  const handleClick = () => {
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
          onClick={handleClick}
        />
        <ExportCSV data={sensorData} dataInfo={dataInfo} />
      </>
    );
  };

  return (
    <div className="sensor-chart">
      {/**
      <div className="date-picker">
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
      <button type="button" onClick={handleClick}>
        Fetch data
      </button>*/}

      <>
        <h3 className="section-title">{dataInfo.description}</h3>
        <div className="select-time">
          <p>Time frame:</p>
          <CustomTimeframe />
          {/*<Select options={timeOptions} />*/}
        </div>
        {(!sensorData || !sensorData[0]) && (
          <p className="loading">Loading ...</p>
        )}
        {sensorData && sensorData[0] && (
          <LineChart data={sensorData} dataInfo={dataInfo} />
        )}
      </>
    </div>
  );
};
