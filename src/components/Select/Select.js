import React, { useState } from "react";

import Select from "react-select";

import "./select.scss";

export const ReactSelect = ({ options }) => {
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      options={options}
      defaultValue={options[0]}
    />
  );
};
