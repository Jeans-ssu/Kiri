import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';

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
        <EventContent />
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

const FilterLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

export default EventPage;
