import { useState, useEffect } from "react";
import axios from "axios";

export const useSensorData = (id, startDateTime, endDateTime) => {
  const [apiData, setApiData] = useState([]);
  const [sensorData, setSensorData] = useState({
    loading: true,
    measurements: [],
    timestamps: [],
  });

  const startDate = startDateTime.slice(0, 10);
  const startTime = startDateTime.slice(10, -1);

  const endDate = endDateTime.slice(0, 10);
  const endTime = endDateTime.slice(10, -1);

  useEffect(() => {
    console.log("Data fetching...");
    setSensorData({
      loading: true,
      measurements: [],
      timestamps: [],
    });
    axios
      .get(
        `http://ibmrisvol.ibm.ntnu.no/data?from=${startDate}T${startTime.slice(
          0,
          2
        )}%3A${startTime.slice(3, 5)}%3A${startTime.slice(
          6,
          8
        )}Z&until=${endDate}T${endTime.slice(0, 2)}%3A${endTime.slice(
          3,
          5
        )}%3A${endTime.slice(6, 8)}Z&identifier=${id}`
      )
      .then((response) => {
        setApiData(response.data.data[0].measurements);
        setSensorData({
          loading: false,
          measurements: apiData.map((data) => Number(data.measurement)),
          timestamps: apiData.map((data) => {
            let date = new Date(data.time_stamp_utc);
            return date.toString();
          }),
        });
        console.log("Data fetched.");
      })
      .catch((error) => {
        console.log(error);
        setSensorData({
          loading: false,
          measurements: [],
          timestamps: [],
        });
      });
  }, [id, startDateTime, endDateTime, startDate, startTime, endDate, endTime]);

  return [sensorData, setSensorData];
};
