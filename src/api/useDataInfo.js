import { useState, useEffect } from "react";
import axios from "axios";

export const useDataInfo = (id) => {
  const [dataInfo, setDataInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${id}`)
      .then((response) => {
        console.log(response.data);
        setDataInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return [dataInfo, setDataInfo];
};
