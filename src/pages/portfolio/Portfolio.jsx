import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import useAuth from "../../firebase/AuthService";
import { Doughnut } from "react-chartjs-2";
import { Box, Container, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StockCard from "./components/StockCard";
import Grid from "@mui/material/Grid2";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Portfolio() {
  const [doughnutData, setDoughnutData] = useState();
  const [asset, setAsset] = useState({});

  const { user } = useAuth();
  const userID = user?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await fetchApiData(
          apiUrl,
          "GET",
          `/user/portfolio/${userID}`
        );
        const thisDoughnutData = transformedDoughnutData(data);
        setDoughnutData(thisDoughnutData);
        updateAssetObject(data);
        console.log(data);
      }
    };

    fetchData();
  }, [user, userID]);

  const transformedDoughnutData = (apiData) => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Value",
          data: [],
          backgroundColor: [],
        },
      ],
    };

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
    data.labels.push("Points");
    data.datasets[0].data.push(apiData.points_balance);

    return data;
  };

  const updateAssetObject = (apiData) => {
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
    console.log(newAssetData);
    setAsset(newAssetData);
  };

  const CenterTextPlugin = {
    id: "centerText",
    afterDraw(chart) {
      const { width } = chart;
      const { ctx } = chart;
      ctx.save();

      // Text properties
      const fontSize = (width / 100) * 6;
      ctx.font = `${fontSize}px Arial`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white"; // Set text color

      const totalAsset = (asset) =>
        Object.values(asset).reduce((a, b) => a + b, 0);
      const text = `Total Assets: ${totalAsset(asset)}`;
      const maxWidth = width * 0.4; // Set max width as a percentage of chart width
      const lineHeight = fontSize * 1.2; // Line height based on font size
      const textX = width / 2;
      const textY = chart.height / 1.8;

      // Helper function to wrap text
      const wrapText = (ctx, text, maxWidth) => {
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

      // Get wrapped lines
      const lines = wrapText(ctx, text, maxWidth);

      // Draw each line
      const totalHeight = lines.length * lineHeight;
      let startY = textY - totalHeight / 2; // Center the text vertically

      lines.forEach((line) => {
        const lineX = textX - ctx.measureText(line).width / 2; // Center each line horizontally
        ctx.fillText(line, lineX, startY);
        startY += lineHeight;
      });

      ctx.restore();
    },
  };

  const doughnutOption = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Overlay>
      <Container sx={{ padding: 3 }}>
        <Box>
          <Typography variant="h3">Your Stock Portfolio</Typography>
        </Box>
        <Box
          sx={{
            width: 300,
            height: 300,
            marginInline: "auto",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          {doughnutData ? (
            <Doughnut
              options={doughnutOption}
              data={doughnutData}
              plugins={[CenterTextPlugin]}
            />
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box>
        <Grid container spacing={2} sx={{marginTop: 5}}>
          <Grid size={{lg: 4, md: 6, xs: 12}}>
            <StockCard />
          </Grid>
          <Grid size={{lg: 4, md: 6, xs: 12}}>
            <StockCard />
          </Grid>
          <Grid size={{lg: 4, md: 6, xs: 12}}>
            <StockCard />
          </Grid>
        </Grid>
      </Container>
    </Overlay>
  );
}
