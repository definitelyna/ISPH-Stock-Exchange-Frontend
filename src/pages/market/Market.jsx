import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Overlay from "../../components/Overlay";
//Get stock price history data from api in form of object, get Object.keys() as xAxis and Object.values() as series

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://isph-sse.vercel.app/stocks/stock-history",
          {
            method: "GET",
          }
        );

        const data = await result.json();
        setCurrentGraphData(getGraphData(data, "AZC", "daily"));
        setDailyGraphData(getGraphData(data, "AZC", "daily"));
        setHourlyGraphData(getGraphData(data, "AZC", "hourly"));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const getGraphData = (thisApiData, stockTicker, view) => {
    console.log(thisApiData);
    let tickerFilteredData = thisApiData[stockTicker];

    let sortedApiData = tickerFilteredData.sort(function (a, b) {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });

    let returnGraphData = [];

    const formatDate = (date) => {
      return view === "daily"
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

    returnGraphData.forEach((thisDayData) => {
      const prices = thisDayData.y;
      const openPrice = prices[0];
      const highPrice = Math.max(...prices);
      const lowPrice = Math.min(...prices);
      const closePrice = prices[prices.length - 1];

      thisDayData.y = [openPrice, highPrice, lowPrice, closePrice];
    });

    return returnGraphData;
  };

  const candlestickChartOption = {
    noData: {
      text: "Loading... ",
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
        format: "dd MMM",
      },
    },
    chart: {
      height: "50%",
      width: "100%",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: true,
        },
        autoSelected: "pan",
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      events: {
        zoomed: (chartContext, { xaxis }) => {
          const start = new Date(xaxis.min).setHours(0, 0, 0);
          const end = new Date(xaxis.max).setHours(0, 0, 0);

          // Check if the range represents a single day
          if (end - start <= 86400000 && isAnotherHour) {
            console.log(end, start);
            const filteredHourlyData = hourlyGraphData.filter(
              (data) => data.x >= xaxis.min && data.x <= xaxis.max
            );
            console.log(filteredHourlyData);
            setCurrentGraphData(filteredHourlyData);
            setIsAnotherHour(false);
          } else if (end - start >= 86400000) {
            setCurrentGraphData(dailyGraphData);
            setIsAnotherHour(true);
          }
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {},
  };

  const handleChangeView = (event, newAlignment) => {
    setGraphView(newAlignment);
  };

  return (
    <Overlay>
      <Container maxWidth="100%">
        <Box sx={{ width: "100%" }}>
          {/* <Chart
            type="candlestick"
            width="100%"
            options={candlestickChartOption}
            series={[
              {
                data: currentGraphData,
              },
            ]}
          /> */}
          {/* <IgrFinancialChart
            width="100%"
            height="100%"
            isToolbarVisible={false}
            chartType="Candle"
            chartTitle="S&P 500"
            titleAlignment="Left"
            titleLeftMargin="25"
            titleTopMargin="10"
            titleBottomMargin="10"
            subtitle="CME - CME Delayed Price, Currency in USD"
            subtitleAlignment="Left"
            subtitleLeftMargin="25"
            subtitleTopMargin="5"
            subtitleBottomMargin="10"
            yAxisLabelLocation="OutsideLeft"
            yAxisMode="Numeric"
            yAxisTitle="Financial Prices"
            yAxisTitleLeftMargin="10"
            yAxisTitleRightMargin="5"
            yAxisLabelLeftMargin="0"
            zoomSliderType="None"
            dataSource={this.data}
          /> */}
        </Box>

        <ToggleButtonGroup
          value={graphView}
          exclusive
          onChange={(e, newView) => setGraphView(newView)}
        >
          <ToggleButton value="Daily">Day</ToggleButton>
          <ToggleButton value="Hourly">Hour</ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </Overlay>
  );
}
