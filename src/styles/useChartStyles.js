import { timeFormat, utcFormat } from "d3";

// Return the chart colors
export const useColors = () => {
  const colorRed = "#FF5252";
  const colorBlue = "#59B9FF";
  const colorPurple = "#D66AF1";
  const colorDarkBlue = "#006EDB";

  const colors = {
    red: colorRed,
    blue: colorBlue,
    purple: colorPurple,
    darkBlue: colorDarkBlue,
  };

  return colors;
};

export const useChartProps = () => {
  const width = 600;
  const height = 300;
  const margin = { top: 10, right: 50, bottom: 50, left: 60 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  // X values
  const xValue = (d) => new Date(d.time_stamp_utc);
  let xAxisLabel = "Time";
  const xAxisLabelOffset = 40;
  const xAxisDateOffset = 45;

  // Y values
  const yValue = (d) => +d.measurement;
  let yAxisLabel = "Measurement";
  const yAxisLabelOffset = 50;

  // Axis formats
  const xAxisTickFormat = utcFormat("%H:%M");
  const dateFormat = (d) =>
    timeFormat("%A %d %B %Y")(new Date(d.time_stamp_utc));

  return [
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
  ];
};
