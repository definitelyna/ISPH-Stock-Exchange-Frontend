import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { getTextColor } from "../../utils/getTextColor";
  
  const getBackgroundColor = (rank, colorTheme) => {
    let returnValue = "";
    if (rank == 1) {
      returnValue = "#FFD700";
    } else if (rank == 2) {
      returnValue = "#D7D7D7";
    } else if (rank == 3) {
      returnValue = "#CD7F32";
    } else if (colorTheme == "dark") {
      returnValue = "#FFFFFF";
    } else {
      returnValue = "#000000";
    }
  
    return returnValue;
  };

const LeaderboardRow = ({ rank, name, asset, sx }) => {
  const { mode } = useColorScheme();

  const getBoxStyle = (rank) => {
    const bgcolor = getBackgroundColor(rank, mode);

    return {
      display: "flex",
      bgcolor: bgcolor,
      width: "100%",
      justifyContent: "center",
      color: getTextColor(bgcolor),
    };
  };
  return (
    <>
      <Grid size={2} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Box sx={getBoxStyle(rank)}>
          <Typography fontWeight="bold">{rank}</Typography>
        </Box>
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Box sx={getBoxStyle(rank)}>
          <Typography fontWeight="bold">{name}</Typography>
        </Box>
      </Grid>
      <Grid size={4} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Box sx={getBoxStyle(rank)}>
          <Typography fontWeight="bold">{asset}</Typography>
        </Box>
      </Grid>
    </>
  );
};

export default LeaderboardRow;

LeaderboardRow.propTypes = {
  rank: PropTypes.number,
  name: PropTypes.string,
  asset: PropTypes.number,
  sx: PropTypes.object,
};
