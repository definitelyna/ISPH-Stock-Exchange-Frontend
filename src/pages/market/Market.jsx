import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import CandlestickChart from "./components/CandlestickChart";
import { formatGraphData } from "./utils";

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Market() {
  const [graphData, setGraphData] = useState([]);
  const [apiData, setApiData] = useState({});
  const [graphView, setGraphView] = useState("Day");
  const [graphRange, setGraphRange] = useState("1Y");
  const [graphStock, setGraphStock] = useState("RBH");

  useEffect(() => {
    const loadData = async () => {
      const thisApiData = await fetchApiData(
        apiUrl,
        "GET",
        "/stocks/stock-history"
      );

      setApiData(thisApiData);
      const data = formatGraphData(
        thisApiData,
        graphStock,
        graphView,
        graphRange
      );
      setGraphData(data);
    };

    loadData();
  }, []);

  const handleViewChange = (e) => {
    const newView = e.target.value;

    setGraphView(newView);
    const data = formatGraphData(apiData, graphStock, newView, graphRange);
    setGraphData(data);
  };

  const handleRangeChange = (e) => {
    const newRange = e.target.value;

    setGraphRange(newRange);
    const data = formatGraphData(apiData, graphStock, graphView, newRange);
    setGraphData(data);
  };

  const handleStockChange = (event) => {
    const newStock = event.target.value;

    setGraphStock(newStock);
    const data = formatGraphData(apiData, newStock, graphView, graphRange);
    setGraphData(data);
  };

  return (
    <Overlay>
      <Container maxWidth="100%" >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Select value={graphStock} label="Stock" onChange={handleStockChange}>
            {Object.keys(apiData).map((stockTicker) => (
              <MenuItem value={stockTicker} key={stockTicker}>
                {stockTicker}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ToggleButtonGroup
              value={graphRange}
              exclusive
              onChange={handleRangeChange}
            >
              <ToggleButton value="1D">1D</ToggleButton>
              <ToggleButton value="1W">1W</ToggleButton>
              <ToggleButton value="1M">1M</ToggleButton>
              <ToggleButton value="3M">3M</ToggleButton>
              <ToggleButton value="1Y">1Y</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={graphView}
              exclusive
              onChange={handleViewChange}
              sx={{ marginLeft: 2, color: "blue" }}
            >
              <ToggleButton value="Day">Day</ToggleButton>
              <ToggleButton value="Hour">Hour</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box sx={{ width: "100%", aspectRatio: "1/0.5", marginTop: 3 }}>
          {graphData.length == 0 ? (
            <Typography>No value</Typography>
          ) : (
            <CandlestickChart
              data={graphData}
              view={graphView}
              range={graphRange}
            />
          )}
        </Box>
      </Container>
    </Overlay>
  );
}
