import React, { useState, useEffect } from "react";
import { scaleTime, scaleLinear, extent, curveMonotoneX, utcFormat } from "d3";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { Marks } from "./Marks";

import {
  useChartProps,
  useGroupProps,
  useXAxisTickFormat,
  useXAxisTitle,
} from "../../../styles/useChartStyles";

import "../chart.scss";

const circleRadius = 2;

export const LineChart = React.forwardRef(
  ({ data = [], dataInfo = {}, granularity, inGroup }, ref) => {
    let {
      width,
      height,
      margin,
      innerHeight,
      innerWidth,
      xValue,
      xAxisLabel,
      xAxisLabelOffset,
      xAxisDateOffset,
      yValue,
      yAxisLabel,
      yAxisLabelOffset,
      dateFormat,
    } = useChartProps();

    const startDateTime = data[0].time_stamp_utc;
    const endDateTime = data[data.length - 1].time_stamp_utc;

    let xAxisTickFormat = useXAxisTickFormat(
      granularity,
      startDateTime,
      endDateTime
    );

    let xAxisTitle = useXAxisTitle(startDateTime, endDateTime);

    /*
    const [chartWidth, setChartWidth] = useState(width);
    let tempChartWidth = width;

     window.addEventListener("resize", () => {
      if (document.body.clientWidth > 1025) {
        console.log("Large screen.");
        tempChartWidth = 800;
      }
      if (document.body.clientWidth > 768) {
        console.log("Medium screen.");
        tempChartWidth = 600;
      } else {
        console.log("Small screen");
        tempChartWidth = 400;
      }
    });

    useEffect(() => {
      setChartWidth(tempChartWidth);
    }, [chartWidth]); */

    // Group props
    let {
      groupWidth,
      groupHeight,
      groupMargin,
      groupInnerHeight,
      groupInnerWidth,
    } = useGroupProps();

    if (inGroup) {
      width = groupWidth;
      height = groupHeight;
      margin = groupMargin;
      innerWidth = groupInnerWidth;
      innerHeight = groupInnerHeight;
    }

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

    return (
      <div className="chart" ref={ref}>
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
              innerHeight={innerHeight}
            />
            <text
              x={innerWidth - xAxisLabelOffset / 2}
              y={innerHeight + xAxisLabelOffset}
              className={"axis-label x tiny"}
            >
              {xAxisLabel}
            </text>
            <text
              x={innerWidth / 2}
              y={innerHeight + xAxisDateOffset}
              className={"axis-date"}
            >
              {xAxisTitle}
            </text>
            <text
              className={"axis-label y"}
              transform={`translate(${-yAxisLabelOffset},
                ${innerHeight / 2}) rotate(-90)`}
            >
              {yAxisLabel(dataInfo) + " (" + dataInfo.unit + ")"}
            </text>
          </g>
        </svg>
      </div>
    );
  }
);
