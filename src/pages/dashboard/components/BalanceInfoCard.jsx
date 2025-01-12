import { Card, CardContent, Typography, Box } from "@mui/material";
import Proptypes from "prop-types";

const BalanceInfoCard = ({ sx }) => {
  return (
    <Card sx={sx}>
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box width="47%">
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
          </Box>

          <Box width="47%">
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
          </Box>
        </Box>

        <Box>
          <Typography variant="" sx={{ fontWeight: "bold", marginTop: 2 }}>
            Total value
          </Typography>

          <Card
            sx={{
              backgroundColor: "#05ff7f",
              padding: 1,
            }}
          >
            <CardContent>
              <Typography sx={{ color: "black" }} variant="h6">
                $XXX.XXX
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BalanceInfoCard;

BalanceInfoCard.propTypes = {
  sx: Proptypes.object,
};
