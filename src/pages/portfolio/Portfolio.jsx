import { useEffect, useState } from "react";
import Overlay from "../../components/Overlay/Overlay";
import { Box, Container, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import StockCard from "./components/StockCard";
import Grid from "@mui/material/Grid2";
import AssetDoughnutChart from "./components/AssetDoughnut/AssetDoughnut";

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function Portfolio() {
  return (
    <Overlay>
      <Container sx={{ padding: 3 }}>
        <Box>
          <Typography variant="h3">Your Stock Portfolio</Typography>
        </Box>
        <Box
          sx={{
            width: 300,
            height: 300,
            marginInline: "auto",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <AssetDoughnutChart />
        </Box>
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
          <Grid size={{ lg: 4, md: 6, xs: 12 }}>
            <StockCard />
          </Grid>
        </Grid>
      </Container>
    </Overlay>
  );
}
