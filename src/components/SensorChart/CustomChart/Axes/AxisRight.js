export const AxisRight = ({ yScale, innerWidth, tickOffset = 5 }) =>
  yScale.ticks().map((tickValue, i) => (
    <g
      key={i}
      className={"tick"}
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <text
        className={"tick-text-y right"}
        x={innerWidth + tickOffset}
        dy={".5em"}
      >
        {tickValue}
      </text>
    </g>
  ));
