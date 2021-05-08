import React, { useContext } from "react";

import { CustomChartsContext } from "..//../context/CustomChartsContext";
import { CustomChart } from "./CustomChart/CustomChart";

export const CustomCharts = () => {
  const { customCharts } = useContext(CustomChartsContext);

  return (
    <>
      <h2 className="title">Custom charts</h2>
      {customCharts.length === 0 && <p>No charts to show</p>}
      {customCharts &&
        customCharts.map((customChart) => (
          <CustomChart chartName={customChart.chartName} key={customChart.id} />
        ))}
    </>
  );
};
