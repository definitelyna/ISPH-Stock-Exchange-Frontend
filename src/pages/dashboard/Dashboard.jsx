import Grid from "@mui/material/Grid2";
import Overlay from "../../components/Overlay/Overlay";
import HeaderStockCard from "./components/Carousel/HeaderStockCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StockCardCarousel from "./components/Carousel/StockCardCarousel";
import BalanceInfoCard from "./components/BalanceInfoCard";
import LeaderBoardCard from "./components/Leaderboard/LeaderboardCard";
import WatchlistCard from "./components/Watchlist/WatchlistCard";
import PortfolioAnalyticsCard from "./components/PortfolioAnalyticsCard/PortfolioAnalyticCard";
import { Watch } from "@mui/icons-material";
import NewsCard from "./components/News/NewsCard";

const API_URL = import.meta.env.VITE_BACKEND_API;
const SECOND_ROW_HEIGHT = 275;

export default function Dashboard() {
  return (
    <Overlay>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Row 1 */}
        <Grid size={12}>
          <StockCardCarousel />
        </Grid>

        {/* Row 2 */}
        <Grid size={4}>
          <BalanceInfoCard sx={{ height: SECOND_ROW_HEIGHT }} />
        </Grid>

        <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
          <LeaderBoardCard sx={{ height: SECOND_ROW_HEIGHT }} />
        </Grid>

        <Grid size={4}>
          <NewsCard sx={{ height: SECOND_ROW_HEIGHT, overflowY: "scroll", scrollbarWidth: "none" }} />
        </Grid>

        {/* Row 3 */}

        <Grid size={8}>
          <PortfolioAnalyticsCard />
        </Grid>

        <Grid size={4}>
          <WatchlistCard sx={{height: "100%"}}/>
        </Grid>
      </Grid>
    </Overlay>
  );
}
