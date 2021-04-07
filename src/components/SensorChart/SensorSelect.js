import React, { useState } from "react";
import { useAllDataInfo } from "../../api/useAllDataInfo";

export const SensorSelect = ({ onChange }) => {
  const allDataInfo = useAllDataInfo();

  return (
    <select onChange={onChange}>
      {allDataInfo.map((sensor, i) => (
        <option key={i} value={sensor.sensor_id}>
          {sensor.description}
        </option>
      ))}
    </select>
  );
};
