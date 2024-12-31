import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { data } from "react-router-dom";
import LeaderboardRow from "./LeaderboardRow";
import { Leaderboard } from "@mui/icons-material";

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
    name: "Jane Smith",
    asset: 100,
  },
  {
    rank: 5,
    name: "John Johnson",
    asset: 50,
  },
];

const YourTestData = { rank: 1, name: "Your Name", asset: 1000 };

const LeaderboardHeader = () => {
  return (
    <>
      <Grid size={2} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>Rank</Typography>
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
      </Grid>
      <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontWeight: "bold" }}>Total Asset</Typography>
      </Grid>
    </>
  );
};

const LeaderBoardCard = () => {
  return (
    <Card>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Leaderboard
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>

            <LeaderboardHeader />

            {LeaderboardTestData.map((data, index) => (
              <LeaderboardRow key={index} {...data} />
            ))}

            <Grid size={12}></Grid>
            <Grid size={12}></Grid>
            <Grid size={12}></Grid>


            <LeaderboardRow {...YourTestData} />
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeaderBoardCard;
