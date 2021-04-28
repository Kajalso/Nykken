import React from "react";
import { scaleTime, scaleLinear, extent, curveMonotoneX } from "d3";

import { useChartProps } from "../../../styles/useCustomChartStyles";
import { useColors } from "../../../styles/useChartStyles";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { AxisRight } from "./Axes/AxisRight";
import { Marks as LineMarks } from "../LineChart/Marks";

const circleRadius = 2;

export const CustomChart = ({ sensors }) => {
  const chosenSensors = sensors;
  const colors = useColors();

  let [
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
  ] = useChartProps();

  const textColor = (id) => {
    let textColor = colors.purple;
    // Set color to purple for Radiation, Humidity and Wind Speed
    if (!(id === 3 || id === 4 || id === 6)) {
      textColor = colors.blue;
    }

    return textColor;
  };

  // Linear scale for x values
  const xScale = (data) =>
    scaleTime()
      .domain(extent(data, xValue)) // Extent-function replaces min, max
      .range([0, innerWidth])
      .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScale = (data) =>
    scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

  return (
    <div className="custom-chart">
      <h5 className="chart-title">My custom chart</h5>
      <div className="chart">
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom
              xScale={xScale(sensors[0].data)}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
              tickOffset={10}
              tickAmount={3}
            />
            <AxisLeft
              yScale={yScale(sensors[0].data)}
              innerHeight={innerHeight}
              innerWidth={innerWidth}
              tickOffset={10}
            />
            <text
              fill={textColor(sensors[0].dataInfo.data_identifier)}
              className={"custom-axis-label y small"}
              transform={`translate(${-yAxisLabelOffset},
                ${innerHeight / 2}) rotate(-90)`}
            >
              {yAxisLabel(sensors[0].dataInfo) +
                " (" +
                sensors[0].dataInfo.unit +
                ")"}
            </text>
            {chosenSensors[1] && (
              <>
                <AxisRight
                  yScale={yScale(sensors[1].data)}
                  innerWidth={innerWidth}
                  tickOffset={10}
                />
                <text
                  fill={textColor(sensors[1].dataInfo.data_identifier)}
                  className={"custom-axis-label y small"}
                  transform={`translate(${innerWidth + yAxisLabelOffset},
                ${innerHeight / 2}) rotate(90)`}
                >
                  {yAxisLabel(sensors[1].dataInfo) +
                    " (" +
                    sensors[1].dataInfo.unit +
                    ")"}
                </text>
              </>
            )}
            <text
              x={innerWidth - yAxisLabelOffset}
              y={innerHeight + xAxisLabelOffset}
              className={"axis-label x tiny"}
            >
              {xAxisLabel + " (min)"}
            </text>

            {chosenSensors.map((sensor, i) => (
              <>
                <LineMarks
                  data={sensor.data}
                  dataInfo={sensor.dataInfo}
                  xScale={xScale(sensor.data)}
                  yScale={yScale(sensor.data)}
                  xValue={xValue}
                  yValue={yValue}
                  xFormat={xAxisTickFormat}
                  circleRadius={circleRadius}
                  curveStyle={curveMonotoneX}
                  innerHeight={innerHeight}
                />
              </>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};
