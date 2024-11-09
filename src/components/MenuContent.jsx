import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

export default function MenuContent({pageDict, currentPage, setCurrentPage}) {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {pageDict.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setCurrentPage(item.name)}
          >
            <ListItemButton selected={item.name == currentPage}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

MenuContent.propTypes = {
  pageDict: PropTypes.array,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func
}
