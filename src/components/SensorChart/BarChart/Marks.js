export const Marks = ({
  data,
  dataInfo,
  xScale,
  yScale,
  xValue,
  yValue,
  xFormat,
  innerHeight,
}) => {
  const colorDarkBlue = "#3A6DF0";
  const colorRed = "rgb(250, 143, 143)";

  return (
    <>
      {data.map((d, i) => {
        let height = yScale(yValue(d));

        if (height < 0) {
          return (
            <rect
              className="mark-bar"
              fill={colorRed}
              key={i}
              y={0}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={innerHeight}
            >
              <title>
                {console.log("Negative value.")}
                {xFormat(xValue(d)) + ": " + yValue(d) + " " + dataInfo.unit}
              </title>
            </rect>
          );
        } else {
          return (
            <rect
              className="mark-bar"
              fill={colorDarkBlue}
              key={i}
              y={height}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={innerHeight - height}
            >
              <title>
                {xFormat(xValue(d)) + ": " + yValue(d) + " " + dataInfo.unit}
              </title>
            </rect>
          );
        }
      })}
    </>
  );
};
