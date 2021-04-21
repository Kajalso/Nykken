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
}) => {
  const colors = useColors();

  let colorDarkBlue = colors.darkBlue;
  let colorBlue = colors.blue;
  let colorRed = colors.red;

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
              stroke={colorBlue}
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
