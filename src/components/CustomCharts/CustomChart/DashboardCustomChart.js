import React, { useRef, useContext } from "react";
import {
  scaleTime,
  min,
  scaleLinear,
  scaleBand,
  extent,
  curveMonotoneX,
} from "d3";

import {
  useColors,
  useChartProps,
  useCustomProps,
  useXAxisTickFormat,
} from "../../../styles/useChartStyles";

import { CustomChartsContext } from "../../../context/CustomChartsContext";

import { AxisBottom } from "./Axes/AxisBottom";
import { AxisLeft } from "./Axes/AxisLeft";
import { AxisRight } from "./Axes/AxisRight";

import { ChartOptions } from "../../SensorChart/ChartOptions";

import { Marks as LineMarks } from "../../SensorChart/LineChart/Marks";
import { Marks as BarMarks } from "../../SensorChart/BarChart/Marks";

import "./customChart.scss";

const circleRadius = 2;
const barChartIDs = [5, 8, 10, 12];

export const DashboardCustomChart = ({
  customChart,
  granularity,
  chartSensors,
  handleDownloadPNG,
  handleConfirm,
}) => {
  const { dispatch } = useContext(CustomChartsContext);
  const chosenSensors = customChart.sensors;
  const chartName = customChart.chartName;
  const sensors = chartSensors;
  const colors = useColors();
  const componentRef = useRef();
  let id = 1;

  if (sensors && sensors[0]) {
    id = sensors[0].dataInfo.data_identifier;
  }

  let xAxisTickFormat = useXAxisTickFormat(granularity);

  let {
    xValue,
    xAxisLabel,
    yValue,
    yAxisLabel,
    xAxisDateOffset,
    yAxisLabelOffset,
    dateFormat,
  } = useChartProps();

  let { width, height, margin, innerWidth, innerHeight } = useCustomProps();

  const chartColor = (id) => {
    let chartColor = colors.purple;
    // Set color to purple for Radiation, Humidity and Wind Speed
    if (!(id === 3 || id === 4 || id === 6)) {
      chartColor = colors.blue;
    }

    return chartColor;
  };

  // Linear scale for x values
  const xScaleLine = (data) =>
    scaleTime()
      .domain(extent(data, xValue)) // Extent-function replaces min, max
      .range([0, innerWidth])
      .nice(); // Adjusts the axis to prevent overlap

  // Linear scale for y values
  const yScaleLine = (data) =>
    scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]).nice();

  // Bar chart
  // Y values
  let minY = (data) => {
    return data[0] ? min(data, yValue) : 0;
  };

  // Linear scale for x values
  const xScaleBar = (data) =>
    scaleBand().domain(data.map(xValue)).range([0, innerWidth]);

  // Linear scale for y values
  const yScaleBar = (data) =>
    scaleLinear().domain(extent(data, yValue)).range([0, innerHeight]);

  // Linear scale for negative y values
  const yScaleNeg = (data) => {
    let range = [innerHeight - yScaleBar(data)(0), innerHeight];
    //range = [0, yScaleBar(data)(0)];
    return data[0]
      ? scaleLinear()
          .domain([minY(data), 0])
          .range(range)
      : 0;
  };

  const isBarChart = (sensor) =>
    barChartIDs.includes(sensor.dataInfo.data_identifier);

  return (
    <div className="custom-chart">
      {/* {chosenSensors && chosenSensors[0] && (
        <ChartOptions
          sensors={chosenSensors}
          handleConfirm={handleConfirm}
          handleDownloadPNG={handleDownloadPNG}
        />
      )} */}
      <div className="chart" ref={componentRef}>
        <svg width={width} height={height}>
          {chosenSensors && chosenSensors[0] && (
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <AxisBottom
                xScale={xScaleLine(chosenSensors[0].data)}
                innerHeight={innerHeight}
                tickFormat={xAxisTickFormat}
                tickOffset={10}
                tickAmount={3}
              />

              {chosenSensors.map((sensor, i) => (
                <React.Fragment key={i}>
                  {chosenSensors.indexOf(sensor) % 2 === 0 && (
                    <>
                      <AxisLeft
                        yScale={
                          isBarChart(sensor)
                            ? yScaleBar(sensor.data)
                            : yScaleLine(sensor.data)
                        }
                        innerHeight={innerHeight}
                        innerWidth={innerWidth}
                        tickOffset={10 + chosenSensors.indexOf(sensor) * 15}
                      />
                      <text
                        className={"axis-label y small"}
                        transform={`translate(${-yAxisLabelOffset},
                ${innerHeight / 2}) rotate(-90)`}
                      >
                        {yAxisLabel(sensor.dataInfo) +
                          " (" +
                          sensor.dataInfo.unit +
                          ")"}
                      </text>
                    </>
                  )}
                  {chosenSensors.indexOf(sensor) % 2 !== 0 && (
                    <>
                      <AxisRight
                        yScale={
                          isBarChart(sensor)
                            ? yScaleBar(sensor.data)
                            : yScaleLine(sensor.data)
                        }
                        innerWidth={innerWidth}
                        tickOffset={chosenSensors.indexOf(sensor) * 15}
                      />
                      <text
                        className={"axis-label y small"}
                        transform={`translate(${innerWidth + yAxisLabelOffset},
                ${innerHeight / 2}) rotate(90)`}
                      >
                        {yAxisLabel(sensor.dataInfo) +
                          " (" +
                          sensor.dataInfo.unit +
                          ")"}
                      </text>
                    </>
                  )}
                </React.Fragment>
              ))}
              <text
                x={innerWidth - yAxisLabelOffset}
                y={innerHeight + 30}
                className={"axis-label x tiny"}
              >
                {xAxisLabel}
              </text>
              <text
                x={innerWidth / 2}
                y={innerHeight + xAxisDateOffset}
                className={"axis-date"}
              >
                Start date: {chosenSensors[0].data[0]}
              </text>

              {chosenSensors &&
                chosenSensors[0] &&
                chosenSensors.map((sensor, i) => (
                  <>
                    {isBarChart(sensor) && (
                      <>
                        <BarMarks
                          data={sensor.data}
                          dataInfo={sensor.dataInfo}
                          xScale={xScaleBar(sensor.data)}
                          yScaleNeg={yScaleNeg(sensor.data)}
                          yScale={yScaleBar(sensor.data)}
                          xValue={xValue}
                          yValue={yValue}
                          xFormat={xAxisTickFormat}
                          innerHeight={innerHeight}
                          isUpsideDown
                        />
                      </>
                    )}
                    {!barChartIDs.includes(sensor.dataInfo.data_identifier) && (
                      <>
                        <LineMarks
                          data={sensor.data}
                          dataInfo={sensor.dataInfo}
                          xScale={xScaleLine(sensor.data)}
                          yScale={yScaleLine(sensor.data)}
                          xValue={xValue}
                          yValue={yValue}
                          xFormat={xAxisTickFormat}
                          circleRadius={circleRadius}
                          curveStyle={curveMonotoneX}
                          innerHeight={innerHeight}
                        />
                      </>
                    )}
                  </>
                ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
