import React from "react";
import { scaleBand, scaleLinear, max, timeFormat, utcFormat } from "d3";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { Marks } from "./Marks";

const width = 700;
const height = 400;
const margin = { top: 10, right: 50, bottom: 50, left: 70 };
const centerPadding = 4.8;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// X values
const xValue = (d) => new Date(d.time_stamp_utc);
const xAxisLabel = "Time";
const xAxisLabelOffset = 40;
const xAxisDateOffset = 50;

// Y values
const yValue = (d) => +d.measurement;
const yAxisLabel = "Measurement";
const yAxisLabelOffset = 50;

// Axis formats
const xAxisTickFormat = utcFormat("%H:%M");
const dateFormat = (d) => timeFormat("%A %d %B %Y")(new Date(d.time_stamp_utc));

export const BarChart = ({ data = [], dataInfo = {} }) => {
  if (!data || !dataInfo) {
    return <pre>Loading chart...</pre>;
  }

  // Linear scale for x values
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingOuter(0)
    .paddingInner(0.2); // Space between each bar

  // Linear scale for y values
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

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
              centerPadding={centerPadding}
            />

            <Marks
              data={data}
              dataInfo={dataInfo}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              xFormat={xAxisTickFormat}
              innerHeight={innerHeight}
              centerPadding={centerPadding}
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
