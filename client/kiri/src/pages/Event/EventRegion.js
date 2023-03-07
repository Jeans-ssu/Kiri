import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState, useEffect, useRef } from 'react';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';
import axios from '../../api/axios';
import { Regions } from 'util/info';

const EventRegion = () => {
  const url = '/posts?division=지역';
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1);
  const [interest, setInterest] = useState('IT'); // 지역 select
  const [data, setData] = useState();
  const result = useRef();
  result.current = '';

  const selectFilterHandler = () => {
    setClick(true);
  };

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(url);
      const resdata = response.data;
      setData(resdata);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  async function getCategory(region) {
    await axios
      .get(`${url}&category=${region}`)
      .then((res) => {
        console.log('region', region);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getEvent() {
    const eventtag = result.current.slice(0, -1);
    console.log(eventtag);
    await axios
      .get(`${url}&event=${eventtag}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const field = ['축제', '전시', '공연', '강연', '대회', '기타'];
  const fieldClick = [false, false, false, false, false, false];

  const selectNavHandler = (idx) => {
    setCurrentNav(idx);
    setClick(!click);
    fieldClick[idx] = !fieldClick[idx];
    console.log(field[idx], fieldClick, currentNav);
  };

  const handleChangeInterest = (e) => {
    console.log(e.target.value);
    setInterest(e.target.value);
    getCategory(e.target.value);
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
              <option value="">전체</option>
              {Regions.map((el, idx) => {
                return (
                  <option key={idx} value={el}>
                    {el}
                  </option>
                );
              })}
              <option value="온라인">온라인</option>
            </SelectInput>
          </div>
        </SchoolRegionBox>
        <CheckboxDiv>
          {field.map((el) => (
            <>
              <EventTag
                tag={el}
                selectNavHandler={selectNavHandler}
                result={result}
                getEvent={getEvent}
              />
            </>
          ))}
        </CheckboxDiv>
        <Bar />
        <EventContent data={data} setData={setData} />
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
  padding-left: 3px;
  &:focus {
    outline: none;
  }
`;

export default EventRegion;
