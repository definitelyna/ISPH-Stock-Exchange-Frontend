import {
  Card,
  CardContent,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Typography } from "@mui/material";
import PortfolioHistoryGraph from "./PortfolioHistoryGraph";
import PropTypes from "prop-types";
import { useState } from "react";

const PortfolioAnalyticsCard = ({ sx }) => {
  const [graphRange, setGraphRange] = useState("1D");

  const data = [
    { x: new Date(2024, 9, 2), y: 15.09 }, // October is monthIndex 9
    { x: new Date(2024, 9, 5), y: 45.37 },
    { x: new Date(2024, 9, 11), y: 30.4 },
    { x: new Date(2024, 9, 12), y: 29.78 },
    { x: new Date(2024, 9, 18), y: 75.24 },
    { x: new Date(2024, 9, 22), y: 39.91 },
    { x: new Date(2024, 9, 23), y: 85.35 },
    { x: new Date(2024, 9, 25), y: 67.66 },
    { x: new Date(2024, 9, 27), y: 91.01 },
    { x: new Date(2024, 9, 29), y: 83.0 },
    { x: new Date(2024, 9, 31), y: 83.22 },
    { x: new Date(2024, 9, 31), y: 70.97 },
    { x: new Date(2025, 0, 5), y: 11.2 }, // January is monthIndex 0
    { x: new Date(2025, 0, 6), y: 17.86 },
    { x: new Date(2025, 0, 8), y: 86.73 },
    { x: new Date(2025, 0, 12, 0, 59), y: 96.55 },
    { x: new Date(2025, 0, 12, 14), y: 79.38 },
    { x: new Date(2025, 0, 12, 15), y: 10.3 },
    { x: new Date(2025, 0, 12, 16), y: 91.78 },
    { x: new Date(2025, 0, 12, 17), y: 88.51 },
    { x: new Date(2025, 0, 12, 18), y: 89.35 },
    { x: new Date(2025, 0, 12, 19), y: 89.44 },
    { x: new Date(2025, 0, 12, 20), y: 70.92 },
    { x: new Date(2025, 0, 12, 21), y: 30.35 },
  ];

  const handleRangeChange = (event) => {
    setGraphRange(event.target.value);
  };

  return (
    <Card sx={sx}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            Portfolio Analytics
          </Typography>
          <ToggleButtonGroup
            value={graphRange}
            exclusive
            onChange={handleRangeChange}
            size="small"
            sx={{ height: 30, outline: "none" }}
          >
            <ToggleButton value="1D">1D</ToggleButton>
            <ToggleButton value="1W">1W</ToggleButton>
            <ToggleButton value="1M">1M</ToggleButton>
            <ToggleButton value="3M">3M</ToggleButton>
            <ToggleButton value="1Y">1Y</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <PortfolioHistoryGraph data={data} range={graphRange} />
      </CardContent>
    </Card>
  );
};

export default PortfolioAnalyticsCard;

PortfolioAnalyticsCard.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
};
