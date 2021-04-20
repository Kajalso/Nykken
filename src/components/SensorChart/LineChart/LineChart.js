import React from "react";
import {
  scaleTime,
  scaleLinear,
  extent,
  timeFormat,
  utcFormat,
  curveMonotoneX,
} from "d3";
import { CSVLink } from "react-csv";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

import "./chart.scss";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 60 };
const circleRadius = 2;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// X values
const xValue = (d) => new Date(d.time_stamp_utc);
let xAxisLabel = "Time";
const xAxisLabelOffset = 40;
const xAxisDateOffset = 50;

// Y values
const yValue = (d) => +d.measurement;
let yAxisLabel = "Measurement";
const yAxisLabelOffset = 50;

// Axis formats
const xAxisTickFormat = utcFormat("%H:%M");
const dateFormat = (d) => timeFormat("%A %d %B %Y")(new Date(d.time_stamp_utc));

export const LineChart = ({ data = [], dataInfo = {} }) => {
  if (!data || !dataInfo) {
    return <pre>Loading chart...</pre>;
  }

  // Linear scale for x values
  const xScale = scaleTime()
    .domain(extent(data, xValue)) // Extent-function replaces min, max
    .range([0, innerWidth])
    .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  //Headers for the CSV-file download
  const headers = [
    { label: "Measurement", key: "measurement" },
    { label: "Timestamp", key: "time_stamp_utc" },
  ];

  //Create CSV-report
  const csvReport = {
    data: data,
    headers: headers,
    filename: (dataInfo.title)+'_from_'+(data[0].time_stamp_utc)+'_to_'+(data[data.length-1].time_stamp_utc)+'.csv'
  };

  return (
    <div className="chart">
       <CSVLink {...csvReport}>CSV</CSVLink>
      <div className="data">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={10}
            />
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
            <Marks
              data={data}
              dataInfo={dataInfo}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              xFormat={xAxisTickFormat}
              circleRadius={circleRadius}
              curveStyle={curveMonotoneX}
            />
            <text
              x={innerWidth - yAxisLabelOffset}
              y={innerHeight + xAxisLabelOffset}
              className={"axis-label x small"}
            >
              {xAxisLabel + " (min)"}
            </text>
            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisDateOffset}
              className={"axis-date"}
            >
              {dateFormat(data[0])}
            </text>
            <text
              className={"axis-label y"}
              transform={`translate(${-yAxisLabelOffset},
                ${innerHeight / 2}) rotate(-90)`}
            >
              {yAxisLabel + " (" + dataInfo.unit + ")"}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
