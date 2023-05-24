import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin, DELETE_USER } from 'store/modules/userSlice';
import {
  setSearchWord,
  setSearchMode,
  selectSearchWord,
} from 'store/modules/searchSlice';
import axios from '../api/axios';
import { selectAccessToken, DELETE_TOKEN } from 'store/modules/authSlice';
import NeedLoginModal from './NeedLoginModal';
import { persistor } from 'store/store';
import { MobileHeader } from './MobileHeader';

//redux-persist 저장값 초기화
const purge = async () => {
  await persistor.purge();
};

const Header = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false); //로그인 필요 모달

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!(location.pathname.slice(0, 13) === '/event/search')) {
      dispatch(setSearchWord(''));
    }
  }, []);

  const menuArr = [{ name: '캘린더' }, { name: '이벤트' }, { name: '글쓰기' }];
  const menu = ['calendar', 'event', 'event/write'];
  const pageidx = menu.findIndex((el) => el === page);

  const isLogin = useSelector(selectIsLogin);

  const serachWord = useSelector(selectSearchWord);

  const handleChangeSearchword = (e) => {
    dispatch(setSearchWord(e.target.value));
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(setSearchMode(true));
      navigate(`/event/search/${serachWord}`);
    }
  };

  const accessToken = useSelector(selectAccessToken);

  const handleClickLogout = () => {
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios
      .post('/logout')
      .then(() => {
        purge();
        dispatch(DELETE_TOKEN);
        dispatch(DELETE_USER);
        navigate('/');
      })
      .catch((err) => {
        purge();
        console.log('ERROR: 로그아웃 실패', err);
        navigate('/');
      });
  };

  return (
    <HeaderContainer>
      <Main>
        <div className="left">
          <Logo>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + '/img/main_logo.svg'}
                alt="main logo"
              />
            </Link>
          </Logo>
          <div className="menuscontainer">
            {menuArr?.map((el, idx) => {
              return (
                <Link
                  className={`menulink ${pageidx === idx ? 'focused' : ''}`}
                  key={idx}
                  to={`/` + `${menu[idx]}`}
                >
                  <SubMenu key={idx}>{el.name}</SubMenu>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="right">
          <Searchdiv>
            <FiSearch size="24" className="searchicon" />
            <SearchInput
              type="text"
              id="text"
              onKeyPress={handleOnKeyPressEnter}
              onChange={handleChangeSearchword}
              placeholder="이벤트를 검색해 보세요"
              value={serachWord}
            ></SearchInput>
          </Searchdiv>
          <Login>
            {isLogin ? (
              <Link to="/" onClick={handleClickLogout}>
                로그아웃
              </Link>
            ) : (
              <Link to="/signin">로그인</Link>
            )}
          </Login>
          <Profile>
            {isLogin ? (
              <Link to="/mypage">
                <FaUserCircle size="27" color="black" />
              </Link>
            ) : (
              <Link onClick={() => setIsOpen(true)}>
                <FaUserCircle size="27" color="black" />
              </Link>
            )}
          </Profile>
        </div>
      </Main>
      <MobileHeader
        id="mobile"
        handleClickLogout={handleClickLogout}
        isOpenLoginModal={isOpen}
        setIsOpenLoginModal={setIsOpen}
        handleOnKeyPressEnter={handleOnKeyPressEnter}
        handleChangeSearchword={handleChangeSearchword}
        serachWord={serachWord}
      />
      <NeedLoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  @media screen and (min-width: 768px) {
    div#mobile {
      display: none;
    }
  }
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  position: relative;
  background-color: white;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  box-sizing: border-box;
  div.left div.right {
    height: 100%;
  }
  div.left {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin-left: 80px;
    .menuscontainer {
      display: flex;
      height: 60px;
      .menulink {
        width: 80px;
        margin: 0 20px;
        height: 60px;
        box-sizing: border-box;
        line-height: 56px;
        border-bottom: 3px solid transparent;
        &:hover {
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
        }
        &.focused {
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          border-bottom: 3px solid ${({ theme }) => theme.colors.mainColor};
        }
        color: ${({ theme }) => theme.colors.dark};
        font-weight: 700;
        text-decoration: none;
      }
    }
  }
  div.right {
    display: flex;
    align-items: center;
    margin-right: 80px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: center;
  justify-items: row;
  align-items: center;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  margin-right: 40px;
  margin-top: 5px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
  }
  img {
    width: 100px;
  }
`;

const SubMenu = styled.div`
  margin-right: 100px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  border: none;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  padding-top: 4px;
`;

const Searchdiv = styled.div`
  display: flex;
  width: 300px;
  position: relative;
  .searchicon {
    position: absolute;
    left: 8px;
    top: 6px;
  }
  svg {
    color: ${({ theme }) => theme.colors.darkgray};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 38px;
  background: #f5f5f5;
  border: none;
  border-radius: 3px;
  padding: 0 15px 0 40px;
  display: flex;
  outline: none;
`;

const Login = styled.button`
  background: white;
  border: none;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 700;
  }
`;

const Profile = styled.div`
  align-items: flex-end;
  cursor: pointer;
  svg {
    fill: ${({ theme }) => theme.colors.dark};
  }
`;

export default Header;
