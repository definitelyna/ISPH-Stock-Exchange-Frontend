import { wrapText } from "../../PortfolioUtils";
import { Doughnut } from "react-chartjs-2";
import { Typography, useColorScheme } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import useDoughnutChart from "./utils";

const getTextColor = (mode) => (mode === "light" ? "black" : "white");

export default function AssetDoughnutChart() {
  const { doughnutData, asset, loading } = useDoughnutChart();
  const { mode } = useColorScheme();
  const [chartKey, setChartKey] = useState(0); // Track chart re-renders

  // Force re-render of chart when `mode` changes
  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1);
  }, [mode]);

  const CenterTextPlugin = useMemo(() => {
    return {
      id: "centerText",
      afterDraw(chart) {
        const { width } = chart;
        const { ctx } = chart;

        ctx.save();

        // Text properties
        const fontSize = (width / 100) * 6;
        ctx.font = `${fontSize}px Arial`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = getTextColor(mode); // Set text color

        const totalAsset = (asset) =>
          Object.values(asset).reduce((a, b) => a + b, 0);
        const text = `Total Assets: ${totalAsset(asset)}`;
        const maxWidth = width * 0.4; // Set max width as a percentage of chart width
        const lineHeight = fontSize * 1.2; // Line height based on font size
        const textX = width / 2;
        const textY = chart.height / 1.8;

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
  }, [mode, asset]); // Re-create the plugin when `mode` or `asset` changes

  const doughnutOption = useMemo(
    () => ({
      plugins: {
        legend: {
          display: false,
        },
      },
    }),
    []
  );

  return (
    <>
      {!loading ? (
        doughnutData ? (
          <Doughnut
            key={chartKey} // Ensure chart re-renders on mode change
            options={doughnutOption}
            data={doughnutData}
            plugins={[CenterTextPlugin]}
          />
        ) : (
          <Typography>
            Please check your internet and refresh the page
          </Typography>
        )
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
}

AssetDoughnutChart.propTypes = {
  apiData: PropTypes.object,
};
