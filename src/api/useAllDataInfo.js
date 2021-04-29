import { useState, useEffect } from "react";
import axios from "axios";

export const useAllDataInfo = () => {
  const [allDataInfo, setAllDataInfo] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    /* for (let i = id; i <= 12; i++) {
      axios
        .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${id}`)
        .then((response) => {
          setAllDataInfo((allDataInfo) => [...allDataInfo, response.data]);
          setId(id + 1);
          console.log("Axios call for id = " + id);
        })
        .catch((error) => {
          console.log(error);
        });
    } */
    axios
      .get(`http://ibmrisvol.ibm.ntnu.no/data/info?id=${id}`)
      .then((response) => {
        if (id <= 12) {
          setAllDataInfo((allDataInfo) => [...allDataInfo, response.data]);
          setId(id + 1);
        } else if (id === 13) {
          setAllDataInfo((allDataInfo) => [...allDataInfo, response.data]);
          console.log("Added sensor with id " + id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return allDataInfo;
};
