import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

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
    visibility: false
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
    field: "volume",
    headerName: "Volume",
    type: "number",
    width: 110,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Stocks() {
  const [apiData, setApiData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://isph-stock-exchange-backend-api.vercel.app/api/stocks/",
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setApiData(data);

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={apiData}
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
    </>
  );
}
