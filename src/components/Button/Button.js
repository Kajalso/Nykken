import React from "react";

import "./button.scss";

export const Button = ({ text, onClick, buttonIcon }) => {
  return (
    <button className="button" onClick={onClick}>
      <img src={buttonIcon} />
      {text}
    </button>
  );
};
