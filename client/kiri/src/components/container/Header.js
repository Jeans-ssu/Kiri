import { useRef, useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin, DELETE_USER } from 'store/modules/userSlice';
import { setSearchWord, setSearchMode } from 'store/modules/searchSlice';
import axios from '../../api/axios';
import { selectAccessToken, DELETE_TOKEN } from 'store/modules/authSlice';
import NeedLoginModal from 'components/modal/NeedLoginModal';

const Header = () => {
  const [currentTab, setCurrentTab] = useState(-1);
  const [click, setClick] = useState(false);

  const [isOpen, setIsOpen] = useState(false); //로그인 필요 모달

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuArr = [{ name: '캘린더' }, { name: '이벤트' }, { name: '글쓰기' }];

  const menu = ['calendar', 'event', 'event/write'];

  const isLogin = useSelector(selectIsLogin);

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setClick(true);
  };

  const searchtext = useRef('');

  const searchHandler = () => {
    const text = document.getElementById('text').value;
    searchtext.current = text;
    dispatch(setSearchWord(searchtext.current));
    dispatch(setSearchMode(true));
  };

  const accessToken = useSelector(selectAccessToken);

  const handleClickLogout = () => {
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios
      .post('/logout')
      .then(() => {
        dispatch(DELETE_TOKEN);
        dispatch(DELETE_USER);
      })
      .catch((err) => {
        console.log('ERROR: 로그아웃 실패', err);
      });
  };

  return (
    <>
      <Main>
        <TabMenu>
          <Logo>
            <Link to="/">끼리끼리</Link>
          </Logo>
          {menuArr?.map((el, idx) => {
            return (
              <Link className="menulink" key={idx} to={`/` + `${menu[idx]}`}>
                <SubMenu
                  key={idx}
                  className={`${currentTab === idx ? 'focused' : ''} ${
                    click ? '' : 'hide'
                  }`}
                  onClick={() => selectMenuHandler(idx)}
                >
                  {el.name}
                </SubMenu>
                {currentTab === idx ? (
                  <div className="line" key={idx}></div>
                ) : null}
              </Link>
            );
          })}
          <Searchdiv>
            <FaSearch size="17" className="searchicon" />
            <SearchInput
              type="text"
              id="text"
              onKeyUp={searchHandler}
              onKeyPress={() => {
                if (event.keyCode === 13) {
                  navigate('/event/search');
                }
              }}
              placeholder="검색어를 입력하세요"
            ></SearchInput>{' '}
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
              <Link to="/mypage" onClick={() => setIsOpen(true)}>
                <FaUserCircle size="27" color="black" />
              </Link>
            )}
          </Profile>
        </TabMenu>
        <NeedLoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </Main>
    </>
  );
};

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  position: relative;
  background-color: white;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: center;
  justify-items: row;
  align-items: center;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  padding-bottom: 15px;
  margin-right: 100px;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
  }
`;

const TabMenu = styled.ul`
  position: sticky;
  background-color: white;
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40px;

  list-style: none;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);

  .focused {
    border-bottom: 5px solid ${({ theme }) => theme.colors.mainColor};
  }

  .search {
    margin-top: 5px;
  }

  .hide {
    border-bottom: none;
  }

  .menulink {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 700;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

const SubMenu = styled.div`
  margin-right: 100px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  border: none;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  padding-top: 4px;
`;

const Searchdiv = styled.div`
  display: flex;

  .searchicon {
    position: absolute;
    margin-left: 12px;
    margin-top: 4px;
  }
  svg {
    fill: ${({ theme }) => theme.colors.darkgray};
  }
`;

const SearchInput = styled.input`
  background: #f5f5f5;
  border: none;
  border-radius: 3px;
  padding: 7.8px 9.1px 7.8px 32px;
  margin-left: 5px;
  margin-bottom: 14px;
  display: flex;
`;

const Login = styled.button`
  background: white;
  border: none;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 14px;
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
