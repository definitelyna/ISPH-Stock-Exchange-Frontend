import Overlay from "../../components/Overlay/Overlay";
import { CardMedia, Container, Typography, Box } from "@mui/material";
import useAuth from "../../firebase/AuthService";
import Divider from "./components/Divider";
import { useTheme } from "@mui/material";

const MARGIN_BETWEEN_SECTIONS = 2;

export default function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const secondaryTextColor = theme.palette.grey[600];
  const creationDate = new Date(user?.metadata.creationTime);

  return (
    <Overlay>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          pt: 3,
          px: 5,
        }}
      >
        <Box
          sx={{
            marginBottom: MARGIN_BETWEEN_SECTIONS,
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 500 }}>
            Your Profile
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ mb: MARGIN_BETWEEN_SECTIONS, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              Name:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              {user?.displayName}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              Year:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              None
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              House:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              None
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              Email:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              {user?.email}
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              Password:
            </Typography>
            <Typography
              variant="h6"  
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              *****
            </Typography>
          </Box>

          <Divider />
              
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              my: MARGIN_BETWEEN_SECTIONS,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "normal",
              }}
            >
              Account created on:
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", color: secondaryTextColor }}
            >
              {creationDate.toLocaleDateString("en-GB")}
            </Typography>
          </Box>

          {/* <Typography
            variant="h5"
            sx={{ fontWeight: "normal", marginBottom: MARGIN_BETWEEN_SECTIONS }}
          >
            <b>House: </b>
            None
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "normal", marginBottom: MARGIN_BETWEEN_SECTIONS }}
          >
            <b>Year: </b>
            None
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "normal", marginBottom: MARGIN_BETWEEN_SECTIONS }}
          >
            <b>Email: </b>
            {user?.email}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "normal", marginBottom: MARGIN_BETWEEN_SECTIONS }}
          >
            <b>Password: </b>
            ***
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "normal", marginBottom: MARGIN_BETWEEN_SECTIONS }}
          >
            <b>Created on: </b>
            {creationDate.toLocaleDateString("en-GB")}
          </Typography> */}
        </Box>
      </Box>
    </Overlay>
  );
}
