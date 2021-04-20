import { line, curveNatural } from "d3";

const colorRed = "rgb(250, 143, 143)";
const colorBlue = "rgb(156, 204, 248)";
const colorPurple = "rgb(214, 106, 241)";
const colorDarkBlue = "#3A6DF0";

export const Marks = ({
  data,
  dataInfo,
  xScale,
  yScale,
  xValue,
  yValue,
  xFormat,
  circleRadius = 7,
  curveStyle = curveNatural,
}) => {
  let markColor = colorRed;
  const id = dataInfo.data_identifier;

  // Set color to purple for Radiation, Humidity and Wind Speed
  if (id === 3 || id === 4 || id === 6) {
    markColor = colorPurple;
  }

  return (
    <>
      <path
        className="mark-temp-line"
        stroke={markColor}
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveStyle)(data)}
      />
      {data.map((d, i) => (
        <circle
          fill={markColor}
          className="mark-circle"
          key={i}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>
            {xFormat(xValue(d)) + ": " + yValue(d) + " " + dataInfo.unit}
          </title>
        </circle>
      ))}
    </>
  );
};
