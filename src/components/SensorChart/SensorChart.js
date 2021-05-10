import React, { useState, useRef } from "react";

import { exportComponentAsPNG } from "react-component-export-image";

import { ReactSelect as Select } from "../Select/Select";

import { ExportCSV } from "./ExportCSV";

import { LineChart } from "./LineChart/LineChart";
import { BarChart } from "./BarChart/BarChart";

import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";
import { useSessionStorage } from "../../storage/useSessionStorage";
import { useBarChartIDs } from "../../styles/useChartStyles";

import moreIcon from "../../icons/more.svg";

import "./sensorChart.scss";

const exampleDate = "2021-05-06";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:30:00";

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

export const SensorChart = ({ dataInfo }) => {
  const id = dataInfo.data_identifier;
  const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);
  const [granularity, setGranularity] = useSessionStorage(
    id + "granularity",
    "measured"
  );

  const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

  const [startDate, setStartDate] = useState(exampleDate); //useSessionStorage('startDate', exampleDate);
  const [endDate, setEndDate] = useState(exampleDate); //useSessionStorage('endDate', exampleDate);

  const [startTime, setStartTime] = useState(exampleStartTime);
  const [endTime, setEndTime] = useState(exampleEndTime);

  const [startDateTime, setStartDateTime] = useSessionStorage(
    id + "start",
    startDate + startTime
  ); //useState(startDate + startTime)  //
  const [endDateTime, setEndDateTime] = useSessionStorage(
    id + "end",
    endDate + endTime
  ); //useState(endDate + endTime) //

  const componentRef = useRef();

  // Bar chart IDs
  const barChartIDs = useBarChartIDs();

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime, granularity);
  //const sensorData = useSessionStorage(id, id + startDateTime + endDateTime + granularity);

  // Handle change of time frame
  const handleClick = (chartOption) => {
    if (chartOption.value === "edit") {
      setCustomTimeModalIsOpen(true);
    }
    if (chartOption.value === "download_png") {
      handleDownloadPNG();
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

  const handleDownloadPNG = () => {
    exportComponentAsPNG(componentRef, {
      fileName:
        dataInfo.title + "_from_" + startDateTime + "_to_" + endDateTime,
    });
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
            <BarChart
              data={sensorData}
              dataInfo={dataInfo}
              ref={componentRef}
            />
          )}
          {!barChartIDs.includes(id) && (
            <LineChart
              data={sensorData}
              dataInfo={dataInfo}
              ref={componentRef}
            />
          )}
        </>
      )}
      <ExportCSV data={sensorData} dataInfo={dataInfo} />
    </div>
  );
};
