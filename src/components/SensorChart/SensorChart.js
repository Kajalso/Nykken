import React, { useState } from "react";

import { ReactSelect as Select } from "../Select/Select";

import { LineChart } from "./LineChart/LineChart";
import { BarChart } from "./BarChart/BarChart";
import { Button } from "../Button/Button";
import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";

import moreIcon from "../../icons/more.svg";

import "./sensorChart.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

const barChartIDs = [5, 8, 10, 12];

const chartOptions = [
  {
    value: "edit",
    label: "Edit chart",
  },
  { value: "download_png", label: "Download PNG" },
  { value: "download_csv", label: "Download CSV" },
];

export const SensorChart = ({ id, dataInfo }) => {
  const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);
  const [granularity, setGranularity] = useState("measured");

  const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

  const [startDate, setStartDate] = useState(exampleDate);
  const [endDate, setEndDate] = useState(exampleDate);

  const [startTime, setStartTime] = useState(exampleStartTime);
  const [endTime, setEndTime] = useState(exampleEndTime);

  const [startDateTime, setStartDateTime] = useState(startDate + startTime);
  const [endDateTime, setEndDateTime] = useState(endDate + endTime);

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime, granularity);

  // Handle change of time frame
  const handleClick = (chartOption) => {
    if (chartOption.value === "edit") {
      setCustomTimeModalIsOpen(true);
    }
  };

  // Handle confirm custom time frame from modal
  const handleConfirm = (
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput,
    granularity
  ) => {
    setStartTime(startTimeFromInput);
    setEndTime(endTimeFromInput);
    setStartDate(startDateFromInput);
    setEndDate(endDateFromInput);
    setGranularity(granularity);

    // Check for correct time format when using Chrome
    if (startTimeFromInput.length < 6) {
      setStartDateTime(startDateFromInput + startTimeFromInput + ":00");
    } else {
      setStartDateTime(startDateFromInput + startTimeFromInput);
    }
    if (endTimeFromInput.length < 6) {
      setEndDateTime(endDateFromInput + endTimeFromInput + ":00");
    } else {
      setEndDateTime(endDateFromInput + endTimeFromInput);
    }
  };

  return (
    <div className="sensor-chart">
      <h3 className="section-title">{dataInfo.title}</h3>
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
        sensor={dataInfo}
        isOpen={customTimeModalIsOpen}
        handleConfirm={handleConfirm}
        closeModal={closeCustomTimeModal}
      />

      {(!sensorData || !sensorData[0]) && (
        <p className="loading">Loading ...</p>
      )}
      {sensorData && sensorData[0] && (
        <>
          {barChartIDs.includes(id) && (
            <BarChart data={sensorData} dataInfo={dataInfo} />
          )}
          {!barChartIDs.includes(id) && (
            <LineChart data={sensorData} dataInfo={dataInfo} />
          )}
        </>
      )}
    </div>
  );
};
