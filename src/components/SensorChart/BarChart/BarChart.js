import React from "react";
import { scaleBand, scaleLinear, min, max, extent } from "d3";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { Marks } from "./Marks";

import { useChartProps, useGroupProps } from "../../../styles/useChartStyles";

export const BarChart = React.forwardRef(
  ({ data = [], dataInfo = {} }, ref, inGroup) => {
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
      xAxisTickFormat,
      yValue,
      yAxisLabel,
      yAxisLabelOffset,
      dateFormat,
    } = useChartProps();

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
    const xScale = scaleBand().domain(data.map(xValue)).range([0, innerWidth]);

    // Y values
    let minY = min(data, yValue);
    let maxY = max(data, yValue);

    const domainY = minY < 0 ? extent(data, yValue) : [0, maxY];

    // Linear scale for y values
    const yScale = scaleLinear().domain(domainY).range([innerHeight, 0]);

    // Linear scale for negative y values
    const yScaleNeg = scaleLinear()
      .domain([minY, 0])
      .range([innerHeight - yScale(0), innerHeight]); // From zero-line to bottom of chart

    return (
      <div className="chart" ref={ref}>
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
              yScaleNeg={yScaleNeg}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              xFormat={xAxisTickFormat}
              innerHeight={innerHeight}
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
              {yAxisLabel(dataInfo) + " (" + dataInfo.unit + ")"}
            </text>
          </g>
        </svg>
      </div>
    );
  }
);
