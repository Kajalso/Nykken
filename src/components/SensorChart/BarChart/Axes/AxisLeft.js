export const AxisLeft = ({ yScale, innerWidth }) => {
  return yScale.ticks().map((tickValue) => (
    <>
      <line
        y1={yScale(tickValue)}
        y2={yScale(tickValue)}
        x1={0}
        x2={innerWidth}
        className={"tick-line"}
      />
      <text className={"tick-text-y"} x={-5} y={yScale(tickValue)} dy={".5em"}>
        {tickValue}
      </text>
    </>
  ));
};
