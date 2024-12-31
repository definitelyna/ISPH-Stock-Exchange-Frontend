import { Card } from "@mui/material";
import HeaderStockCard from "./HeaderStockCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PropTypes from "prop-types";

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

NextArrow.propTypes = {
  onClick: PropTypes.func,
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

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};

const StockCardCarousel = () => {
  const carouselSetting = {
    focusOnSelect: true,
    speed: 200,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
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
    <Card sx={{ px: 6 }}>
      <Slider {...carouselSetting}>
        {testStockData.map((eachStockData, index) => (
          <HeaderStockCard stockData={eachStockData} key={index} />
        ))}
      </Slider>
    </Card>
  );
};

export default StockCardCarousel;
