import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppNavbar from "./components/AppNavbar.jsx";
import SideMenu from "./components/SideMenu.jsx";
import AppTheme from "./shared-theme/AppTheme.jsx";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListIcon from "@mui/icons-material/List";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Dashboard,
  Help,
  Market,
  Portfolio,
  Profile,
  Stocks,
  Trade,
} from "./pages/pages.js";
import { useState } from "react";

// const pages = [{
//   Dashboard: <Dashboard />,
//   Help: <Help />,
//   Login: <Login />,
//   Market: <Market />,
//   Portfolio: <Portfolio />,
//   Profile: <Profile />,
//   Stocks: <Stocks />,
//   Trade: <Trade />,
// }]

const pageDict = {
  Dashboard: {
    name: "Dashboard",
    component: <Dashboard />,
    icon: <DashboardIcon />,
  },
  Portfolio: {
    name: "Portfolio",
    component: <Portfolio />,
    icon: <HelpIcon />,
  },
  Trade: { name: "Trade", component: <Trade />, icon: <PaidIcon /> },
  Market: { name: "Market", component: <Market />, icon: <ShowChartIcon /> },
  Stocks: { name: "Stocks", component: <Stocks />, icon: <ListIcon /> },
  Profile: {
    name: "Profile",
    component: <Profile />,
    icon: <AccountBoxIcon />,
  },
  Help: { name: "Help", component: <Help />, icon: <HelpIcon /> },
};

const xThemeComponents = {};

export default function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
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
        {pageDict[currentPage].component}
      </Box>
    </AppTheme>
  );
}
