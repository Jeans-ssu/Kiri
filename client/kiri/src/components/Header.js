import { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'store/modules/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [currentTab, setCurrentTab] = useState(-1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const menuArr = [
    { name: '캘린더' },
    { name: '이벤트' },
    { name: '게시요청' },
  ];

  const menu = ['calendar', 'event', 'event/write'];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setClick(true);
  };

  return (
    <>
      <Main>
        <TabMenu>
          <Logo>
            <Link to="/">끼리끼리</Link>
          </Logo>
          {menuArr.map((el, idx) => {
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
              onKeyPress={() => {
                if (event.keyCode === 13) {
                  navigate('/event/search');
                }
              }}
              placeholder="검색어를 입력하세요"
            ></SearchInput>
          </Searchdiv>
          <Login>
            <Link to="/signin">로그인</Link>
          </Login>
          <Profile>
            <Link to="/mypage">
              <FaUserCircle size="27" color="black" />
            </Link>
          </Profile>
        </TabMenu>
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
  &:active,
  &:focus {
    outline: none;
  }
  font-size: 12px;
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


const Header = () => {
  const [currentTab, setCurrentTab] = useState(-1);
  const [click, setClick] = useState(false);

  const menuArr = [{ name: '캘린더' }, { name: '이벤트' }, { name: '글쓰기' }];

  const menu = ['calendar', 'event', 'event/write'];

  const isLogin = useSelector(selectIsLogin);
  console.log(isLogin);

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setClick(true);
  };

  return (
    <>
      <Main>
        <TabMenu>
          <Logo>
            <Link to="/">끼리끼리</Link>
          </Logo>
          {menuArr.map((el, idx) => {
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
            <Search placeholder="검색어를 입력하세요"></Search>
          </Searchdiv>
          <Login>
            {isLogin ? (
              <Link to="/mypage">로그아웃</Link>
            ) : (
              <Link to="/signin">로그인</Link>
            )}
          </Login>
          <Profile>
            <Link to="/mypage">
              <FaUserCircle size="27" color="black" />
            </Link>
          </Profile>
        </TabMenu>
      </Main>
    </>
  );
};

export default Header;
