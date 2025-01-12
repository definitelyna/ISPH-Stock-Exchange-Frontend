import { Box, CardMedia, Typography } from "@mui/material";
import Proptypes from "prop-types";

const getChangeColor = (change) => {
  if (change > 0) {
    return "green";
  } else if (change < 0) {
    return "red";
  } else {
    return "black";
  }
};

const WatchlistRow = ({ logo, name, price, change }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        my: 1,
        height: 42
      }}
    >
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <CardMedia
          component="img"
          src={logo}
          sx={{ width: 30, aspectRatio: "1/1", borderRadius: "10%", mr: 1 }}
        />
        <Typography>{name}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Typography>${price}</Typography>
        <Typography color={getChangeColor(change)}>
          {change > 0 ? `+${change}` : change}
        </Typography>
      </Box>
    </Box>
  );
};

export default WatchlistRow;

WatchlistRow.propTypes = {
  logo: Proptypes.string,
  name: Proptypes.string,
  price: Proptypes.number,
  change: Proptypes.number,
};
