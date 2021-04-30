import React, { useState, useContext, useEffect } from "react";

import Modal from "react-modal";

import { Button } from "../Button/Button";

import { useAllDataInfo } from "../../api/useAllDataInfo";
import { useColors } from "../../styles/useChartStyles";

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

  const colors = useColors();
  const [errorMessage, setErrorMessage] = useState(
    "Please select more than one sensor in the group"
  );
  const [displayError, setDisplayError] = useState("none");

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
    // Check if the group has a name and more than one sensor
    if (groupedSensors.length <= 1) {
      setErrorMessage("Please choose more than one sensor");
      setDisplayError("");
    } else if (groupName === "" && groupedSensors.length > 1) {
      setErrorMessage("Please give your group a name");
      setDisplayError();
    } else {
      setNewGroup(groupedSensors);
      setGroupedSensors("");
      closeModal();
      setDisplayError("none");
    }
  };

  return (
    <Modal
      className="modal-background"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="modal group-modal">
        <div className="modal-content">
          <div className="modal-title">
            <h3>Create group</h3>
            <p className="small">
              Select multiple sensors to see in the same time frame
            </p>
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
          </form>
          <div className="group-name">
            <label htmlFor="group-name">Group name: </label>
            <input
              id="group-name"
              type="text"
              placeholder="Example group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <p
            className="error small"
            style={{ color: `${colors.red}`, display: displayError }}
          >
            {errorMessage}
          </p>
          <Button text="Add group" onClick={handleAddGroup} />
        </div>
        <Button className="close" icon={plusIcon} onClick={closeModal} />
      </div>
    </Modal>
  );
};
