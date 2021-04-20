import React from "react";

import Select from "react-select";

import "./select.scss";

const styles = {
  control: (base) => ({
    ...base,
    minHeight: 20,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "#3B4541",
      fontSize: "12px",
    };
  },
};

const theme = (theme) => ({
  ...theme,
  borderRadius: 8,
  colors: {
    ...theme.colors,
    primary: "rgba(209, 227, 178, 1)",
    primary50: "rgba(209, 227, 178, 0.5)",
    primary75: "rgba(209, 227, 178, 0.75)",
    primary25: "rgba(209, 227, 178, 0.25)",
    danger: "rgba(249, 126, 126, 1)",
    dangerLight: "rgba(249, 126, 126, 0.5)",
    neutral90: "rgba(59, 69, 65, 0.9)",
    neutral80: "rgba(59, 69, 65, 0.8)",
    neutral70: "rgba(59, 69, 65, 0.7)",
    neutral60: "rgba(59, 69, 65, 0.6)",
    neutral50: "rgba(59, 69, 65, 0.5)",
    neutral40: "rgba(59, 69, 65, 0.4)",
    neutral30: "rgba(59, 69, 65, 0.3)",
    neutral20: "rgba(59, 69, 65, 0.2)",
    neutral10: "rgba(59, 69, 65, 0.1)",
    neutral5: "rgba(59, 69, 65, 0.05)",
    neutral0: "rgba(255, 255, 255, 1)",
  },
});

export const ReactSelect = ({ options }) => {
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      options={options}
      defaultValue={options[0]}
      theme={theme}
      styles={styles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};
