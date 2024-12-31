
import Grid from "@mui/material/Grid2";
import Overlay from "../../components/Overlay/Overlay";
import HeaderStockCard from "./components/Carousel/HeaderStockCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StockCardCarousel from "./components/Carousel/StockCardCarousel";
import BalanceInfoCard from "./components/BalanceInfoCard";
import LeaderBoardCard from "./components/LeaderboardCard";

const API_URL = import.meta.env.VITE_BACKEND_API;

export default function Dashboard() {
  return (
    <Overlay>
      <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
        <Grid size={12}>
          <StockCardCarousel />
        </Grid>

        <Grid size={4}>
          <BalanceInfoCard />
        </Grid>
        <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
          <LeaderBoardCard />
        </Grid>
      </Grid>
    </Overlay>
  );
}
