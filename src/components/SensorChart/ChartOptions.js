import React, { useState, useRef } from "react";

import { ReactSelect as Select } from "../Select/Select";

import { ExportCSV } from "./ExportCSV";

import { LineChart } from "./LineChart/LineChart";
import { BarChart } from "./BarChart/BarChart";

import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";
import { useSessionStorage } from "../../storage/useSessionStorage";
import { useBarChartIDs } from "../../styles/useChartStyles";

import moreIcon from "../../icons/more.svg";

const chartOptions = [
  {
    value: "edit",
    label: "Edit chart",
  },
  {
    value: "download_png",
    label: "Download PNG",
  },
];

export const ChartOptions = ({ sensors, handleConfirm, handleDownloadPNG }) => {
  const id = sensors[0].dataInfo.data_identifier;
  const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);

  const componentRef = useRef();

  const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

  // Handle change of time frame
  const handleClick = (chartOption) => {
    if (chartOption.value === "edit") {
      setCustomTimeModalIsOpen(true);
    }
    if (chartOption.value === "download_png") {
      handleDownloadPNG();
    }
  };

  return (
    <>
      <div className="more">
        <Select
          className="more-select-container"
          classNamePrefix="more-select"
          options={chartOptions}
          icon={moreIcon}
          onChange={handleClick}
        />
      </div>
      <CustomTimeModal
        sensor={sensors[0].dataInfo}
        isOpen={customTimeModalIsOpen}
        handleConfirm={handleConfirm}
        closeModal={closeCustomTimeModal}
      />
    </>
  );
};
