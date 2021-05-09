import { useState, useEffect } from "react";
import axios from "axios";

export const useDataInfo = (id) => {
  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ibmrisvol.ibm.ntnu.no/data/info?id=${id}`)
      .then((response) => {
        setDataInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return dataInfo;
};
