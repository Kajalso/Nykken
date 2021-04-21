import React from "react";
import {
  scaleBand,
  scaleLinear,
  min,
  max,
  extent,
  timeFormat,
  utcFormat,
} from "d3";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { Marks } from "./Marks";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 70 };
const centerPadding = 0;

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

export const BarChart = ({ data = [], dataInfo = {} }) => {
  if (!data || !dataInfo) {
    return <pre>Loading chart...</pre>;
  }

  // Y axis label
  yAxisLabel = dataInfo.title;

  // Linear scale for x values
  const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]);

  // Set yScale for positive and negative values
  let minY = Math.abs(min(data, yValue));
  let maxY = max(data, yValue);

  let largestY = Math.max(minY, maxY); // Largest y value, either pos or neg

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain([-largestY, largestY])
    .range([innerHeight, 0]);

  // Linear scale for positive y values
  const yScalePos = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([0, innerHeight / 2]);

  // Linear scale for negative y values
  const yScaleNeg = scaleLinear()
    .domain([min(data, yValue), 0])
    .range([innerHeight / 2, innerHeight]);

  return (
    <div className="chart">
      <div className="data">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={10}
              centerPadding={xScale.bandwidth() * 0.15}
            />

            <Marks
              data={data}
              dataInfo={dataInfo}
              xScale={xScale}
              yScalePos={yScalePos}
              yScaleNeg={yScaleNeg}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              xFormat={xAxisTickFormat}
              innerHeight={innerHeight}
              centerPadding={xScale.bandwidth() * 0.15}
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
