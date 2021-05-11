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
  const width = 700;
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
  const yAxisLabelOffset = 45;

  // Axis formats
  const dateFormat = (d) => {
    let date = new Date(d.time_stamp_utc);
    console.log(date);
    return utcFormat("%A %d %B %Y")(date);
  };

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

// Set x-axis title depending on data in chart
export const useXAxisTitle = (startDateTime, endDateTime) => {
  let xAxisTitle = utcFormat("%A %d %B %Y");
  let startDate = startDateTime.slice(0, 10);
  let endDate = endDateTime.slice(0, 10);
  let startTime = startDateTime.slice(11, -1);
  let endTime = endDateTime.slice(11, -1);

  let date = new Date(startDateTime);

  // Set label based on start and end datetime
  if (startDate.slice(0, 4) !== endDate.slice(0, 4)) {
    // Different year
    xAxisTitle = utcFormat(" ")(date);
  }
  if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
    // Same year
    xAxisTitle = utcFormat("%Y")(date);
  }
  if (startDate.slice(0, 7) === endDate.slice(0, 7)) {
    // Same month
    xAxisTitle = utcFormat("%B %Y")(date);
  }
  if (
    startDate.slice(0, 7) === endDate.slice(0, 7) &&
    +endDate.slice(9, 11) - +startDate.slice(9, 11) < 7
  ) {
    // Same week
    xAxisTitle = utcFormat("%B %Y")(date);
  }
  if (startDate === endDate) {
    //Same day
    xAxisTitle = utcFormat("%A %d %B %Y")(date);
  }
  if (startDate === endDate && startTime.slice(0, 2) === endTime.slice(0, 2)) {
    //Same hour
    xAxisTitle = utcFormat("%A %d %B %Y")(date);
  }

  return xAxisTitle;
};

// Set x-axis depending on granulartiy and start/end-times
export const useXAxisTickFormat = (granularity, startDateTime, endDateTime) => {
  let xAxisTickFormat = utcFormat("%H:%M");
  let startDate = startDateTime.slice(0, 10);
  let endDate = endDateTime.slice(0, 10);
  let startTime = startDateTime.slice(11, -1);
  let endTime = endDateTime.slice(11, -1);

  // Set label based on granularity
  if (granularity === "YEARLY") {
    xAxisTickFormat = utcFormat("%b %Y");
  } else if (granularity === "MONTHLY") {
    xAxisTickFormat = utcFormat("%b '%y");
  } else if (granularity === "WEEKLY") {
    xAxisTickFormat = utcFormat("Week %W");
  } else if (granularity === "DAILY") {
    xAxisTickFormat = utcFormat("%d.%m");
  } else if (granularity === "HOURLY") {
    xAxisTickFormat = utcFormat("%H:%M");
  }

  // Set label based on start and end datetime
  if (startDate.slice(0, 4) !== endDate.slice(0, 4)) {
    // Different year
    xAxisTickFormat = utcFormat("%b '%y");
  }
  if (startDate.slice(0, 4) === endDate.slice(0, 4)) {
    // Same year
    xAxisTickFormat = utcFormat("%d.%m");
  }
  if (startDate.slice(0, 7) === endDate.slice(0, 7)) {
    // Same month
    xAxisTickFormat = utcFormat("%d.%m");
  }
  if (
    startDate.slice(0, 7) === endDate.slice(0, 7) &&
    +endDate.slice(9, 11) - +startDate.slice(9, 11) < 7
  ) {
    // Same week
    xAxisTickFormat = utcFormat("%d.%m");
  }
  if (startDate === endDate) {
    //Same day
    xAxisTickFormat = utcFormat("%H:%M");
  }
  if (startDate === endDate && startTime.slice(0, 2) === endTime.slice(0, 2)) {
    //Same hour
    xAxisTickFormat = utcFormat("%H:%M");
  }

  // Special cases

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
