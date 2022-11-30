import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const Main = styled.div`
position: relative
justify-items: row;
display: grid;
`

const Logo = styled.div`
  display: flex;
  flex-direction: center;
  justify-items: row;
  align-items: center;
  cursor: pointer;
  text-align: center;
  margin-right: 300px;
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
  cursor: pointer;
  border-bottom: 0.1px solid rgb(0, 0, 0, 0.1);

  .submenu {
    margin-right: 100px;
  }

  .focused {
    border-bottom: 5px solid #47da9c;
  }
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
`;

const Profile = styled.div`
  cursor: pointer;
`;

export const Header = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "캘린더" },
    { name: "이벤트" },
    { name: "그룹" },
    { name: "게시요청" },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <Main>
        <TabMenu>
          <Logo>끼리끼리</Logo>
          {menuArr.map((el, idx) => {
            return (
              <li
                className={`submenu${currentTab === idx ? " focused" : ""}`}
                onClick={() => selectMenuHandler(idx)}
              >
                {el.name}
              </li>
            );
          })}
          <FaSearch size="17" />
          <Search placeholder="검색어를 입력하세요"></Search>
          <Login>로그인</Login>
          <Profile>
            <FaUserCircle size="27" color="black" />
          </Profile>
        </TabMenu>
      </Main>
    </>
  );
};
