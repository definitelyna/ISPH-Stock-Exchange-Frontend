import CanvasJSReact from "@canvasjs/react-charts";
import PropTypes, { object } from "prop-types";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CandlestickChart({ data }) {
  const options = {
    backgroundColor: "black",
    theme: "dark1",
    zoomEnabled: true,
    axisY: {
      includeZero: false,
      title: "Prices",
      prefix: "$ ",
    },
    axisX: {
      interval: 2,
      intervalType: "week",
      valueFormatString: "DD-MMM-YY",
      labelAngle: 0,
      scaleBreaks: {
        spacing: 0,
      },
    },
    dataPointWidth: 5,
    data: [
      {
        type: "candlestick",
        risingColor: "green",
        fallingColor: "red",
        color: "white",
        yValueFormatString: "$###0.00",
        xValueFormatString: "DD/MM/YY",
        name: "ISPH Stock Chart",
        dataPoints: data,
      },
    ],
  };
  return <CanvasJSChart options={options} />;
}

CandlestickChart.propTypes = {
  data: PropTypes.arrayOf(object),
};
