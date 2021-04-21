import { area, line, curveNatural } from "d3";

import { useColors } from "../../../styles/useColors";

export const Marks = ({
  data,
  dataInfo,
  xScale,
  yScale,
  xValue,
  yValue,
  xFormat,
  innerHeight,
  circleRadius = 1,
  curveStyle = curveNatural,
}) => {
  const id = dataInfo.data_identifier;
  const colors = useColors();

  let markColor = colors.blue;

  // Set color to purple for Radiation, Humidity and Wind Speed
  if (id === 3 || id === 4 || id === 6) {
    markColor = colors.purple;
  }

  // Set area fill for Snow Melting Tank and Waste Water
  const areaChart = id === 7 || id === 9 || id === 11;

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
      {areaChart && (
        <path
          className="mark-temp-area"
          fill={markColor}
          d={area()
            .x((d) => xScale(xValue(d)))
            .y0(innerHeight)
            .y1((d) => yScale(yValue(d)))
            .curve(curveStyle)(data)}
        />
      )}
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
