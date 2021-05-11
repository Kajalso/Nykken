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
  const width = 500;
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
    yValue,
    yAxisLabel,
    yAxisLabelOffset,
    dateFormat,
  };
};

export const useXAxisTickFormat = (granularity, startDateTime, endDateTime) => {
  let xAxisTickFormat = utcFormat("%H:%M");

  if (granularity === "YEARLY") {
    xAxisTickFormat = utcFormat("%b %Y");
  } else if (granularity === "MONTHLY") {
    xAxisTickFormat = utcFormat("%B");
  } else if (granularity === "WEEKLY") {
    xAxisTickFormat = utcFormat("%b %d");
  } else if (granularity === "DAILY") {
    xAxisTickFormat = utcFormat("%b %d");
  } else if (granularity === "HOURLY") {
    xAxisTickFormat = utcFormat("%H:%M");
  }

  return xAxisTickFormat;
};

// Custom chart properties
export const useCustomProps = () => {
  const width = 450;
  const height = 250;

  const xAxisLabelOffset = 20;

  const margin = { top: 5, right: 30, bottom: 25, left: 30 };

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  return {
    width,
    height,
    margin,
    innerHeight,
    innerWidth,
    xAxisLabelOffset,
  };
};

// Group properties
export const useGroupProps = () => {
  const groupWidth = 900;
  const groupHeight = 200;

  const groupMargin = { top: 10, right: 50, bottom: 50, left: 60 };

  const groupInnerHeight = groupHeight - groupMargin.top - groupMargin.bottom;
  const groupInnerWidth = groupWidth - groupMargin.right - groupMargin.left;

  return {
    groupWidth,
    groupHeight,
    groupMargin,
    groupInnerHeight,
    groupInnerWidth,
  };
};

// Bar chart IDs
export const useBarChartIDs = () => [
  5,
  8,
  10,
  12,
]; /*
}
if (startDate === endDate) {
  /* options = options.filter((option) => option.value !== "YEARLY");
  options = options.filter((option) => option.value !== "MONTHLY");
  options = options.filter((option) => option.value !== "WEEKLY");
  options = options.filter((option) => option.value !== "DAILY"); */ /*
}
/* if (startDate === endDate && startTime.slice(0, 2) === endTime.slice(0, 2)) {
  //options = options.filter((option) => option.value === "MEASURED");
} */
/*

let startDate = startDateTime.slice(0, 10);
let endDate = endDateTime.slice(0, 10);

console.log(startDateTime);

let startTime = startDateTime.slice(11, -1);
let endTime = endDateTime.slice(11, -1);

// Same day
if (startDate === endDate) {
  xAxisTickFormat = utcFormat("%H:%M");
}
// Same week
if (
  startDate.slice(0, 7) === endDate.slice(0, 7) &&
  +endDate.slice(9, 11) - +startDate.slice(9, 11) < 7
) {
  xAxisTickFormat = utcFormat("%b %d");
}
// Same month
if (startDate.slice(0, 7) === endDate.slice(0, 7)) {
  xAxisTickFormat = utcFormat("%b %d");
}
// Same year
if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
  xAxisTickFormat = utcFormat("%B");
}
// Different year

if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
  //options = options.filter((option) => option.value !== "YEARLY");
}
if (startDate.slice(0, 7) === endDate.slice(0, 7)) {
  //options = options.filter((option) => option.value !== "YEARLY");
  //options = options.filter((option) => option.value !== "MONTHLY");
}

if (
  startDate.slice(0, 7) === endDate.slice(0, 7) &&
  +endDate.slice(9, 11) - +startDate.slice(9, 11) < 7
) {
  /* options = options.filter((option) => option.value !== "YEARLY");
  options = options.filter((option) => option.value !== "MONTHLY");
  options = options.filter((option) => option.value !== "WEEKLY"); */
