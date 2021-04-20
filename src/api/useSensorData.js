import { useState, useEffect } from "react";
import axios from "axios";

export const useSensorData = (id, startDateTime, endDateTime) => {
  const [sensorData, setSensorData] = useState(null);

  const startDate = startDateTime.slice(0, 10);
  const startTime = startDateTime.slice(10, -1);

  const endDate = endDateTime.slice(0, 10);
  const endTime = endDateTime.slice(10, -1);

  useEffect(() => {
    console.log("Data with ID " + id + " is fetching...");
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
        let measurements = response.data.data[0].measurements;
        setSensorData(measurements);
        //console.log("Data fetched.");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [startDate, startTime, endDate, endTime, id]);

  return sensorData;
};
