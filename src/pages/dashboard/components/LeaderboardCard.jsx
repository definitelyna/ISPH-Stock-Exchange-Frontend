import { Card, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useColorScheme } from "@mui/material/styles";
import { color } from "chart.js/helpers";
import { getTextColor } from "../utils/getTextColor";

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

const getBackgroundColor = (index, colorTheme) => {
  let returnValue = "";
  if (index == 1) {
    returnValue = "#FFD700";
  } else if (index == 2) {
    returnValue = "#D7D7D7";
  } else if (index == 3) {
    returnValue = "#CD7F32";
  } else if (colorTheme == "dark") {
    returnValue = "#FFFFFF";
  } else {
    returnValue = "#000000";
  }

  return returnValue;
};


const LeaderBoardCard = () => {
  const { mode } = useColorScheme();

  const getBoxStyle = (index) => {
    const bgcolor = getBackgroundColor(index, mode);

    return {
      display: "flex",
      bgcolor: bgcolor,
      width: "100%",
      justifyContent: "center",
      color: getTextColor(bgcolor),
    };
  };

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
                  <Box sx={getBoxStyle(index + 1)}>
                    <Typography fontWeight="bold">{index + 1}</Typography>
                  </Box>
                </Grid>
                <Grid
                  key={index + 1}
                  size={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={getBoxStyle(index + 1)}>
                    <Typography fontWeight="bold">{data.name}</Typography>
                  </Box>
                </Grid>
                <Grid
                  key={index + 2}
                  size={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={getBoxStyle(index + 1)}>
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
