import { Card, CardContent, Typography, Box } from "@mui/material";
import WatchlistRow from "./WatchlistRow";
import PropTypes from "prop-types";

const WATCHLISTTESTDATA = [
  {
    name: "AAPL",
    price: 150.2,
    change: -1.8,
    logo: "https://logo.clearbit.com/apple.com",
  },
  {
    name: "GOOGL",
    price: 250.53,
    change: +10.4,
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    name: "AMZN",
    price: 350.28,
    change: -20.9,
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "TSLA",
    price: 700.18,
    change: +5.7,
    logo: "https://logo.clearbit.com/tesla.com",
  },
];

const WatchlistCard = ({ sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h6">Watchlist</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {WATCHLISTTESTDATA.map((stock, index) => (
            <Box key={index}>
              {index != 0 && (
                <Box
                  sx={{
                    width: "100%",
                    height: 1.2,
                    bgcolor: "gray",
                    mx: "auto",
                  }}
                />
              )}
              <WatchlistRow
                key={index}
                logo={stock.logo}
                name={stock.name}
                price={stock.price}
                change={stock.change}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;

WatchlistCard.propTypes = {
  sx: PropTypes.object,
};
