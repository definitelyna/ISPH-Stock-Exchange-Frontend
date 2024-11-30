import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import {
  IgrFinancialChartModule,
  IgrFinancialChart,
} from "igniteui-react-charts";
import { fetchApiData } from "../../api/apiClient";
//Get stock price history data from api in form of object, get Object.keys() as xAxis and Object.values() as series

const apiUrl = import.meta.env.VITE_BACKEND_API
IgrFinancialChartModule.register();

const getFormattedDate = (dt) => {
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

const getFormattedDateWithHour = (dt) => {
  return (
    dt.getFullYear() +
    "/" +
    (dt.getMonth() + 1) +
    "/" +
    dt.getDate() +
    "/" +
    dt.getHours()
  );
};
export default function Market() {
  const [hourlyGraphData, setHourlyGraphData] = useState([]);
  const [dailyGraphData, setDailyGraphData] = useState([]);
  const [currentGraphData, setCurrentGraphData] = useState([]);
  const [isAnotherHour, setIsAnotherHour] = useState(true);
  const [graphView, setGraphView] = useState("Daily");
  const [apiData, setApiData] = useState();
  const [currentStock, setCurrentStock] = useState("AZC");

  useEffect(() => {
    const loadData = async () => {
      const thisApiData = await fetchApiData(apiUrl, "GET", "/stocks/stock-history");
      console.log(thisApiData)
      setApiData(thisApiData);
      setGraphData(thisApiData, currentStock, "day");
    };

    loadData();
  }, []);

  const setGraphData = (thisApiData = apiData, stockTicker, view) => {
    let tickerFilteredData = thisApiData[stockTicker];
    let sortedApiData = tickerFilteredData.sort(function (a, b) {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });

    let returnGraphData = [];

    const formatDate = (date) => {
      return view === "day"
        ? getFormattedDate(date)
        : getFormattedDateWithHour(date);
    };

    sortedApiData.forEach((eachData) => {
      const currentDate = new Date(eachData.timestamp);
      const formattedDate = formatDate(currentDate); //Converts date type to YYYY/MM/DD
      const lastDayData = returnGraphData[returnGraphData.length - 1];

      if (returnGraphData.length == 0) {
        returnGraphData.push({
          x: currentDate,
          y: [eachData.price],
        });
      } else if (formatDate(lastDayData.x) == formattedDate) {
        lastDayData.y.push(eachData.price);
      } else {
        returnGraphData.push({
          x: currentDate,
          y: [eachData.price],
        });
      }
    });

    returnGraphData.forEach((thisDayData, index) => {
      const prices = thisDayData.y;
      const openPrice = prices[0];
      const highPrice = Math.max(...prices);
      const lowPrice = Math.min(...prices);
      const closePrice = prices[prices.length - 1];

      returnGraphData[index] = {
        Date: thisDayData.x,
        Open: openPrice,
        High: highPrice,
        Low: lowPrice,
        Close: closePrice,
      };
    });

    setCurrentGraphData(returnGraphData);
  };

  const handleChangeView = (event, newView) => {
    console.log(newView);
  };

  const CustomTooltip = (context) => {
    console.log(context);
    if (!context || !context.item) {
      return null; // Handle cases where context or item is undefined
    }

    const { item } = context; // Access data for the hovered item
    return (
      <div style={{ padding: "10px", background: "#333", color: "#fff" }}>
        sup
      </div>
    );
  };

  return (
    <Overlay>
      <Container maxWidth="100%">
        <Box sx={{ width: "100%", aspectRatio: "1/0.5" }}>
          <IgrFinancialChart
            tooltipTemplate={CustomTooltip}
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            chartTitle={currentStock}
            titleAlignment="Left"
            titleLeftMargin="25"
            titleTopMargin="10"
            titleBottomMargin="10"
            subtitle="Currency in ISPHD"
            subtitleAlignment="Left"
            subtitleLeftMargin="25"
            subtitleTopMargin="5"
            subtitleBottomMargin="10"
            yAxisLabelLocation="OutsideLeft"
            yAxisMode="Numeric"
            yAxisTitle="Prices"
            yAxisTitleLeftMargin="10"
            yAxisTitleRightMargin="5"
            yAxisLabelLeftMargin="0"
            zoomSliderType="None"
            dataSource={currentGraphData}
            tooltipTemplates={CustomTooltip}
          />
        </Box>

        <ToggleButtonGroup
          value={graphView}
          exclusive
          onChange={(e, newView) => console.log(`changed view to ${newView}`)}
        >
          <ToggleButton value="Day">Day</ToggleButton>
          <ToggleButton value="Hour">Hour</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </Overlay>
  );
}
