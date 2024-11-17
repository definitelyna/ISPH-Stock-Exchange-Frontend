import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import PropTypes from "prop-types";
import CardMedia from "@mui/material/CardMedia";


const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu({pageDict, currentPage, setCurrentPage}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >

        <Stack
          direction="row"
          sx={{
            width: "100%",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              Username
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              useremail@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>

      <Divider />

      <MenuContent pageDict={pageDict} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

      <CardMedia component="img" image="../../public/isphLogo.png" sx={{borderRadius: "50%", width: "70%", marginInline: "auto", marginBottom: "13%"}}/>
    </Drawer>
  );  
}
SideMenu.propTypes = {
  pageDict: PropTypes.object,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func
}
