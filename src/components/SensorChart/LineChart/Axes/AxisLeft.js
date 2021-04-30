export const AxisLeft = ({ yScale, innerWidth, tickOffset = 5 }) =>
  yScale.ticks().map((tickValue, i) => (
    <g
      key={i}
      className={"tick"}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} className={"tick-line"} />
      <text className={"tick-text-y"} x={-tickOffset} dy={".5em"}>
        {tickValue}
      </text>
    </g>
  ));
