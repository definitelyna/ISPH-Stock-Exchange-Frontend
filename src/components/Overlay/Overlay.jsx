import AppTheme from "../../shared-theme/AppTheme";
import { CssBaseline, Box, Stack } from "@mui/material";
import SideMenu from "./components/SideMenu";
import AppNavbar from "./components/AppNavbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListIcon from "@mui/icons-material/List";
import PaidIcon from "@mui/icons-material/Paid";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";

const xThemeComponents = {};

export default function Overlay({ children }) {
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}

Overlay.propTypes = {
  children: PropTypes.element,
};
