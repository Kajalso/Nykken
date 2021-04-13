import React from "react";

import { useAllDataInfo } from "../../api/useAllDataInfo";

export const EditDashboard = () => {
  return (
    <>
      <h4>Edit dashboard</h4>
      <p>Select which sensors you want to see on the dashboard</p>
      <div className="sensor-select">{useAllDataInfo}</div>
    </>
  );
};
