export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 5,
  centerPadding,
}) =>
  xScale.domain().map((tickValue, i) => (
    <g
      key={i}
      transform={`translate(${xScale(tickValue)},0)`}
      className={"tick"}
    >
      <line y2={innerHeight} className={"tick-line"} />
      <text
        x={xScale.bandwidth() / 2}
        className={"tick-text-x"}
        y={innerHeight + tickOffset}
        dy={".5em"}
      >
        {tickFormat(tickValue)}
      </text>
      )
    </g>
  ));
