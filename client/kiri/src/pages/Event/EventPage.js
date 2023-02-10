import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';

const pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EventPage = () => {
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1);

  const selectFilterHandler = () => {
    setClick(true);
  };

  const field = ['축제', '전시', '공연', '강연', '대회', '기타'];
  const fieldClick = [false, false, false, false, false, false];

  const selectNavHandler = (idx) => {
    setCurrentNav(idx);
    setClick(!click);
    fieldClick[idx] = !fieldClick[idx];
    console.log(field[idx], fieldClick, currentNav);
  };

  const filter = ['학교', '지역'];
  const eventlink = ['', '/region'];

  return (
    <PageContainer header footer>
      <EventFieldPageContainer>
        <SchoolRegionBox>
          {filter.map((el, idx) => {
            return (
              <Link
                className="filterLink"
                key={idx}
                to={`/event` + `${eventlink[idx]}`}
              >
                <FilterLi
                  key={idx}
                  className={`${el === '학교' ? 'school' : 'hide'}
                  `}
                  onClick={() => selectFilterHandler(idx)}
                >
                  <h2>{el}</h2>
                </FilterLi>
              </Link>
            );
          })}
        </SchoolRegionBox>
        <Bar />
        <SchoolSearchContainer>
          <SchoolnameBox>
            <span>OO대학교</span>
          </SchoolnameBox>
          <Searchdiv>
            <FaSearch size="17" className="searchicon" />
            <SearchInput
              type="text"
              id="text"
              placeholder="다른 학교를 검색해보세요"
            ></SearchInput>
          </Searchdiv>
        </SchoolSearchContainer>

        <CheckboxDiv>
          {field.map((el, idx) => (
            <>
              <EventTag
                idx={idx}
                tag={el}
                selectNavHandler={selectNavHandler}
              />
            </>
          ))}
        </CheckboxDiv>
        <Bar />

        <div className="flex">
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

  .school {
    font-weight: 700;
  }

  .hide {
    color: ${({ theme }) => theme.colors.lightgray};
  }

  .filterLink {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const SchoolRegionBox = styled.div`
  display: flex;
  h2 {
    padding-left: 30px;
    margin-bottom: 10px;
    margin-top: 0;
  }
`;

const Bar = styled.hr`
  width: 95%;
  border: 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const SchoolSearchContainer = styled.div`
  padding-left: 30px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const SchoolnameBox = styled.div`
  span {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const Searchdiv = styled.div`
  display: flex;
  margin-left: 20px;
  width: 40%;

  .searchicon {
    position: absolute;
    margin-left: 12px;
    margin-top: 7px;
  }
  svg {
    fill: ${({ theme }) => theme.colors.mainColor};
  }
`;

const SearchInput = styled.input`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 7.8px 9.1px 7.8px 32px;
  width: 100%;

  margin-left: 5px;
  display: flex;
  align-items: center;
  &:active,
  &:focus {
    outline: none;
  }
  font-size: 12px;
`;

const CheckboxDiv = styled.div`
  flex-wrap: wrap;
  margin: 15px 0 15px 20px;
  display: flex;
  align-items: center;
  .focused {
    color: #59b89d;
    font-weight: 700;
    width: 40px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
`;

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

const FilterLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

export default EventPage;
