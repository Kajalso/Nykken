import { useColors } from "../../../styles/useChartStyles";

export const Marks = ({
  data,
  dataInfo,
  xScale,
  yScale,
  yScaleNeg,
  xValue,
  yValue,
  xFormat,
  innerHeight,
  isUpsideDown,
}) => {
  const colors = useColors();

  let colorDarkBlue = colors.darkBlue;
  let colorRed = colors.red;

  return (
    <>
      {data.map((d, i) => {
        let value = yValue(d);
        let zeroLine = yScale(0);
        let positiveY = isUpsideDown ? zeroLine : yScale(value);
        let negativeY = isUpsideDown ? 0 : zeroLine;
        let positiveHeight = isUpsideDown
          ? yScale(value) - zeroLine
          : zeroLine - yScale(value);
        let negativeHeight = isUpsideDown ? zeroLine : yScaleNeg(value);

        if (value < 0) {
          console.log("Negative bar");
          console.log(yScale(value));
          return (
            <rect
              className="mark-bar"
              fill={colorRed}
              stroke={colorRed}
              key={i}
              y={negativeY}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={negativeHeight}
            >
              <title>
                {xFormat(xValue(d)) + ": " + yValue(d) + " " + dataInfo.unit}
              </title>
            </rect>
          );
        } else {
          console.log("Positive bar");
          console.log(yScale(value));
          return (
            <rect
              className="mark-bar"
              fill={colorDarkBlue}
              stroke={colorDarkBlue}
              key={i}
              y={positiveY}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={positiveHeight}
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
