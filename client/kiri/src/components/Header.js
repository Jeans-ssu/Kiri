import { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';

const Main = styled.div`
min-width: 1600px;
position: relative
justify-items: row;
display: grid;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: center;
  justify-items: row;
  align-items: center;
  cursor: pointer;
  text-align: center;
  margin-right: 200px;
`;

const TabMenu = styled.ul`
  position: sticky;
  background-color: white;
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;

  list-style: none;
  margin-bottom: 7rem;
  border-bottom: 0.1px solid rgb(0, 0, 0, 0.1);

  .focused {
    border-bottom: 5px solid #47da9c;
  }

  .search {
    margin-top: 5px;
  }

  .hide {
    border-bottom: none;
  }
`;

const SubMenu = styled.li`
  margin-right: 100px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  border: none;
`;

const Searchdiv = styled.div`
  .searchicon {
    position: absolute;
    margin-left: 12px;
    margin-top: 7px;
  }
`;

const Search = styled.input`
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

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
    setClick(true);
  };

  return (
    <>
      <Main>
        <TabMenu>
          <Logo>끼리끼리</Logo>
          {menuArr.map((el, idx) => {
            return (
              <SubMenu
                className={`${currentTab === idx ? 'focused' : ''} ${
                  click ? '' : 'hide'
                }`}
                onClick={() => selectMenuHandler(idx)}
              >
                {el.name}
              </SubMenu>
            );
          })}
          <Searchdiv>
            <FaSearch size="17" className="searchicon" />
            <Search placeholder="검색어를 입력하세요"></Search>
          </Searchdiv>
          <Login>로그인</Login>
          <Profile>
            <FaUserCircle size="27" color="black" />
          </Profile>
        </TabMenu>
      </Main>
    </>
  );
};
