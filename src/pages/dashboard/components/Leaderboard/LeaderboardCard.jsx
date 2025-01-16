import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { data } from "react-router-dom";
import LeaderboardRow from "./LeaderboardRow";
import { Leaderboard } from "@mui/icons-material";
import PropTypes from "prop-types";

const ROW_HEIGHT = 21;

const LeaderboardTestData = [
  {
    rank: 1,
    name: "Your Name",
    asset: 1000,
  },
  {
    rank: 2,
    name: "Jane Doe",
    asset: 500,
  },
  {
    rank: 3,
    name: "John Smith",
    asset: 250,
  },
  {
    rank: 4,
    name: "Alice",
    asset: 100,
  },
  {
    rank: 5,
    name: "Bob",
    asset: 50,
  },
  {
    rank: 6,
    name: "Charlie",
    asset: 25,
  },
  { rank: 7, name: "David", asset: 10 },
];

const YourTestData = { rank: 1, name: "Your Name", asset: 1000 };

const LeaderboardHeader = ({ sx }) => {
  return (
    <>
      <Grid size={2} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Typography sx={{ fontWeight: "bold" }}>Rank</Typography>
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
      </Grid>
      <Grid size={4} sx={{ display: "flex", justifyContent: "center", ...sx }}>
        <Typography sx={{ fontWeight: "bold" }}>Total Asset</Typography>
      </Grid>
    </>
  );
};

const LeaderBoardCard = ({ sx }) => {
  return (
    <Card sx={sx}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Leaderboard
        </Typography>

        <Box sx={{ height: ROW_HEIGHT * 8, overflowY: "scroll", scrollbarWidth: "none" }}>
          <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
            <LeaderboardHeader sx={{ height: ROW_HEIGHT }} />

            {LeaderboardTestData.map((data, index) => (
              <LeaderboardRow
                key={index}
                {...data}
                sx={{ height: ROW_HEIGHT }}
              />
            ))}
          </Grid>
        </Box>

        <Grid
          container
          spacing={1}
          sx={{ width: "100%", height: "100%", mt: 2 }}
        >
          <LeaderboardRow {...YourTestData} sx={{ height: ROW_HEIGHT }} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LeaderBoardCard;

LeaderBoardCard.propTypes = {
  sx: PropTypes.object,
};

LeaderboardHeader.propTypes = {
  sx: PropTypes.object,
};
