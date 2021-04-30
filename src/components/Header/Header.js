import React, { useState } from "react";

// import { timeFormat } from "d3";

import { Button } from "../Button/Button";
import { CreateGroupModal } from "../Modal/CreateGroupModal";

import groupIcon from "../../icons/group.svg";
//import customChartIcon from "../../icons/custom_chart.svg";

import "./header.scss";

// const dateFormat = (d) => timeFormat("%d.%m.%y %H:%M")(new Date());
const latestDate = "05.03.21 06:02";

export const Header = () => {
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);

  const closeGroupModal = () => setGroupModalIsOpen(false);

  return (
    <div className="header">
      <h2>Risvollan measurement station</h2>

      <div className="buttons">
        <Button
          icon={groupIcon}
          text="Add chart group"
          onClick={() => setGroupModalIsOpen(true)}
        />
        {/** 
        <Button icon={customChartIcon} text="Create custom chart" />*/}
      </div>
      <CreateGroupModal
        isOpen={groupModalIsOpen}
        closeModal={closeGroupModal}
      />
      <p className="small">Last data update: {latestDate}</p>
    </div>
  );
};
