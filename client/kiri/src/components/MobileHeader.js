import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { AppBar, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'store/modules/userSlice';
import { SearchInput } from './Header';

const HOME = '홈';
const EVENT = '이벤트';
const CALENDAR = '캘린더';
const WRITE = '글쓰기';

export const MobileHeader = ({
  handleClickLogout,
  setIsOpenLoginModal,
  handleOnKeyPressEnter,
  handleChangeSearchword,
  serachWord,
}) => {
  const navItems = [HOME, CALENDAR, EVENT, WRITE];

  const location = useLocation();

  const isLogin = useSelector(selectIsLogin);

  const [mobileOpen, setMobileOpen] = useState(false); //왼쪽 바 메뉴 오픈 여부
  const [selectedIndex, setSelectedIndex] = useState(null); //현재 페이지에 따라 index
  const [anchorEl, setAnchorEl] = useState(null); //오른쪽 드롭다운 메뉴

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

    if (pathname === '/') {
      setSelectedIndex(navItems.indexOf(HOME));
      return;
    }
  }, [location]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //오른쪽 메뉴 드롭다운 클릭시 처리
  const handleCloseAnchor = (type) => {
    setAnchorEl(null);
    if (type === 'logout') {
      handleClickLogout();
    }
    if (type === 'signin') {
      navigate('/signin');
    }
    if (type === 'mypage') {
      if (isLogin) {
        navigate('/mypage');
      } else {
        setIsOpenLoginModal(true);
      }
    }
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const navigate = useNavigate();

  //왼쪽 바 메뉴 선택시 처리
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

  //왼쪽 바 메뉴
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
        {navItems?.map((item, idx) => {
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
        <StyledToolbar>
          <MobileMenuIcon onClick={handleDrawerToggle} />
          <MiddleMenuList>
            {navItems?.map((el, idx) => {
              return (
                <MiddleMenuBtn
                  key={idx}
                  className={selectedIndex === idx ? 'selected' : null}
                  onClick={handleClickDrawerListItem}
                >
                  {el}
                </MiddleMenuBtn>
              );
            })}
          </MiddleMenuList>
          <SearchInputContainer>
            <FiSearch size="22" />
            <SearchInput
              type="text"
              placeholder="이벤트를 검색해보세요"
              onKeyPress={handleOnKeyPressEnter}
              onChange={handleChangeSearchword}
              value={serachWord}
            />
          </SearchInputContainer>
          <div>
            <UserMenuBtn onClick={handleMenu}>
              <FaUserCircle />
            </UserMenuBtn>
            <StyledMenu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleCloseAnchor}
            >
              {isLogin ? (
                <MenuItem
                  onClick={() => {
                    handleCloseAnchor('logout');
                  }}
                >
                  로그아웃
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseAnchor('signin');
                  }}
                >
                  로그인
                </MenuItem>
              )}
              <MenuItem
                onClick={() => {
                  handleCloseAnchor('mypage');
                }}
              >
                마이페이지
              </MenuItem>
            </StyledMenu>
          </div>
        </StyledToolbar>
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
  min-height: 59px;
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
  @media screen and (min-width: 600px) {
    display: none !important;
  }
`;

const StyledDrawerContainer = styled(Box)``;

const LogoContainer = styled.div`
  padding: 14px 0;
  img {
    width: 100px;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 250px;
  position: relative;
  svg {
    position: absolute;
    left: 8px;
    top: 7px;
    color: ${({ theme }) => theme.colors.darkgray};
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

const UserMenuBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.colors.darkgray};
  }
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  height: 58px;
  @media screen and (min-width: 600px) {
    min-height: 58px !important;
  }
`;

const StyledMenu = styled(Menu)`
  div.MuiMenu-paper {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.colors.lightgray};
  }
  ul {
    padding: 0;
  }
  li {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkgray};
    padding: 0 16px;
    @media screen and (min-width: 600px) {
      padding: 15px 16px;
    }
  }
`;

const MiddleMenuList = styled.div`
  @media screen and (max-width: 599px) {
    display: none;
  }
  flex: 0.8;
  display: flex;
  justify-content: center;
`;

const MiddleMenuBtn = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  width: 100%;
  height: 59px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin: 0 8px;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  &.selected {
    border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
  }
`;
