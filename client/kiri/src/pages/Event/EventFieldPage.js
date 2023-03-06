import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const EventFieldPageContainer = styled.div`
  /* color: ${({ theme }) => theme.colors.mainColor}; */
  h1 {
    color: black;
    padding-left: 30px;
    margin-bottom: 0;
    margin-top: 0;
  }

  .flex {
    display: flex;
  }
`;

const FieldNav = styled.nav`
  color: black;
  width: 400px;
  margin-left: 35px;
  .focused {
    color: #59b89d;
    font-weight: 700;
  }

  .hide {
    border-bottom: none;
  }
`;

const NavLi = styled.li`
  font-size: 1.1rem;
  font-weight: 700;
  list-style: none;
  text-align: left;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    color: #47da9c;
  }
`;

const field = [
  'IT',
  '경영/경제',
  '자연과학',
  '마케팅',
  '인문사회',
  '예술',
  '공학',
];

const EventListMain = styled.main`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;
  margin-left: 60px;
`;

const EventContainer = styled.div`
  width: 360px;
  height: 210px;
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-left: 30px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const filter = ['분야별', '키워드별'];

const FilterTab = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 63px;
  .focused {
    color: #59b89d;
    font-weight: 700;
  }

  .hide {
    border-bottom: none;
  }

  .filterLink {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const FilterLi = styled.li`
  list-style: none;
  padding: 0 10px 10px;
  cursor: pointer;

  &:hover {
    color: #47da9c;
  }
`;

const EventList = styled.div`
  justify-content: row;
  width: 200px;

  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    cursor: pointer;
  }

  .host {
    font-size: 14px;
    color: #636363;
  }

  .dday {
    margin-top: 0;
    font-size: 12px;
    color: #59b89d;
  }

  .watch {
    margin-top: 0;
    font-size: 12px;
    color: #737373;
    margin-left: 3px;
  }

  .eyeicon {
    margin-left: 10px;
    margin-top: 2.8px;
    color: #737373;
  }
`;

const EventImg = styled.div`
  width: 150px;
  img {
    justify-content: column;
    width: 100%;
    top: 50%;
    left: 50%;
    position: absoulte;
    padding: 0 10px;
    cursor: pointer;
  }
`;

const pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EventFieldPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentNav, setCurrentNav] = useState(0);
  const [click, setClick] = useState(false);

  const selectFilterHandler = (index) => {
    setCurrentTab(index);
    setClick(true);
  };

  const selectNavHandler = (index) => {
    setCurrentNav(index);
    setClick(true);
  };

  const eventlink = ['', '/keyword'];

  return (
    <PageContainer header footer>
      <EventFieldPageContainer>
        <h1>대학생을 위한 분야별 이벤트</h1>
        <FilterTab>
          {filter.map((el, idx) => {
            return (
              <Link
                className="filterLink"
                key={idx}
                to={`/event` + `${eventlink[idx]}`}
              >
                <FilterLi
                  key={idx}
                  className={`${currentTab === idx ? 'focused' : ''}
                        ${click ? '' : 'hide'}`}
                  onClick={() => selectFilterHandler(idx)}
                >
                  {el}
                </FilterLi>
              </Link>
            );
          })}
        </FilterTab>
        <div className="flex">
          <FieldNav>
            {field.map((el, idx) => (
              <NavLi
                key={idx}
                className={`${currentNav === idx ? 'focused' : ''}
                      ${click ? '' : 'hide'}`}
                onClick={() => selectNavHandler(idx)}
              >
                {el}
              </NavLi>
            ))}
          </FieldNav>
          <EventListMain>
            {pos.map((el) => (
              <EventContainer key={el}>
                <EventList>
                  <h4>2023 제목</h4>
                  <p className="host">주최</p>
                  <div className="flex">
                    <p className="dday">D-nn</p>
                    <div className="flex">
                      <BsEyeFill size="12" className="eyeicon" />
                      <p className="watch">조회수</p>
                    </div>
                  </div>
                </EventList>
                <EventImg>
                  <img
                    className="poster"
                    alt="poster"
                    src={`${process.env.PUBLIC_URL}/poster.jpg`}
                  ></img>
                </EventImg>
              </EventContainer>
            ))}
          </EventListMain>
        </div>
      </EventFieldPageContainer>
    </PageContainer>
  );
};

export default EventFieldPage;
