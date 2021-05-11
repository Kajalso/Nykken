import React, { useState, useEffect } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import { ReactSelect as Select } from "../Select/Select";
import { useColors } from "../../styles/useChartStyles";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-05-06";
const exampleStartTime = "00:00:00";
const exampleEndTime = "00:30:00";

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

export const CustomTimeModal = ({
  sensor,
  chartGroup,
  handleConfirm,
  isOpen,
  closeModal,
}) => {
  const [groupName, setGroupName] = useState(chartGroup);
  const [startTimeFromInput, setStartTimeFromInput] = useState(
    exampleStartTime
  );
  const [endTimeFromInput, setEndTimeFromInput] = useState(exampleEndTime);
  const [startDateFromInput, setStartDateFromInput] = useState(exampleDate);
  const [endDateFromInput, setEndDateFromInput] = useState(exampleDate);

  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);
  const [granularity, setGranularity] = useState(granularityOptions[0].value);
  const [showCustomTime, setShowCustomTime] = useState(false);

  const colors = useColors();
  const [errorMessage, setErrorMessage] = useState(
    "Invalid timestamps: Start time must be before end time."
  );
  const [displayError, setDisplayError] = useState("none");

  const [
    granularityOptionsAvailable,
    setGranularityOptionsAvailable,
  ] = useState(granularityOptions);

  useEffect(() => {
    let options = granularityOptions;
    if (startDateFromInput.slice(0, 4) !== endDateFromInput.slice(0, 4)) {
      // Different year
      options = granularityOptions;
      options = options.filter((option) => option.value !== "MEASURED"); // Remove measured
      options = options.filter((option) => option.value !== "HOURLY"); // Remove hourly
      options = options.filter((option) => option.value !== "WEEKLY"); // Remove weekly
      options = options.filter((option) => option.value !== "DAILY"); // Remove daily
    }
    if (startDateFromInput.slice(0, 4) === endDateFromInput.slice(0, 4)) {
      // Same year
      options = granularityOptions;
      options = options.filter((option) => option.value !== "YEARLY"); // Remove yearly
      options = options.filter((option) => option.value !== "MEASURED"); // Remove measured
      options = options.filter((option) => option.value !== "HOURLY"); // Remove hourly
    }
    if (startDateFromInput.slice(0, 7) === endDateFromInput.slice(0, 7)) {
      // Same month
      options = granularityOptions;
      options = options.filter((option) => option.value !== "YEARLY"); // Remove yearly
      options = options.filter((option) => option.value !== "MONTHLY"); // Remove monthly
      options = options.filter((option) => option.value !== "HOURLY"); // Remove hourly
      options = options.filter((option) => option.value !== "MEASURED"); // Remove measured
    }

    if (
      startDateFromInput.slice(0, 7) === endDateFromInput.slice(0, 7) &&
      +endDateFromInput.slice(9, 11) - +startDateFromInput.slice(9, 11) < 7
    ) {
      // Same week
      options = granularityOptions;
      options = options.filter((option) => option.value !== "YEARLY");
      options = options.filter((option) => option.value !== "MONTHLY");
      options = options.filter((option) => option.value !== "WEEKLY");
      options = options.filter((option) => option.value !== "MEASURED");
    }
    if (startDateFromInput === endDateFromInput) {
      //Same day
      options = granularityOptions;
      options = options.filter((option) => option.value !== "YEARLY"); // Remove yearly
      options = options.filter((option) => option.value !== "MONTHLY"); // Remove monthly
      options = options.filter((option) => option.value !== "WEEKLY"); // Remove weekly
      options = options.filter((option) => option.value !== "DAILY"); // Remove daily
    }
    if (
      startDateFromInput === endDateFromInput &&
      startTimeFromInput.slice(0, 2) === endTimeFromInput.slice(0, 2)
    ) {
      //Same hour
      console.log("Same hour");
      options = granularityOptions;
      options = options.filter((option) => option.value !== "YEARLY"); // Remove yearly
      options = options.filter((option) => option.value !== "MONTHLY"); // Remove monthly
      options = options.filter((option) => option.value !== "WEEKLY"); // Remove weekly
      options = options.filter((option) => option.value !== "DAILY"); // Remove daily
      options = options.filter((option) => option.value !== "HOURLY"); // Remove hourly
    }

    setGranularityOptionsAvailable(options);
  }, [
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput,
  ]);

  const handleClick = () => {
    console.log(startTimeFromInput);

    if (startDateFromInput > endDateFromInput) {
      setErrorMessage("Invalid dates: Start time must be before end time.");
      setDisplayError("");
    } else if (
      startDateFromInput > exampleDate ||
      endDateFromInput > exampleDate
    ) {
      setErrorMessage(
        "Invalid dates: Choose a date that has occured and has updated data."
      );
      setDisplayError("");
    } else {
      console.log("Confirming chart changes...");

      handleConfirm(
        startTimeFromInput,
        endTimeFromInput,
        startDateFromInput,
        endDateFromInput,
        granularity
      );
      closeModal();
      setErrorMessage("");
      setDisplayError("none");
    }
  };

  // Handle change of time frame
  const handleChangeTime = (selectedTimeOption) => {
    if (selectedTimeOption.value === "custom") {
      setShowCustomTime(true);
    }
    setSelectedTime(selectedTimeOption);
  };

  // Handle change of granularity
  const handleChangeGranularity = (granularityOption) => {
    setGranularity(granularityOption.value);
    console.log("Changed granularity to " + granularityOption.value);
  };

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Select time frame and granularity</h3>
            {(!sensor || !chartGroup) && <p className="small">{""}</p>}
            {sensor && !chartGroup && <p className="small">{sensor.title}</p>}
            {!sensor && chartGroup && <p className="small">{groupName}</p>}
          </div>
          <div className="selects">
            <div className="select-time">
              <p>Time frame:</p>
              <Select options={timeOptions} onChange={handleChangeTime} />
            </div>

            <div className="select-granularity">
              <p>Granularity:</p>
              <Select
                options={granularityOptionsAvailable}
                onChange={handleChangeGranularity}
              />
            </div>
          </div>
          {showCustomTime && (
            <div className="date-picker">
              <div className="from">
                <label className="from">From:</label>
                <input
                  type="date"
                  value={startDateFromInput}
                  onChange={(e) => setStartDateFromInput(e.target.value)}
                />
                <input
                  type="time"
                  value={startTimeFromInput}
                  onChange={(e) => setStartTimeFromInput(e.target.value)}
                  step="1"
                />
              </div>
              <div className="until">
                <label className="until">Until:</label>
                <input
                  type="date"
                  value={endDateFromInput}
                  onChange={(e) => setEndDateFromInput(e.target.value)}
                />
                <input
                  type="time"
                  value={endTimeFromInput}
                  onChange={(e) => setEndTimeFromInput(e.target.value)}
                  step="1"
                />
              </div>
            </div>
          )}
          <p
            className="error small"
            style={{ color: `${colors.red}`, display: displayError }}
          >
            {errorMessage}
          </p>
          <Button className="save" text="Confirm" onClick={handleClick} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
