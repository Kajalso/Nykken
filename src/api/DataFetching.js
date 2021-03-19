import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [dataInfo, setDataInfo] = useState({});
  const [id, setId] = useState(1);
  const [idFromButtonClick, setIdFromButtonClick] = useState(1);

  const handleClick = () => {
    setIdFromButtonClick(id);
  };

  useEffect(() => {
    axios
      .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${idFromButtonClick}`)
      .then((response) => {
        console.log(response.data);
        setDataInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idFromButtonClick]);

  return (
    <div>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={handleClick}>
        Fetch data info
      </button>
      <div>Sensor ID: {dataInfo.sensor_id}</div>
      <div>Description: {dataInfo.description}</div>
      <div>Unit: {dataInfo.unit}</div>
    </div>
  );
}

export default DataFetching;
