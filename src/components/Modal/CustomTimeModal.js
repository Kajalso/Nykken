import React, { useState, useEffect } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import { ReactSelect as Select } from "../Select/Select";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-03-01";

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
  const [startTimeFromInput, setStartTimeFromInput] = useState("00:00:00");
  const [endTimeFromInput, setEndTimeFromInput] = useState("00:11:00");
  const [startDateFromInput, setStartDateFromInput] = useState(exampleDate);
  const [endDateFromInput, setEndDateFromInput] = useState(exampleDate);

  const [selectedTime, setSelectedTime] = useState(timeOptions[0].value);
  const [granularity, setGranularity] = useState(granularityOptions[0].value);
  const [showCustomTime, setShowCustomTime] = useState(false);

  const [
    granularityOptionsAvailable,
    setGranularityOptionsAvailable,
  ] = useState(granularityOptions);

  useEffect(() => {
    let options = granularityOptions;
    if (startDateFromInput.slice(0, 4) === endDateFromInput.slice(0, 4)) {
      options = options.filter((option) => option.value !== "YEARLY");
    }
    if (startDateFromInput.slice(0, 7) === endDateFromInput.slice(0, 7)) {
      options = options.filter((option) => option.value !== "YEARLY");
      options = options.filter((option) => option.value !== "MONTHLY");
    }

    if (
      startDateFromInput.slice(0, 7) === endDateFromInput.slice(0, 7) &&
      +endDateFromInput.slice(9, 11) - +startDateFromInput.slice(9, 11) < 7
    ) {
      options = options.filter((option) => option.value !== "YEARLY");
      options = options.filter((option) => option.value !== "MONTHLY");
      options = options.filter((option) => option.value !== "WEEKLY");
    }
    if (startDateFromInput === endDateFromInput) {
      options = options.filter((option) => option.value !== "YEARLY");
      options = options.filter((option) => option.value !== "MONTHLY");
      options = options.filter((option) => option.value !== "WEEKLY");
      options = options.filter((option) => option.value !== "DAILY");
    }
    if (
      startDateFromInput === endDateFromInput &&
      startTimeFromInput.slice(0, 2) === endTimeFromInput.slice(0, 2)
    ) {
      options = options.filter((option) => option.value === "MEASURED");
    }

    setGranularityOptionsAvailable(options);
  }, [
    startTimeFromInput,
    endTimeFromInput,
    startDateFromInput,
    endDateFromInput,
  ]);

  const handleClick = () => {
    console.log("Confirming chart changes...");
    handleConfirm(
      startTimeFromInput,
      endTimeFromInput,
      startDateFromInput,
      endDateFromInput,
      granularity
    );
    closeModal();
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
          <Button className="save" text="Confirm" onClick={handleClick} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
