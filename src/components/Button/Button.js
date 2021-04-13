import React from "react";

import "./button.scss";

export const Button = ({ text, onClick, icon, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt="Button icon" />}
      {text}
    </button>
  );
};
