import {
  Box,
  Container,
  ToggleButton,
  ToggleButtonGroup,
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
  const [graphView, setGraphView] = useState("day");
  const [graphRange, setGraphRange] = useState("1Y");
  const [currentStock, setCurrentStock] = useState("HOH");

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
            value={graphView}
            exclusive
            onChange={(e, newView) => handleViewChange(newView)}
          >
            <ToggleButton value="Day">Day</ToggleButton>
            <ToggleButton value="Hour">Hour</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ width: "100%", aspectRatio: "1/0.5", marginTop: 3 }}>
          <CandlestickChart data={currentGraphData} />
        </Box>
      </Container>
    </Overlay>
  );
}
