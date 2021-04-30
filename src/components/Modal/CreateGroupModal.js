import React, { useState, useContext, useEffect } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";

import { GroupsContext } from "../../context/GroupsContext";

import plusIcon from "../../icons/plus.svg";

import "./modals.scss";

export const CreateGroupModal = ({ isOpen, closeModal }) => {
  const { dispatch } = useContext(GroupsContext);
  const allDataInfo = useAllDataInfo();
  const [groupedSensors, setGroupedSensors] = useState([]);
  const [newGroup, setNewGroup] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [infoText, setInfoText] = useState(
    "Select multiple sensors to see in the same time frame"
  );

  const handleChange = (currentSensor) => {
    if (groupedSensors.includes(currentSensor)) {
      setGroupedSensors(
        groupedSensors.filter(
          (sensor) => sensor.data_identifier !== currentSensor.data_identifier
        )
      );
    } else {
      setGroupedSensors((groupedSensors) => [...groupedSensors, currentSensor]);
    }
  };

  useEffect(() => {
    if (newGroup.length === 0 || newGroup.length === 1) {
      return null;
    } else {
      dispatch({ type: "ADD_GROUP", group: { groupName, newGroup } });
    }
  }, [newGroup]);

  const handleAddGroup = () => {
    if (groupedSensors.length === 0 || groupedSensors.length === 1) {
      setInfoText("Please select more than one sensor");
    } else {
      setNewGroup(groupedSensors);
      setGroupedSensors("");
      closeModal();
      setInfoText("Select multiple sensors to see in the same time frame");
    }
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
            <p className="small">{infoText}</p>
          </div>

          <form className="sensor-select" onSubmit={handleAddGroup}>
            {allDataInfo &&
              allDataInfo.map((sensor, i) => (
                <div key={i} className="sensor-option">
                  <input
                    id={i}
                    type="checkbox"
                    onChange={(e) => {
                      handleChange(sensor);
                    }}
                  />
                  <label htmlFor={i} className="checkbox-icon" />
                  <label htmlFor={i} className="label">
                    {sensor.title}
                  </label>
                </div>
              ))}
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </form>
          <Button text="Add group" onClick={handleAddGroup} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
