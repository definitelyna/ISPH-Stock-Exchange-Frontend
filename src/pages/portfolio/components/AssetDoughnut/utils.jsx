import { useState, useEffect } from "react";
import { fetchApiData } from "../../../../api/apiClient";
import useAuth from "../../../../firebase/AuthService";

export const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? " " : "") + word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function useDoughnutChart() {
  const [doughnutData, setDoughnutData] = useState(null);
  const [asset, setAsset] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const userID = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const data = await fetchApiData(
            API_URL,
            "GET",
            `/user/portfolio/${userID}`
          );

          const thisDoughnutData = getTransformedAssetDoughnutData(data);
          const newAssetData = getAssetObject(data);

          setDoughnutData(thisDoughnutData);
          setAsset(newAssetData);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, userID]);

  return { doughnutData, asset, loading };
}

const getAssetObject = (apiData) => {
  let newAssetData = {};
  let totalPointValue = apiData.points_balance;
  const stockPossession = apiData.items;

  Object.keys(stockPossession).forEach((stock) => {
    const thisStockData = stockPossession[stock];
    const existingStocksInAssetData = Object.keys(newAssetData);
    const thisStockSector = thisStockData.stockSector;
    const thisStockValue = thisStockData.evaluation;

    if (existingStocksInAssetData.includes(thisStockSector)) {
      newAssetData[thisStockSector] += thisStockValue;
    } else {
      newAssetData[thisStockSector] = thisStockValue;
    }
  });

  newAssetData.points = totalPointValue;
  return newAssetData;
};

const getTransformedAssetDoughnutData = (apiData) => {
  let data = {
    labels: [],
    datasets: [
      {
        label: "Value",
        data: [],
        backgroundColor: [
          "#53ff45",
          "#1E2EDE",
          "#6A041D",
          "#F5B841",
          "#F4FF52",
        ],
      },
    ],
  };

  data.labels.push("Points");
  data.datasets[0].data.push(apiData.points_balance);

  const stockPossession = apiData.items;

  Object.keys(stockPossession).forEach((stock) => {
    const thisStockData = stockPossession[stock];
    const thisStockSector = thisStockData.stockSector;
    const thisStockValue = thisStockData.evaluation;
    if (data.labels.includes(thisStockSector)) {
      const labelIndex = data.labels.indexOf(thisStockSector);
      data.datasets[0].data[labelIndex] += thisStockValue;
    } else {
      data.labels.push(thisStockSector);
      data.datasets[0].data.push(thisStockValue);
    }
  });

  //Add balance to asset

  return data;
};
