import React from "react";

import { LineChart } from "../SensorChart/LineChart/LineChart";
import { BarChart } from "../SensorChart/BarChart/BarChart";

import { useSensorData } from "../../api/useSensorData";
import { useGroupProps, useBarChartIDs } from "../../styles/useChartStyles";

export const GroupChart = ({
  dataInfo,
  startDateTime,
  endDateTime,
  granularity,
}) => {
  const id = dataInfo.data_identifier;

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime, granularity);

  // Bar chart IDs
  const barChartIDs = useBarChartIDs();

  return (
    <div className="sensor-chart group-chart">
      <h5 className="section-title">{dataInfo.title}</h5>

      {(!sensorData || !sensorData[0]) && (
        <p className="loading">Loading ...</p>
      )}
      {sensorData && sensorData[0] && (
        <>
          {barChartIDs.includes(id) && (
            <BarChart data={sensorData} dataInfo={dataInfo} inGroup />
          )}
          {!barChartIDs.includes(id) && (
            <LineChart data={sensorData} dataInfo={dataInfo} inGroup />
          )}
        </>
      )}
    </div>
  );
};
