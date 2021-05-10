import React, { useContext } from "react";

import { CustomChartsContext } from "..//../context/CustomChartsContext";
import { CustomChart } from "./CustomChart/DashboardCustomChart";

export const CustomCharts = () => {
  const { customCharts } = useContext(CustomChartsContext);

  return (
    <>
      {customCharts.length === 0 && <div></div>}
      {customCharts && customCharts[0] && (
        <>
          <h2 className="title">Custom charts</h2>

          {customCharts.map((customChart) => (
            <>
              <h3>{customChart.chartName}</h3>
              <CustomChart
                customChart={customChart}
                chartName={customChart.chartName}
                key={customChart.id}
              />
            </>
          ))}
        </>
      )}
    </>
  );
};
