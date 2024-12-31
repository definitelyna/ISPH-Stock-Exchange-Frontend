import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useColorScheme } from "@mui/material/styles";
import { color } from "chart.js/helpers";

const LeaderboardTestData = [
  {
    name: "John Doe",
    totalAsset: 1000,
  },
  {
    name: "Jane Doe",
    totalAsset: 500,
  },
  {
    name: "John Smith",
    totalAsset: 250,
  },
  {
    name: "Jane Smith",
    totalAsset: 100,
  },
  {
    name: "John Johnson",
    totalAsset: 50,
  },
];

const LeaderBoardCard = () => {
  const { mode } = useColorScheme();
  const BOX_STYLE = {
    display: "flex",
    bgcolor: mode == "dark" ? "white" : "black",
    width: "100%",
    justifyContent: "center",
    color: mode == "dark" ? "black" : "white",
  };
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "bold"}} variant="h6">
          Leaderboard
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1} sx={{ width: "100%", height: "100%" }}>
            <Grid size={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontWeight: "bold" }}>Rank</Typography>
            </Grid>
            <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
            </Grid>
            <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontWeight: "bold" }}>Total Asset</Typography>
            </Grid>
            {LeaderboardTestData.map((data, index) => (
              <>
                <Grid
                  key={index}
                  size={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={BOX_STYLE}
                  >
                    <Typography fontWeight="bold">{index + 1}</Typography>
                  </Box>
                </Grid>
                <Grid
                  key={index + 1}
                  size={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={BOX_STYLE}
                  >
                    <Typography fontWeight="bold">{data.name}</Typography>
                  </Box>
                </Grid>
                <Grid
                  key={index + 2}
                  size={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={BOX_STYLE}
                  >
                    <Typography fontWeight="bold">{data.totalAsset}</Typography>
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeaderBoardCard;
