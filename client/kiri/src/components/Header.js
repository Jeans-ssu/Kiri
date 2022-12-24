import { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  margin-left: 5px;
  white-space: nowrap;
  padding-bottom: 15px;
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
    border-bottom: 5px solid #47da9c;
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
  }
`;

const SubMenu = styled.li`
  margin-right: 100px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  border: none;
  white-space: nowrap;
`;

const Search = styled.input`
  background: #f5f5f5;
  border: none;
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
`;

export const Header = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [click, setClick] = useState(false);

  const menuArr = [
    { name: '캘린더' },
    { name: '이벤트' },
    { name: '그룹' },
    { name: '게시요청' },
  ];

  const menu = ['calendar', 'event', 'group', 'upload'];

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
              </Link>
            );
          })}
          <FaSearch size="17" className="search" />
          <Search placeholder="검색어를 입력하세요"></Search>
          <Login>
            <Link to="/signup">로그인</Link>
          </Login>
          <Profile>
            <FaUserCircle size="27" color="black" />
          </Profile>
        </TabMenu>
      </Main>
    </>
  );
};
