import React, { useState, useEffect } from "react";
import { useDataInfo } from "../api/useDataInfo";

export const DataInfo = () => {
  const [idFromInput, setIdFromInput] = useState(1);
  const [id, setId] = useState(1);
  const [dataInfo, setDataInfo] = useDataInfo(id);

  const handleClick = () => {
    setId(idFromInput);
  };

  useEffect(() => {
    setDataInfo(id);
  }, [id, setDataInfo]);

  return (
    <div>
      <h4>Data info fetching</h4>
      <input
        type="text"
        value={idFromInput}
        onChange={(e) => setIdFromInput(e.target.value)}
      />
      <button type="button" onClick={handleClick}>
        Fetch data info
      </button>
      <div>Sensor ID: {dataInfo.sensor_id}</div>
      <div>Description: {dataInfo.description}</div>
      <div>Unit: {dataInfo.unit}</div>
    </div>
  );
};
