import { line, curveNatural } from "d3";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  xFormat,
  circleRadius = 7,
  curveStyle = curveNatural,
}) => (
  <>
    <path
      className="mark-temp-line"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveStyle)(data)}
    />
    {data.map((d, i) => (
      <circle
        className="mark-circle"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{xFormat(xValue(d)) + ": " + yValue(d)}</title>
      </circle>
    ))}
  </>
);
