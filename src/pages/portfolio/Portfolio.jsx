import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import useAuth from "../../firebase/AuthService";
import { Doughnut } from "react-chartjs-2";
import { Box, Container, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Portfolio() {
  const [doughnutData, setDoughnutData] = useState();
  const [asset, setAsset] = useState({
    stocks: 0,
    points: 0,
  });

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
      const stockValue = stockPossession[stock].quantity; //Currently quantity, needs multiply price to be value when quang adds price

      data.labels.push(stock);
      data.datasets[0].data.push(stockValue);
    });

    //Add balance to asset
    data.labels.push("Points");
    data.datasets[0].data.push(apiData.points_balance);

    return data;
  };

  const updateAssetObject = (apiData) => {
    let totalStockValue = 0;
    let totalPointValue = apiData.points_balance;
    const stockPossession = apiData.items;
    Object.keys(stockPossession).forEach((stock) => {
      const thisStockValue = stockPossession[stock].quantity; //Currently quantity, needs multiply price to be value when quang adds price
      totalStockValue += thisStockValue;
    });

    setAsset({
      stocks: totalStockValue,
      points: totalPointValue,
    });
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

      const text = `Total Assets: ${asset.stocks + asset.points}`;
      const maxWidth = width * 0.4; // Set max width as a percentage of chart width
      const lineHeight = fontSize * 1.2; // Line height based on font size
      const textX = width / 2;
      const textY = chart.height/1.8;

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
      <Container>
      <Box>
        
      </Box>
        <Box
          sx={{
            width: 300,
            height: 300,
            marginInline: "auto",
            justifyContent: "center",
            marginTop: 5
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
      </Container>
    </Overlay>
  );
}
