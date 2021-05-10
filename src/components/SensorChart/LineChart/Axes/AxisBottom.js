export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 5,
  tickAmount = 5,
}) =>
  xScale.ticks(tickAmount).map((tickValue, i) => (
    <g
      key={i}
      transform={`translate(${xScale(tickValue)},0)`}
      className={"tick"}
    >
      <line y2={innerHeight} className={"tick-line"} />
      <text className={"tick-text-x"} y={innerHeight + tickOffset} dy={".5em"}>
        {tickFormat(tickValue)}
        {console.log(tickFormat)}
      </text>
    </g>
  ));
