import { useState, useEffect } from "react";
import axios from "axios";

export const useSensorData = (id, startDateTime, endDateTime, granularity) => {
  const [sensorData, setSensorData] = useState(null);

  const startDate = startDateTime.slice(0, 10);
  const startTime = startDateTime.slice(10, -1);

  const endDate = endDateTime.slice(0, 10);
  const endTime = endDateTime.slice(10, -1);

  // If granularity is null, set granularity by chosen dates
  if (!granularity) {
    if (startDate.slice(0, 4) !== endDate.slice(0, 4)) {
      // Different year
      granularity = "YEARLY";
    }
    if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
      // Same year
      granularity = "MONTHLY";
    }
    if (startDate.slice(0, 7) === endDate.slice(0, 7)) {
      // Same month
      granularity = "DAILY";
    }
    if (
      startDate.slice(0, 7) === endDate.slice(0, 7) &&
      +endDate.slice(9, 11) - +startDate.slice(9, 11) < 7
    ) {
      // Same week
      granularity = "DAILY";
    }
    if (startDate === endDate) {
      //Same day
      granularity = "MEASURED";
    }
    if (
      startDate === endDate &&
      startTime.slice(0, 2) === endTime.slice(0, 2)
    ) {
      //Same hour
      granularity = "MEASURED";
    }
  }

  useEffect(() => {
    console.log("Data with ID " + id + " is fetching...");
    axios
      .get(
        `http://ibmrisvol.ibm.ntnu.no/data?granularity=${granularity}&from=${startDate}T${startTime.slice(
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
        if (response.data.data) {
          let measurements = response.data.data[0].measurements;
          if (response.data.data[0]) {
            setSensorData(measurements);
            console.log("Data fetched.");
          } else {
            console.log("Not able to fetch data.");
          }
        } else {
          console.log("Not able to fetch data.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, granularity, startDate, startTime, endDate, endTime]);

  return sensorData;
};
