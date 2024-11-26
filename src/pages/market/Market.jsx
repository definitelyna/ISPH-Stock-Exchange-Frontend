import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
//Get stock price history data from api in form of object, get Object.keys() as xAxis and Object.values() as series

const getFormattedDate = (dt) => {
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
};

export default function Market() {
  const [graphData, setGraphData] = useState([]);
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
        setGraphData(apiToGraphData(data, "AZC"));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const apiToGraphData = (thisApiData, stockTicker) => {
    let tickerFilteredData = thisApiData[stockTicker];

    let sortedApiData = tickerFilteredData.sort(function (a, b) {
      return new Date(a.timestamp) - new Date(b.timestamp);
    });

    let returnGraphData = [];

    sortedApiData.forEach((eachData) => {
      const currentDate = new Date(eachData.timestamp);
      const formattedDate = getFormattedDate(currentDate); //Converts date type to YYYY/MM/DD
      const lastDayData = returnGraphData[returnGraphData.length - 1];

      if (returnGraphData.length == 0) {
        returnGraphData.push({
          x: currentDate,
          y: [eachData.price],
        });
      } else if (getFormattedDate(lastDayData.x) == formattedDate) {
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

  return (
    <>
      {/* <FormControlLabel label="RBB" control={<Checkbox />} /> */}
      <ReactApexChart
        width={800}
        type="candlestick"
        options={{
          tooltip: {
            theme: "dark",
            x: {
              show: true,
            },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {},
        }}
        series={[
          {
            data: graphData,
          },
        ]}
      />
    </>
  );
}
