import React, { useState } from "react";

// import { timeFormat } from "d3";

import { Button } from "../Button/Button";
import { CreateGroupModal } from "../Modal/CreateGroupModal";

import groupIcon from "../../icons/group.svg";
import customChartIcon from "../../icons/custom_chart.svg";
import logo from "../../icons/Nykken_logo.svg";

import "./header.scss";
import { CustomChartModal } from "../Modal/CustomChartModal";

// const dateFormat = (d) => timeFormat("%d.%m.%y %H:%M")(new Date());
const latestDate = "05.03.21 06:02";

export const Header = () => {
  const [groupModalIsOpen, setGroupModalIsOpen] = useState(false);
  const [chartModalIsOpen, setChartModalIsOpen] = useState(false);

  const closeGroupModal = () => setGroupModalIsOpen(false);
  const closeChartModal = () => setChartModalIsOpen(false);

  return (
    <div className="header">
      <img className="logo" src={logo} alt="Nykken" />
      <h3 className="station-name">Risvollan measurement station</h3>

      <div className="buttons">
        <Button
          icon={groupIcon}
          text="Add chart group"
          onClick={() => setGroupModalIsOpen(true)}
        />

        <Button
          className="btn-custom-chart"
          icon={customChartIcon}
          text="Create custom chart"
          onClick={() => setChartModalIsOpen(true)}
        />
      </div>
      <CreateGroupModal
        isOpen={groupModalIsOpen}
        closeModal={closeGroupModal}
      />
      <CustomChartModal
        isOpen={chartModalIsOpen}
        closeModal={closeChartModal}
      />
      <p className="small">Last data update: {latestDate}</p>
    </div>
  );
};
