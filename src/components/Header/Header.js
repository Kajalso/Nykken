import React, { useState } from "react";
import Modal from "react-modal";
// import { timeFormat } from "d3";

import { Button } from "../Button/Button";
import { CreateGroupModal } from "../Modal/CreateGroupModal";

import plusIcon from "../../icons/plus.svg";

import "./header.scss";

// const dateFormat = (d) => timeFormat("%d.%m.%y %H:%M")(new Date());
const latestDate = "05.03.21 06:02";

export const Header = () => {
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);

  const GroupModal = ({ isOpen }) => {
    return (
      <Modal
        className="modal-background"
        isOpen={isOpen}
        onRequestClose={() => setGroupModalIsOpen(false)}
      >
        <div className="modal">
          <div className="modal-content">
            <CreateGroupModal />
          </div>
          <Button
            className="close"
            icon={plusIcon}
            onClick={() => setGroupModalIsOpen(false)}
          />
        </div>
      </Modal>
    );
  };

  return (
    <div className="header">
      <h2>Risvollan measurement station</h2>
      {/** 
      <div className="buttons">
        <Button
          icon={groupIcon}
          text="Add chart group"
          onClick={() => setGroupModalIsOpen(true)}
        />
        <Button icon={customChartIcon} text="Create custom chart" />
      </div>*/}
      <GroupModal isOpen={groupModalIsOpen} />
      <p className="small">Last data update: {latestDate}</p>
    </div>
  );
};
