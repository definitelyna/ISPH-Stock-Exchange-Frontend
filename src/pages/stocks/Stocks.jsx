import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";

const apiUrl = import.meta.env.VITE_BACKEND_API;

const columns = [
  {
    field: "stock_ticker",
    headerName: "Stock Ticker",
    width: 150,
    editable: false,
  },
  {
    field: "stock_name",
    headerName: "Stock Name",
    width: 150,
    editable: false,
    visibility: false,
  },
  {
    field: "full_name",
    headerName: "Name",
    type: "string",
    width: 110,
    editable: false,
  },
  {
    field: "current_price",
    headerName: "Price",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "total_volume",
    headerName: "Total Volume",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "volume_available",
    headerName: "Volume Available",
    type: "number",
    width: 200,
    editable: false,
  },
];

export default function Stocks() {
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData(apiUrl, "GET", "/stocks");
      const transformedData = transformData(data);
      setStockData(transformedData);

      console.log(transformedData);
    };
    fetchData();
  }, []);

  const transformData = (apiData) => {
    let dataArr = [];
    Object.keys(apiData).forEach((stockName) => {
      apiData[stockName]["stock_ticker"] = stockName;
      dataArr.push(apiData[stockName]);
    });

    return dataArr;
  };

  return (
    <Overlay>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={stockData}
          disableRowSelectionOnClick
          getRowId={(row) => row.stock_ticker}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </Overlay>
  );
}
