import React, { useState } from "react";

import { Button } from "../Button/Button";
import Modal from "react-modal";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

const exampleDate = "2021-03-01";

export const CustomTimeModal = ({
  sensor,
  handleConfirm,
  isOpen,
  closeModal,
}) => {
  const [startTimeFromInput, setStartTimeFromInput] = useState("00:00:00");
  const [endTimeFromInput, setEndTimeFromInput] = useState("00:11:00");
  const [startDateFromInput, setStartDateFromInput] = useState(exampleDate);
  const [endDateFromInput, setEndDateFromInput] = useState(exampleDate);

  const handleClick = () => {
    console.log("confirming...");
    handleConfirm(
      startTimeFromInput,
      endTimeFromInput,
      startDateFromInput,
      endDateFromInput
    );
    closeModal();
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
            <h3>Select custom time frame</h3>
            <p className="small">{sensor.title}</p>
          </div>
          <div className="date-picker">
            <div className="from">
              <label>From:</label>
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
              <label>Until:</label>
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
          <Button text="Confirm" onClick={handleClick} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
