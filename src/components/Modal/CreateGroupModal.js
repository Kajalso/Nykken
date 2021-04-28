import React, { useState } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import { useLocalStorage } from '../../storage/useLocalStorage';

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";
import { group } from "d3-array";

export const CreateGroupModal = ({ 
  isOpen, 
  closeModal
 }) => {
  const allDataInfo = useAllDataInfo();
  const [groupedSensors, setGroupedSensors] = useState([]);
  const [groupName, setGroupName] = useState(0);
  const [newGroup, setNewGroup] = useLocalStorage( 'Group' + groupName, [])
  
  const handleChange = (currentSensor)  => {
    if (groupedSensors.includes(currentSensor)) {
      setGroupedSensors(
        groupedSensors.filter(
          (sensor) => sensor.data_identifier !== currentSensor.data_identifier
        )
      );
    }
    else {
      setGroupedSensors((groupedSensors) => [...groupedSensors, currentSensor]);
    }
  }
  

  const handleAddGroup = () => {
    setGroupName(groupName + 1);
    setNewGroup(groupedSensors);
    closeModal();
    setGroupedSensors([]);
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
            <h3>Create group</h3>
            <p className="small">
              Compare multiple sensor data during the same time frame
            </p>
          </div>

          <form className="sensor-select">
            {allDataInfo &&
              allDataInfo.map((sensor, i) => (
                <div key={i} className="sensor-option">
                  <input 
                  id={i} 
                  type="checkbox"
                  onChange={(e) => {handleChange(sensor)}}
                  />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.title}
                  </label>
                </div>
              ))}
          </form>
          <Button text="Add group" onClick={handleAddGroup} />
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
