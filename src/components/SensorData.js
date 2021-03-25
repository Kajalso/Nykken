import React, { useState, useEffect } from "react";

import { useSensorData } from "../api/useSensorData";
import "./sensorData.css";

export const SensorData = () => {
  const [idFromInput, setIdFromInput] = useState(1);
  const [id, setId] = useState(1);

  const [startTimeFromInput, setStartTimeFromInput] = useState("00:00:00");
  const [endTimeFromInput, setEndTimeFromInput] = useState("00:11:00");
  const [startDateFromInput, setStartDateFromInput] = useState("2020-08-08");
  const [endDateFromInput, setEndDateFromInput] = useState("2020-08-08");

  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:11:00");

  const [startDate, setStartDate] = useState("2020-08-08");
  const [endDate, setEndDate] = useState("2020-08-08");

  const startDateTime = startDate + startTime;
  const endDateTime = endDate + endTime;

  const [sensorData, setSensorData] = useSensorData(
    id,
    startDateTime,
    endDateTime
  );

  const handleClick = () => {
    setId(idFromInput);
    setStartTime(startTimeFromInput);
    setStartDate(startDateFromInput);
    setEndTime(endTimeFromInput);
    setEndDate(endDateFromInput);

    console.log("Showing data with ID " + idFromInput);
    console.log("From: " + startDateFromInput + " " + startTimeFromInput);
    console.log("Until: " + endDateFromInput + " " + endTimeFromInput);
  };

  useEffect(() => {
    setSensorData(id, startDateTime, endDateTime);
  }, [id, startDateTime, endDateTime, setSensorData]);

  return (
    <div>
      <h4>Data fetching</h4>
      <input
        type="text"
        value={idFromInput}
        onChange={(e) => setIdFromInput(e.target.value)}
      />
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
        />
      </div>
      <button type="button" onClick={handleClick}>
        Fetch data
      </button>
      {(!sensorData.measurements || !sensorData.timestamps) && (
        <div>Loading ...</div>
      )}
      {sensorData.measurements && sensorData.timestamps && (
        <>
          <div className="info-text">ID: {id}</div>
          <div className="measurementsdata">
            <div className="measurements">
              {sensorData.measurements.map((measurement, i) => (
                <div key={i} className="measurement">
                  Measurement: {measurement}
                </div>
              ))}
            </div>
            <div className="timestamps">
              {sensorData.timestamps.map((timestamp, i) => (
                <div key={i} className="timestamp">
                  Timestamp: {timestamp}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
