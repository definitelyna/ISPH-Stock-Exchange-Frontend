import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../../../firebase/AuthService";
import { useColorScheme } from "@mui/material/styles";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

export default function OptionsMenu() {
  const { mode, systemMode, setMode } = useColorScheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSwitchMode = () => {
    if (mode == "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };
  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        {mode == "dark" ? (
          <MenuItem onClick={handleSwitchMode}>Light mode</MenuItem>
        ) : (
          <MenuItem onClick={handleSwitchMode}>Dark mode</MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={handleLogOut}
          sx={{
            minWidth: 50,
            justifyContent: "space-between",
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon sx={{ justifyContent: "right" }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
