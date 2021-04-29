import React, { useState, useContext, useEffect } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import { GroupsContext } from '../../context/GroupsContext';

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const CreateGroupModal = ({ 
  isOpen, 
  closeModal
 }) => {
  const { dispatch } = useContext(GroupsContext);
  const allDataInfo = useAllDataInfo();
  const [groupedSensors, setGroupedSensors] = useState([]);
  const [newGroup, setNewGroup] = useState([]);
  
  
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

 useEffect(() => {
   if (newGroup.length === 0) {
     return null;
   }
   else {
    dispatch({ type: 'ADD_GROUP', group: { newGroup }});
   }
  }, [newGroup]);
  
  const handleAddGroup = () => {
    setNewGroup(groupedSensors);
    setGroupedSensors('');
    closeModal();
  }

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
              Select multiple sensors to see in the same time frame
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
