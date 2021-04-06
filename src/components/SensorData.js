import React, { useState } from "react";

import { LineChart } from "../components/LineChart/LineChart";

import { useSensorData } from "../api/useSensorData";
import { useDataInfo } from "../api/useDataInfo";
import { useAllDataInfo } from "../api/useAllDataInfo";

import "./sensorData.css";

export const SensorData = () => {
  const [idFromInput, setIdFromInput] = useState(1);
  const [id, setId] = useState(1);

  const [startTimeFromInput, setStartTimeFromInput] = useState("00:00:00");
  const [endTimeFromInput, setEndTimeFromInput] = useState("00:11:00");
  const [startDateFromInput, setStartDateFromInput] = useState("2020-08-08");
  const [endDateFromInput, setEndDateFromInput] = useState("2020-08-08");

  const [startDate, setStartDate] = useState("2020-08-08");
  const [endDate, setEndDate] = useState("2020-08-08");

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:11:00");

  const [startDateTime, setStartDateTime] = useState(startDate + startTime);
  const [endDateTime, setEndDateTime] = useState(endDate + endTime);

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime);
  const dataInfo = useDataInfo(id);
  const allDataInfo = useAllDataInfo();

  const handleClick = () => {
    setId(idFromInput);

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

  return (
    <div>
      <label>Sensor:</label>
      <select onChange={(e) => setIdFromInput(e.target.selectedIndex + 1)}>
        {allDataInfo.map((sensor, i) => (
          <option key={i} value={sensor.sensor_id}>
            {sensor.description}
          </option>
        ))}
      </select>
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
      </button>
      {(!sensorData || !sensorData[0]) && <div>Loading ...</div>}
      {sensorData && sensorData[0] && (
        <>
          <LineChart data={sensorData} dataInfo={dataInfo} />
        </>
      )}
    </div>
  );
};
