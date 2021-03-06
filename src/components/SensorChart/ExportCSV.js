import React from "react";
import { CSVLink } from "react-csv";

import downloadIcon from "../../icons/download.svg";

export const ExportCSV = ({ data = [], dataInfo = {} }) => {
  if (!data || !dataInfo) {
    return <pre></pre>;
  }
  //Headers for the CSV-file download
  const headers = [
    { label: "Measurement", key: "measurement" },
    { label: "Timestamp", key: "time_stamp_utc" },
  ];

  //Create CSV-report
  const csvReport = {
    data: data,
    headers: headers,
    filename:
      dataInfo.title +
      "_from_" +
      data[0].time_stamp_utc +
      "_to_" +
      data[data.length - 1].time_stamp_utc +
      ".csv",
  };

  return (
    <div>
      <CSVLink className="csv-link" {...csvReport}>
        {downloadIcon && <img src={downloadIcon} alt="Button icon" />}
        Download as CSV
      </CSVLink>
    </div>
  );
};
