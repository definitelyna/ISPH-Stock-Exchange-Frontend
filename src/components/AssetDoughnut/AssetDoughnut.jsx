import { wrapText } from "../../pages/portfolio/PortfolioUtils";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import useDoughnutChart from "../../hooks/useDoughnutChart";

export default function AssetDoughnutChart() {
  const { doughnutData, asset, loading } = useDoughnutChart();

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
    <>
      {loading ? (
        <Typography>Loading</Typography>
      ) : (
        <Doughnut
          options={doughnutOption}
          data={doughnutData}
          plugins={[CenterTextPlugin]}
        />
      )}
    </>
  );
}

AssetDoughnutChart.propTypes = {
  apiData: PropTypes.object,
};
