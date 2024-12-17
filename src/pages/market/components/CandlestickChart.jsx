import CanvasJSReact from "@canvasjs/react-charts";
import PropTypes, { object } from "prop-types";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CandlestickChart({ data, view, range }) {
  let thisIntervalType, thisInterval
  
  switch (range) {
    case "1D":
      thisIntervalType = "hour"
      thisInterval = 1
      break
    case "1M":
      thisIntervalType = "week"
      thisInterval = 1
      break
    case "3M":
      thisInterval = 2
      thisIntervalType = "week"
      break
    case "1Y":
      thisInterval = 1
      thisIntervalType = "month"
      break
  }

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
      interval: thisInterval,
      intervalType: thisIntervalType,
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
        xValueFormatString: view == "Day" ? "DD/MM/YY" : "HH:mm DD/MM/YY",
        name: "ISPH Stock Chart",
        dataPoints: data,
      },
    ],
  };
  return <CanvasJSChart options={options} />;
}

CandlestickChart.propTypes = {
  data: PropTypes.arrayOf(object),
  view: PropTypes.string,
  range: PropTypes.string,
};
