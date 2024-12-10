import { Card, Container, Box, Typography, CardContent } from "@mui/material";
import Overlay from "../../components/Overlay/Overlay";
import { fetchApiData } from "../../api/apiClient";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_BACKEND_API;

export default function Dashboard() {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData(apiUrl, "GET", "/stocks");
      const newHeaderData = getFormattedHeaderData(data);
      console.log(data);
      setHeaderData(newHeaderData);
    };

    fetchData();
  }, []);

  const getFormattedHeaderData = (apiData) => {
    let returnArr = [];
    Object.keys(apiData).forEach((stock) => {
      const current_price = apiData[stock].current_price;
      const full_name = apiData[stock].full_name;
      returnArr.push([stock, full_name, current_price]);
    });

    return returnArr;
  };

  return (
    <Overlay>
      <Container>
        <Card sx={{ marginTop: 3 }} variant="outlined">
          <CardContent sx={{display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {headerData.map((stock, index) => (
                <Typography key={index}>
                  {stock[0]} ({stock[1]}): <b>${stock[2]}</b>
                </Typography>
              ))}
          </CardContent>
        </Card>
      </Container>
    </Overlay>
  );
}
