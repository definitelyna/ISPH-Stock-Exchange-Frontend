import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import pageDict from "../../../assets/pageDict";
import { useNavigate, useLocation } from "react-router-dom";
import useCurrentPage from "../../../hooks/useCurrentPage";

export default function MenuContent() {
  const { currentPath } = useCurrentPage();
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {Object.keys(pageDict).map((navigation, index) =>
          navigation == "/" ? null : (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate(navigation);
              }}
            >
              <ListItemButton selected={navigation == currentPath}>
                <ListItemIcon>{pageDict[navigation].icon}</ListItemIcon>
                <ListItemText primary={pageDict[navigation].name} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Stack>
  );
}

MenuContent.propTypes = {
  pageDict: PropTypes.object,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
};
