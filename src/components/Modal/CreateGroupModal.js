import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const CreateGroupModal = ({ isOpen, closeModal }) => {
  const allDataInfo = useAllDataInfo();
  // const [chosenSensors, setChosenSensors] = useState([]);
  // const handleAddGroup = () => {};

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Create group</h3>
            <p className="small">
              Compare multiple sensor data during the same time frame
            </p>
          </div>

          <form className="sensor-select">
            {allDataInfo &&
              allDataInfo.map((sensor, i) => (
                <div key={i} className="sensor-option">
                  <input id={i} type="checkbox" />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.title}
                  </label>
                </div>
              ))}
          </form>
          <Button text="Add group" />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};

/*
<>
    <input type="checkbox" id={i} name={i} value={sensor.sensor_id}>
      <label for={i}>{sensor.description}</label>
    </input>
  </>*/
