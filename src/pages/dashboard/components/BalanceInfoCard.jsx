import { Card, CardContent, Typography, Box } from "@mui/material";
const BalanceInfoCard = () => {
  return (
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

          <Typography variant="" sx={{ fontWeight: "bold", marginTop: 2 }}>
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
  );
};

export default BalanceInfoCard
