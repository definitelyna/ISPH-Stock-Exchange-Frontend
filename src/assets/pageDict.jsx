import DashboardIcon from "@mui/icons-material/Dashboard";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListIcon from "@mui/icons-material/List";
import PaidIcon from "@mui/icons-material/Paid";

const pageDict = {
  "/": {
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  "/dashboard": {
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  "/portfolio": {
    name: "Portfolio",
    icon: <HelpIcon />,
  },
  "/trade": {
    name: "Trade",
    icon: <PaidIcon />,
  },
  "/market": {
    name: "Market",
    icon: <ShowChartIcon />,
  },
  "/profile": {
    name: "Profile",
    icon: <AccountBoxIcon />,
  },
  "/help": {
    name: "Help",
    icon: <HelpIcon />,
  },
};

export default pageDict