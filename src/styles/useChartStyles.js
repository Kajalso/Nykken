import { timeFormat, utcFormat } from "d3";

// Chart colors
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

// General chart properties
export const useChartProps = () => {
  const width = 800;
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
  let yAxisLabel = (d) => d.title;
  const yAxisLabelOffset = 50;

  // Axis formats
  const xAxisTickFormat = utcFormat("%H:%M");
  const dateFormat = (d) =>
    timeFormat("%A %d %B %Y")(new Date(d.time_stamp_utc));

  return {
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
  };
};

// Custom chart properties
export const useCustomProps = () => {
  const width = 500;
  const height = 300;

  const margin = { top: 5, right: 30, bottom: 25, left: 30 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  return {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
  };
};

// Group properties
export const useGroupProps = () => {
  const width = 700;
  const height = 300;

  const margin = { top: 5, right: 30, bottom: 25, left: 30 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  return {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
  };
};

// Bar chart IDs
export const useBarChartIDs = () => [5, 8, 10, 12];
