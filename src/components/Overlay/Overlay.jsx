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

const pageDict = {
  Dashboard: {
    name: "Dashboard",
    navigation: "/dashboard",
    icon: <DashboardIcon />,
  },
  Portfolio: {
    name: "Portfolio",
    navigation: "/portfolio",
    icon: <HelpIcon />,
  },
  Trade: {
    name: "Trade",
    navigation: "/trade",
    icon: <PaidIcon />,
  },
  Market: {
    name: "Market",
    navigation: "/market",
    icon: <ShowChartIcon />,
  },
  Stocks: {
    name: "Stocks",
    navigation: "/stocks",
    icon: <ListIcon />,
  },
  // Profile: {
  //   name: "Profile",
  //   navigation: "/profile",
  //   icon: <AccountBoxIcon />,
  // },
  Help: { name: "Help", navigation: "/help", icon: <HelpIcon /> },
};

const xThemeComponents = {};

export default function Overlay({ children }) {
  const currentLocation = useLocation();
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    // Find the first match between pageDict's navigation and the current path
    const matchedPage = Object.keys(pageDict).find(
      (page) => pageDict[page].navigation === currentLocation.pathname
    );

    // Set the current page name if a match is found
    if (matchedPage) {
      const pageName = pageDict[matchedPage].name;
      setCurrentPage(pageName);
    }
  }, [currentLocation, pageDict]);

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu
          pageDict={pageDict}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <AppNavbar
          pageDict={pageDict}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
