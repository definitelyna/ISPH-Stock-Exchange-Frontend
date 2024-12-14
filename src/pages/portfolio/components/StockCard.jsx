import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function StockCard() {
  return (
    <Card>
      <CardContent sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            src="/public/imagePlaceholder.svg"
            sx={{ width: 30, aspectRatio: "1/1", borderRadius: 1 }}
          />
          <Typography variant="h6" sx={{ marginLeft: "4%" }}>
            Stock Name
          </Typography>
          <Typography
            variant="p"
            sx={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              color: "gray",
            }}
          >
            (StockTicker)
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">$5000</Typography>
          <Typography sx={{ marginTop: "auto", marginBottom: "auto" }}>
            -5%
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Today P/S</Typography>
            <Typography>$2</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Bought P</Typography>
            <Typography>$2</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>Amount owned</Typography>
            <Typography>$2</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
