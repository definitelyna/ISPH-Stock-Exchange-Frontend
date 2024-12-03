import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import PropTypes from 'prop-types';
import CardMedia from '@mui/material/CardMedia';
import UserCard from './UserCard';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu({ pageDict, currentPage, setCurrentPage }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          height: 60,
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: '100%',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <UserCard />
          <OptionsMenu />
        </Stack>
      </Box>

      <Divider />

      <MenuContent
        pageDict={pageDict}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <CardMedia
        component="img"
        image="../../public/ISPH_LogoBlue.png" // TODO: Change Blue Logo to White on theme change
        sx={{
          borderRadius: '10%',
          width: '70%',
          marginInline: 'auto',
          marginBottom: '13%',
        }}
      />
    </Drawer>
  );
}
SideMenu.propTypes = {
  pageDict: PropTypes.object,
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
};
