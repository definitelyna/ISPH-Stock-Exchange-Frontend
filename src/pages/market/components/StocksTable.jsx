import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { fetchApiData } from "../../../api/apiClient";
import useSocket from "../utils/useSocket";

const apiUrl = import.meta.env.VITE_BACKEND_API;
const SOCKET_URL = import.meta.env.VITE_BACKEND_WS;

const columns = [
  {
    field: "stock_ticker",
    headerName: "Stock Ticker",
    width: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "stock_name",
    headerName: "Stock Name",
    width: 150,
    editable: false,
    flex: 1,
  },
  {
    field: "full_name",
    headerName: "Name",
    type: "string",
    width: 110,
    editable: false,
    flex: 1,
  },
  {
    field: "current_price",
    headerName: "Price",
    type: "number",
    width: 110,
    editable: false,
    flex: 1,
  },
  {
    field: "total_volume",
    headerName: "Total Volume",
    type: "number",
    width: 110,
    editable: false,
    flex: 1,
  },
  {
    field: "volume_available",
    headerName: "Volume Available",
    type: "number",
    width: 200,
    editable: false,
    flex: 1,
  },
];

const visibilityModel = {
  stock_ticker: true,
  stock_name: false,
  full_name: true,
  current_price: true,
  total_volume: true,
  volume_available: true,
};

export default function StocksTable() {
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData(apiUrl, "GET", "/stocks");
      const transformedData = transformData(data);
      setStockData(transformedData);
    };
    fetchData();
  }, []);

  const [data, sendData] = useSocket(SOCKET_URL, "stocks");
  console.log(data)

  const transformData = (apiData) => {
    let dataArr = [];
    Object.keys(apiData).forEach((stockName) => {
      apiData[stockName]["stock_ticker"] = stockName;
      dataArr.push(apiData[stockName]);
    });

    return dataArr;
  };

  return (
    <DataGrid
      sx={{ border: 1 }}
      rows={stockData}
      disableRowSelectionOnClick
      getRowId={(row) => row.stock_ticker}
      columns={columns}
      disableColumnResize={false}
      hideFooter
      columnVisibilityModel={visibilityModel}
    />
  );
}
