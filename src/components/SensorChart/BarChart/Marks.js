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
        let height = yValue(d);
        console.log(height);

        if (height < 0) {
          return (
            <rect
              className="mark-bar"
              fill={colorRed}
              stroke={colorRed}
              key={i}
              y={innerHeight / 2}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={yScalePos(Math.abs(height))}
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
              y={innerHeight / 2 - yScalePos(height)}
              x={xScale(xValue(d))}
              width={xScale.bandwidth()}
              height={yScalePos(height)}
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
