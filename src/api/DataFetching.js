import React, { useState, useEffect } from "react";
import axios from "axios";

import "./api.css";

function DataFetching() {
  const [id, setId] = useState(1);
  const [dataType, setDataType] = useState(1);

  const [loading, setLoading] = useState(true);

  const [measurementsData, setMeasurementsData] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const [timestamps, setTimestamps] = useState({});

  const [fromTime, setFromTime] = useState("00:00:00");
  const [untilTime, setUntilTime] = useState("00:11:00");

  const [fromDate, setFromDate] = useState("2020-08-08");
  const [untilDate, setUntilDate] = useState("2020-08-08");

  const handleClick = () => {
    setDataType(id);
    console.log("Showing data with ID " + id);
    console.log("From: " + fromDate + " " + fromTime);
    console.log("Until: " + untilDate + " " + untilTime);
    console.log(measurementsData);
    console.log(timestamps);
    console.log(measurements);
  };

  useEffect(() => {
    setLoading(true);
    console.log("Data fetching...");
    axios
      .get(
        `http://ibmrisvol.ibm.ntnu.no/data?from=${fromDate}T${fromTime.slice(
          0,
          2
        )}%3A${fromTime.slice(3, 5)}%3A${fromTime.slice(
          6,
          8
        )}Z&until=${untilDate}T${untilTime.slice(0, 2)}%3A${untilTime.slice(
          3,
          5
        )}%3A${untilTime.slice(6, 8)}Z&identifier=${dataType}`
      )
      .then((response) => {
        setMeasurementsData(response.data.data[0].measurements);
        setMeasurements(
          measurementsData.map((data) => Number(data.measurement))
        );
        setTimestamps(
          measurementsData.map((data) => {
            let date = new Date(data.time_stamp_utc);
            return date.toString();
          })
        );
        console.log("Data fetched.");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataType]);

  return (
    <div>
      <h4>Data fetching</h4>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <div className="date-picker">
        <label>From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="time"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
        />
        <label>Until:</label>
        <input
          type="date"
          value={untilDate}
          onChange={(e) => setUntilDate(e.target.value)}
        />
        <input
          type="time"
          value={untilTime}
          onChange={(e) => setUntilTime(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleClick}>
        Fetch data
      </button>
      {loading && <div>Loading ...</div>}
      {!loading && (
        <div className="measurementsdata">
          <div className="measurements">
            {measurements.map((measurement) => (
              <div className="measurement">Measurement: {measurement}</div>
            ))}
          </div>
          <div className="timestamps">
            {timestamps.map((timestamp) => (
              <div className="timestamp">Timestamp: {timestamp}</div>
            ))}
          </div>
        </div>
      )}

      {/*dataMeasurements.map((measurement) => (
        <div>{measurement.data}</div>
      ))*/}
    </div>
  );
}

export default DataFetching;
