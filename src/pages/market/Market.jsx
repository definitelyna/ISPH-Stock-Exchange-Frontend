import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import CandlestickChart from "./components/CandlestickChart";
import { formatGraphData } from "./MarketUtils";

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Market() {
  const [currentGraphData, setCurrentGraphData] = useState([]);
  const [apiData, setApiData] = useState({});
  const [graphView, setGraphView] = useState("Day");
  const [graphRange, setGraphRange] = useState("1Y");
  const [currentStock, setCurrentStock] = useState("RBH");

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
        currentStock,
        graphView,
        graphRange
      );
      setCurrentGraphData(data);
    };

    loadData();
  }, []);

  const handleViewChange = (newView) => {
    setGraphView(newView);
    const data = formatGraphData(apiData, currentStock, newView, graphRange);
    setCurrentGraphData(data);
  };

  const handleRangeChange = (newRange) => {
    setGraphRange(newRange);
    const data = formatGraphData(apiData, currentStock, graphView, newRange);
    setCurrentGraphData(data);
  };

  const handleStockChange = (event) => {
    const newStock = event.target.value;

    setCurrentStock(newStock);
    const data = formatGraphData(apiData, newStock, graphView, graphRange);
    setCurrentGraphData(data);
  };

  return (
    <Overlay>
      <Container maxWidth="100%" sx={{ padding: 3 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Select
            value={currentStock}
            label="Stock"
            onChange={handleStockChange}
          >
            {Object.keys(apiData).map((stockTicker) => (
              <MenuItem value={stockTicker} key={stockTicker}>
                {stockTicker}
              </MenuItem>
            ))}
          </Select>
          <Box>
            <ToggleButtonGroup
              value={graphRange}
              exclusive
              onChange={(e, newRange) => handleRangeChange(newRange)}
            >
              <ToggleButton value="1D">1D</ToggleButton>
              <ToggleButton value="1W">1W</ToggleButton>
              <ToggleButton value="1M">1M</ToggleButton>
              <ToggleButton value="3M">3M</ToggleButton>
              <ToggleButton value="1Y">1Y</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              sx={{ marginLeft: 3 }}
              value={graphView}
              exclusive
              onChange={(e, newView) => handleViewChange(newView)}
            >
              <ToggleButton value="Day">Day</ToggleButton>
              <ToggleButton value="Hour">Hour</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box sx={{ width: "100%", aspectRatio: "1/0.5", marginTop: 3 }}>
          <CandlestickChart data={currentGraphData} />
        </Box>
      </Container>
    </Overlay>
  );
}
