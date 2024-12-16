import {
  Card,
  Container,
  Box,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Overlay from "../../components/Overlay/Overlay";
import HeaderStockCard from "./components/HeaderStockCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const API_URL = import.meta.env.VITE_BACKEND_API;

const NextArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "-25px",
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <ArrowBackIosNewIcon />
    </div>
  );
};

export default function Dashboard() {
  const carouselSetting = {
    focusOnSelect: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    padding: 5,
    autoplay: true,
    autoplaySpeed: 7000,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testStockData = [
    {
      stock_name: "Rua Bien House",
      stock_ticker: "RBH",
      logoUrl: "/RuaBien_House_Logo.png",
      current_value: 203.65,
      color: "#91C64E",
      chart_data: [],
    },
    {
      stock_name: "Ho House House",
      stock_ticker: "HOH",
      logoUrl: "/Ho_House_Logo.png",
      current_value: 203.65,
      color: "#EEA44C",
      chart_data: [],
    },
    {
      stock_name: "Te Giac House",
      stock_ticker: "TGH",
      logoUrl: "/TeGiac_House_Logo.png",
      current_value: 203.65,
      color: "#BF1E2E",
      chart_data: [],
    },
    {
      stock_name: "Voi House",
      stock_ticker: "VOH",
      logoUrl: "/Voi_House_Logo.png",
      current_value: 203.65,
      color: "#90499C",
      chart_data: [],
    },
  ];

  return (
    <Overlay>
      <Grid
        container
        spacing={2}
        sx={{ padding: "30px", width: "100%", height: "100%" }}
      >
        <Grid size={12}>
          <Card sx={{ px: 6 }}>
            <Slider {...carouselSetting}>
              {testStockData.map((eachStockData, index) => (
                <HeaderStockCard stockData={eachStockData} key={index} />
              ))}
            </Slider>
          </Card>
        </Grid>

        <Grid size={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="" sx={{ fontWeight: "bold" }}>
                  Points
                </Typography>
                <Card
                  sx={{
                    backgroundColor: "#8963C6",
                    padding: 1,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ color: "white" }} variant="h6">
                      $XXX.XXX
                    </Typography>
                  </CardContent>
                </Card>

                <Typography
                  variant=""
                  sx={{ fontWeight: "bold", marginTop: 2 }}
                >
                  Invested
                </Typography>
                <Card
                  sx={{
                    backgroundColor: "black",
                    padding: 1,
                  }}
                >
                  <CardContent>
                    <Typography sx={{ color: "white" }} variant="h6">
                      $XXX.XXX
                    </Typography>
                  </CardContent>
                </Card>

                <Typography variant="" sx={{ marginTop: 2 }}>
                  Your Top Stock
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card>
            <CardContent sx={{}}></CardContent>
          </Card>
        </Grid>
      </Grid>
    </Overlay>
  );
}
