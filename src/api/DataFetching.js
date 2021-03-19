import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [dataInfo, setDataInfo] = useState({});
  const [id, setId] = useState(1);
  const [idFromButtonClick, setIdFromButtonClick] = useState(1);

  const handleClick = () => {
    setIdFromButtonClick(id);
    console.log(dataInfo);
  };

  useEffect(() => {
    axios
      .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${idFromButtonClick}`)
      .then((res) => {
        console.log(res);
        setDataInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idFromButtonClick]);

  return (
    <div>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="button" onClick={handleClick}>
        Fetch post
      </button>
      <div>{dataInfo.description}</div>
    </div>
  );
}

export default DataFetching;
