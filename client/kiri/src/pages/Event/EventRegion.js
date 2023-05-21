import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useState, useEffect, useRef } from 'react';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';
import axios from '../../api/axios';
import { Regions } from 'util/info';
import { useSelector } from 'react-redux';
import { selectTagWord } from 'store/modules/tagSlice';
import Pagination from 'components/Pagination';

const EventRegion = () => {
  const url = '/posts?division=지역';
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1); // eslint-disable-line no-unused-vars
  const [region, setRegion] = useState('');
  const [order, setOrder] = useState('최신순');
  const [data, setData] = useState([]);
  const result = useRef();
  result.current = '';
  const eventtag = useSelector(selectTagWord);

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if (posts) {
      const result = posts.slice(offset, offset + limit);
      return result;
    }
  };

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

  function getCategory(region) {
    if (eventtag !== '') {
      axios
        .get(`${url}&category=${region}&eventList=${eventtag}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`${url}&category=${region}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function getEvent() {
    const eventtag = result.current.slice(0, -1);
    if (region !== '') {
      axios
        .get(`${url}&category=${region}&eventList=${eventtag}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`${url}&eventList=${eventtag}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const field = ['축제', '전시', '공연', '강연', '대회', '기타'];
  const fieldClick = [false, false, false, false, false, false];

  const selectNavHandler = (idx) => {
    setCurrentNav(idx);
    setClick(!click);
    fieldClick[idx] = !fieldClick[idx];
  };

  const handleChangeInterest = (e) => {
    setRegion(e.target.value);
    getCategory(e.target.value);
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
          {filter?.map((el, idx) => {
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
                  <h2 className={el}>{el}</h2>
                </FilterLi>
              </Link>
            );
          })}
          <div className="dropdown">
            <SelectInput onChange={handleChangeInterest} value={region}>
              <option value="">전체</option>
              {Regions?.map((el, idx) => {
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
          {field?.map((el, idx) => {
            return (
              <EventTag
                key={idx}
                tag={el}
                selectNavHandler={selectNavHandler}
                result={result}
                getEvent={getEvent}
              />
            );
          })}
        </CheckboxDiv>
        <Bar />
        <EventOrderBox>
          <OrderInput onChange={handleChangeOrder} value={order}></OrderInput>
        </EventOrderBox>
        <EventContent data={postsData(data)} />
      </EventFieldPageContainer>
      <PaginationBox>
        {data?.length === 0 ? (
          ''
        ) : (
          <Pagination page={page} totalPosts={data?.length} setPage={setPage} />
        )}
      </PaginationBox>
    </PageContainer>
  );
};

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const EventOrderBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const OrderInput = styled.div`
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
  @media screen and (max-width: 767px) {
    font-size: 12px;
    width: 70px;
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
    margin-left: 33px;
    margin-top: -2.5px;
  }
`;

const SchoolRegionBox = styled.div`
  display: flex;
  h2 {
    padding-left: 30px;
    margin-bottom: 10px;
    margin-top: 0;
  }
  @media screen and (max-width: 767px) {
    margin-left: -15px;
    h2 {
      margin-bottom: 0px;
      @media screen and (max-width: 767px) {
        font-size: 18px;
      }
    }
    h2.지역 {
      padding-left: 15px;
    }
    div.dropdown {
      margin-left: 15px;
    }
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
  @media screen and (max-width: 767px) {
    margin-bottom: 0;
    margin-left: 5px;
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
  @media screen and (max-width: 767px) {
    width: 55px;
    height: 24px;
    font-size: 11px;
  }
`;

export default EventRegion;
