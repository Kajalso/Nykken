import React from "react";

import { LineChart } from "../SensorChart/LineChart/LineChart";
import { BarChart } from "../SensorChart/BarChart/BarChart";

import { useSensorData } from "../../api/useSensorData";

const barChartIDs = [5, 8, 10, 12];

export const GroupChart = ({
  dataInfo,
  startDateTime,
  endDateTime,
  granularity,
}) => {
  const id = dataInfo.data_identifier;

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime, granularity);

  return (
    <div className="sensor-chart">
      <h3 className="section-title">{dataInfo.title}</h3>

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
    </div>
  );
};
