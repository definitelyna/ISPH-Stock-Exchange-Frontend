import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Chip,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import { getTextColor } from "../../utils/getTextColor";

export default function HeaderStockCard({ stockData }) {
  const backgroundColor = stockData.color;
  const textColor = getTextColor(backgroundColor);
  return (
    <Card
      sx={{
        bgcolor: backgroundColor,
        color: textColor,
        mx: "auto",
        height: "120px",
        width: "220px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              src={stockData.logoUrl}
              sx={{
                width: 30,
                height: 30,
                marginRight: 1,
                aspectRatio: "1/1",
                borderRadius: "50%",
              }}
            />
            <Typography sx={{ fontWeight: "bold" }}>
              {stockData.stock_name}
            </Typography>
          </Box>
          <Box>
            <Typography>{stockData.stock_ticker}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Current Value</Typography>
            <Typography variant="h6">${stockData.current_value}</Typography>
          </Box>

          <Box>
            <Typography>Graph</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

HeaderStockCard.propTypes = {
  stockData: PropTypes.object,
  sx: PropTypes.object,
};
