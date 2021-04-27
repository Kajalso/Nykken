import { useState, useEffect } from "react";
import axios from "axios";

export const useAllDataInfo = () => {
  const [allDataInfo, setAllDataInfo] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${id}`)
      .then((response) => {
        if (id <= 12) {
          setAllDataInfo((allDataInfo) => [...allDataInfo, response.data]);
          setId(id + 1);
        } else if (id === 13) {
          setAllDataInfo((allDataInfo) => [...allDataInfo, response.data]);
          console.log("All data info successfully retrieved.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return allDataInfo;
};
