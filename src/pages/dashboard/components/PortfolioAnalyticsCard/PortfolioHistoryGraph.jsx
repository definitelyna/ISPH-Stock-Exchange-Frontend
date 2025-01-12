import CanvasJSReact from "@canvasjs/react-charts";
import PropTypes from "prop-types";
import { filterByTimePeriod } from "./utils";
import { useState } from "react";
import { useColorScheme } from "@mui/material";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const graphColors = {
  light: {
    lineColor: "#FFA500",
    gridColor: "rgba(0, 0, 0, 0.5)",
    fontColor: "black",
  },
  dark: {
    lineColor: "#FFA500",
    gridColor: "rgba(255, 255, 255, 0.5)",
    fontColor: "white",
  },
};

const PortfolioHistoryGraph = ({ data, range }) => {
  const { mode } = useColorScheme();

  const options = {
    height: 300,
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: "",
    data: [
      {
        type: "line",
        axisYType: "secondary",
        dataPoints: filterByTimePeriod(data, range),
        xValueFormatString: range == "1D" ? "D/MM/YY HH:mm:ss": "D/MM/YY - HH:mm",
        yValueFormatString: "$######.00",
        lineColor: graphColors[mode]?.lineColor,
        color: "transparent",
      },
    ],
    toolTip: {
      fontColor: "white",
    },
    axisY2: {
      crosshair: {
        enabled: true,
        color: graphColors[mode]?.gridColor,
      },
      valueFormatString: "$######.00",
      gridDashType: "solid",
      gridColor: graphColors[mode]?.gridColor,
      tickColor: graphColors[mode]?.gridColor,
      labelFontColor: graphColors[mode]?.fontColor,
    },
    axisX: {
      crosshair: {
        enabled: true,
        color: graphColors[mode]?.gridColor,
      },
      valueFormatString: range == "1D" ? "h tt" : "DD MMM",
      gridDashType: "solid",
      gridColor: graphColors[mode]?.gridColor,
      gridThickness: 1,
      lineColor: graphColors[mode]?.gridColor,
      labelFontColor: graphColors[mode]?.fontColor,
    },
  };

  return <CanvasJSChart options={options} />;
};

export default PortfolioHistoryGraph;

PortfolioHistoryGraph.propTypes = {
  data: PropTypes.array,
  range: PropTypes.string,
};
