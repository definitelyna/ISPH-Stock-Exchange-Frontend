import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SideMenuMobile from "./SideMenuMobile";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from "../../../shared-theme/ColorModeIconDropdown";
import PropTypes from "prop-types";
import useCurrentPage from "../../../hooks/useCurrentPage";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export default function AppNavbar() {
  const { currentPage, currentPath, currentPageIcon } = useCurrentPage();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        display: { xs: "auto", md: "none" },
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "space-between",
              mr: "auto",
              alignItems: "center",
            }}
          >
            {currentPageIcon}
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: "text.primary" }}
            >
              {currentPage}
            </Typography>
          </Stack>

          <ColorModeIconDropdown />
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <SideMenuMobile
            open={open}
            toggleDrawer={toggleDrawer}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  pageDict: PropTypes.object,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
};
