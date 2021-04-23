import React, { useState } from "react";

import { ReactSelect as Select } from "../Select/Select";

import { LineChart } from "./LineChart/LineChart";
import { BarChart } from "./BarChart/BarChart";
import { Button } from "../Button/Button";
import { CustomTimeModal } from "../Modal/CustomTimeModal";

import { useSensorData } from "../../api/useSensorData";

import "./sensorChart.scss";

const exampleDate = "2021-03-01";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:11:00";

const barChartIDs = [5, 8, 10, 12];

const timeOptions = [
  {
    value: "custom",
    label: "Custom",
  },
];

const granularityOptions = [
  { value: "MEASURED", label: "As measured" },
  { value: "HOURLY", label: "Hourly" },
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "YEARLY", label: "Yearly" },
];

export const SensorChart = ({ id, dataInfo }) => {
  const [customTimeModalIsOpen, setCustomTimeModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);

  const closeCustomTimeModal = () => setCustomTimeModalIsOpen(false);

  const [startDate, setStartDate] = useState(exampleDate);
  const [endDate, setEndDate] = useState(exampleDate);

  const [startTime, setStartTime] = useState(exampleStartTime);
  const [endTime, setEndTime] = useState(exampleEndTime);

  const [startDateTime, setStartDateTime] = useState(startDate + startTime);
  const [endDateTime, setEndDateTime] = useState(endDate + endTime);

  // Fetch sensor data and data info
  const sensorData = useSensorData(id, startDateTime, endDateTime);

  const handleChange = (selectedTimeOption) => {
    if (selectedTimeOption.value === "custom") {
      setCustomTimeModalIsOpen(true);
    }
    setSelectedTime(selectedTimeOption);
  };

  const handleConfirm = (
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput
  ) => {
    setStartTime(startTimeFromInput);
    setEndTime(endTimeFromInput);
    setStartDate(startDateFromInput);
    setEndDate(endDateFromInput);

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
      <>
        <h3 className="section-title">{dataInfo.title}</h3>
        <div className="selects">
          <div className="select-time">
            <p>Time frame:</p>

            <Select options={timeOptions} onChange={handleChange} />
            <CustomTimeModal
              sensor={dataInfo}
              isOpen={customTimeModalIsOpen}
              handleConfirm={handleConfirm}
              closeModal={closeCustomTimeModal}
            />
          </div>
          <div className="select-granularity">
            <p>Granularity:</p>
            <Select options={granularityOptions} />
          </div>
        </div>
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
      </>
    </div>
  );
};
