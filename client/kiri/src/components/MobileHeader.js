import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AppBar, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';

const HOME = '홈';
const EVENT = '이벤트';
const CALENDAR = '캘린더';
const WRITE = '글쓰기';

export const MobileHeader = () => {
  const navItems = [HOME, CALENDAR, EVENT, WRITE];

  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.startsWith('/calendar')) {
      setSelectedIndex(1);
      return;
    }
    if (pathname.startsWith('/event/write')) {
      setSelectedIndex(navItems.indexOf(WRITE));
      return;
    }
    if (pathname.startsWith('/event')) {
      setSelectedIndex(navItems.indexOf(EVENT));
      return;
    }

    if (pathname.startsWith('/')) {
      setSelectedIndex(navItems.indexOf(HOME));
      return;
    }
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const navigate = useNavigate();

  const handleClickDrawerListItem = (e) => {
    switch (e.target.textContent) {
      case HOME:
        navigate('/');
        break;
      case EVENT:
        navigate('/event');
        break;
      case CALENDAR:
        navigate('/calendar');
        break;
      case WRITE:
        navigate('/event/write');
        break;
      default:
        break;
    }
  };

  const drawer = (
    <StyledDrawerContainer
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center' }}
    >
      <LogoContainer>
        <img
          src={process.env.PUBLIC_URL + '/img/main_logo.svg'}
          alt="main_logo"
        />
      </LogoContainer>
      <Divider />
      <StyledDrawerList>
        {navItems.map((item, idx) => {
          return (
            <ListItem
              key={idx}
              disablePadding
              className={selectedIndex === idx ? 'selected' : null}
            >
              <ListItemButton
                sx={{ textAlign: 'center' }}
                onClick={handleClickDrawerListItem}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </StyledDrawerList>
    </StyledDrawerContainer>
  );

  return (
    <MobileHeaderContinaer sx={{ display: 'flex' }}>
      <StyledAppbar component="nav">
        <Toolbar>
          <MobileMenuIcon onClick={handleDrawerToggle} />
        </Toolbar>
      </StyledAppbar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </MobileHeaderContinaer>
  );
};

const MobileHeaderContinaer = styled(Box)`
  box-sizing: border-box;
  height: 59px;
  width: 100vw;
  @media screen and (min-width: 768px) {
    display: none !important;
  }
  background-color: white;
`;

const StyledAppbar = styled(AppBar)`
  box-sizing: border-box;
  height: 59px;
  background-color: white !important;
  box-shadow: none !important;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const MobileMenuIcon = styled(MenuIcon)`
  fill: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    cursor: pointer;
  }
`;

const StyledDrawerContainer = styled(Box)``;

const LogoContainer = styled.div`
  padding: 14px 0;
  img {
    width: 100px;
  }
`;

const StyledDrawerList = styled(List)`
  padding-top: 0;
  li {
    color: ${({ theme }) => theme.colors.dark};
    &:hover {
      background-color: ${({ theme }) => theme.colors.light};
    }
  }
  li.selected {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
