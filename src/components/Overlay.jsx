import AppTheme from "../shared-theme/AppTheme";
import { CssBaseline, Box } from "@mui/material";
import SideMenu from "./SideMenu";
import AppNavbar from "./AppNavbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListIcon from "@mui/icons-material/List";
import PaidIcon from "@mui/icons-material/Paid";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Profile: {
    name: "Profile",
    navigation: "/profile",
    icon: <AccountBoxIcon />,
  },
  Help: { name: "Help", navigation: "/help", icon: <HelpIcon /> },
};

const xThemeComponents = {};

export default function Overlay({ children }) {
    const lastPage = window.localStorage.getItem("currentPage") == undefined ? "Dashboard" : window.localStorage.getItem("currentPage");
    const [currentPage, setCurrentPage] = useState(lastPage);

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
        {children}
      </Box>
    </AppTheme>
  );
}

Overlay.propTypes = {
  children: PropTypes.element,
};
