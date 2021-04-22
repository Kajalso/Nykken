import { useColors } from "../../../styles/useColors";

export const Marks = ({
  data,
  dataInfo,
  xScale,
  yScale,
  yScalePos,
  yScaleNeg,
  xValue,
  yValue,
  xFormat,
  centerPadding,
  innerHeight,
}) => {
  const colors = useColors();

  let colorDarkBlue = colors.darkBlue;
  let colorRed = colors.red;

  return (
    <>
      {data.map((d, i) => {
        let value = yValue(d);
        let zeroLine = yScale(0);

        if (value < 0) {
          return (
            <rect
              className="mark-bar"
              fill={colorRed}
              stroke={colorRed}
              key={i}
              y={zeroLine}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={yScaleNeg(yValue(d))}
            >
              <title>
                {xFormat(xValue(d)) + ": " + yValue(d) + " " + dataInfo.unit}
              </title>
            </rect>
          );
        } else {
          return (
            <rect
              className="mark-bar"
              fill={colorDarkBlue}
              stroke={colorDarkBlue}
              key={i}
              y={yScale(yValue(d))}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={zeroLine - yScale(yValue(d))}
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
