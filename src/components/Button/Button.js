import React from "react";

import "./button.scss";

export const Button = ({ text, onClick, icon }) => {
  return (
    <button className="button" onClick={onClick}>
      <img src={icon} alt="Button icon" />
      {text}
    </button>
  );
};
