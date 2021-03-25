import { line, curveNatural } from "d3";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 7,
}) => (
  <>
    <path
      className="mark-temp-line"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
    {/*
    {data.map((d, i) => (
      <circle
        className="mark-circle"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(yValue(d))}</title>
      </circle>
    ))}
    /** */}
  </>
);
