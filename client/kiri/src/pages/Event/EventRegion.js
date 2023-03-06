import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState } from 'react';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';

const EventRegion = () => {
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1);
  const [interest, setInterest] = useState('IT'); // 지역 select
  const [order, setOrder] = useState('최신순');

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

  const handleChangeInterest = (e) => {
    setInterest(e.target.value);
  };

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
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
                  className={`${el === '지역' ? 'school' : 'hide'}
                  `}
                  onClick={() => selectFilterHandler(idx)}
                >
                  <h2>{el}</h2>
                </FilterLi>
              </Link>
            );
          })}
          <div className="dropdown">
            <SelectInput onChange={handleChangeInterest} value={interest}>
              <option value="Seoul">전체</option>
              <option value="Seoul">서울</option>
              <option value="Busan">부산</option>
              <option value="Incheon">인천</option>
              <option value="Daejeon">대전</option>
              <option value="Daegu">대구</option>
              <option value="Ulsan">울산</option>
              <option value="Gwangju">광주</option>
              <option value="Gyeonggido">경기도</option>
              <option value="Gangwondo">강원도</option>
              <option value="Chungcheongbukdo">충청북도</option>
              <option value="Chungcheongnamdo">충청남도</option>
              <option value="Jeollabukdo">전라북도</option>
              <option value="Jeollanamdo">전라남도</option>
              <option value="Gyeongsangbukdo">경상북도</option>
              <option value="Gyeongsangnamdo">경상남도</option>
              <option value="Jeju">제주도</option>
              <option value="Online">온라인</option>
            </SelectInput>
          </div>
        </SchoolRegionBox>
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
        <EventOrderBox>
          <OrderInput onChange={handleChangeOrder} value={order}>
            <option value="최신순">최신순</option>
            <option value="좋아요순">좋아요순</option>
          </OrderInput>
        </EventOrderBox>
        <EventContent />
      </EventFieldPageContainer>
    </PageContainer>
  );
};

const EventOrderBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const OrderInput = styled.select`
  width: 85px;
  height: 30px;
  border: none;
  border-radius: 3px;
  padding-left: 5px;
  margin-left: auto;
  margin-right: 30px;
  font-weight: 600;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

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

  .dropdown {
    display: flex;
    align-items: center;
    margin-left: 33px;
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

const SelectInput = styled.select`
  width: 70px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

export default EventRegion;
