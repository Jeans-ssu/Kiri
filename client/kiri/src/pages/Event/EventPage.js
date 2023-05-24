import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';
import SearchUnivModal from 'components/SearchUnivModal';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectTagWord } from 'store/modules/tagSlice';
import Pagination from 'components/Pagination';

const EventPage = () => {
  const url = '/posts?division=학교';
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1); // eslint-disable-line no-unused-vars
  const [searchuniv, setSearchUniv] = useState('');
  const [order, setOrder] = useState('최신순');
  const [data, setData] = useState([]);
  const result = useRef();
  result.current = '';

  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if (posts) {
      const result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  //학교 검색 모달
  const [showUnivModal, setShowUnivModal] = useState(false);

  const setUserUniv = (univName) => {
    setSearchUniv(univName);
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

  const field = ['축제', '전시', '공연', '강연', '대회', '기타'];
  const fieldClick = [false, false, false, false, false, false];

  const selectNavHandler = (idx) => {
    setCurrentNav(idx);
    setClick(!click);
    fieldClick[idx] = !fieldClick[idx];
  };

  const handleClickSearchUnivBtn = () => {
    setShowUnivModal(true);
  };

  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
  };
  const eventtag = useSelector(selectTagWord);

  function getCategory(univsearch) {
    if (eventtag !== '') {
      axios
        .get(`${url}&category=${univsearch}&eventList=${eventtag}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get(`${url}&category=${univsearch}`)
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
    if (searchuniv !== '') {
      axios
        .get(`${url}&category=${searchuniv}&eventList=${eventtag}`)
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

  const removeUniv = () => {
    setSearchUniv('');
    getCategory('');
  };

  const filter = ['학교', '지역'];
  const eventlink = ['', '/region'];

  return (
    <PageContainer header footer page={'event'}>
      <EventFieldPageContainer>
        <TopBox>
          <MobileFlex>
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
                      className={`${el === '학교' ? 'school' : 'hide'}
                  `}
                      onClick={() => selectFilterHandler(idx)}
                    >
                      <h2 className={el}>{el}</h2>
                    </FilterLi>
                  </Link>
                );
              })}
            </SchoolRegionBox>
            <SchoolSearchContainer>
              <Searchdiv>
                <FiSearch size="17" className="searchicon" />
                <SearchInput
                  type="text"
                  id="text"
                  placeholder="원하는 학교를 검색해보세요"
                  value={searchuniv}
                  readOnly
                ></SearchInput>
                <OpenSearchModalBtn>
                  {searchuniv === '' ? (
                    <Findtxt onClick={handleClickSearchUnivBtn}>
                      찾아보기
                    </Findtxt>
                  ) : (
                    <Removetxt onClick={removeUniv}>선택안함</Removetxt>
                  )}
                </OpenSearchModalBtn>
              </Searchdiv>
              <SearchUnivModal
                isOpen={showUnivModal}
                setIsOpen={setShowUnivModal}
                setUserUniv={setUserUniv}
                getCategory={getCategory}
                filter={filter[0]}
              />
            </SchoolSearchContainer>
          </MobileFlex>
        </TopBox>
        <CheckboxDiv className="tagbox">
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
          <SelectInput onChange={handleChangeOrder} value={order}></SelectInput>
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

const MobileFlex = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    min-width: 350px;
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const EventOrderBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SelectInput = styled.div`
  display: visible;
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

  option {
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }
  }
`;

const SchoolRegionBox = styled.div`
  display: flex;
  h2 {
    padding-left: 30px;
    margin-bottom: 10px;
    margin-top: 0;
    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 767px) {
    h2.지역 {
      padding-left: 15px;
    }
  }
`;

const TopBox = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    margin-left: -15px;
  }
`;

const Bar = styled.hr`
  width: 95%;
  border: 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
  @media screen and (max-width: 767px) {
    width: 96%;
  }
`;

const SchoolSearchContainer = styled.div`
  padding-left: 18px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding-left: 14px;
  }
`;

const Searchdiv = styled.div`
  display: flex;
  margin-left: 10px;

  .searchicon {
    position: absolute;
    margin-left: 12px;
    margin-top: -2px;
  }
  svg {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 767px) {
    .searchicon {
      margin-top: 8px;
    }
  }
`;

const SearchInput = styled.input`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 7.8px 9.1px 7.8px 32px;
  width: 240px;
  color: black;
  margin-left: 5px;
  margin-top: -10px;
  display: flex;
  align-items: center;
  &:active,
  &:focus {
    outline: none;
  }
  font-size: 14px;
  font-weight: 700;
  ::placeholder {
    font-weight: 500;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 0;
    width: 90%;
    height: 13px;
  }
`;

const CheckboxDiv = styled.div`
  flex-wrap: wrap;
  margin: 15px 0 15px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .focused {
    color: #59b89d;
    width: 34px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
  @media screen and (max-width: 767px) {
    margin: 0;
    margin: 10px 0 5px 0;
  }
`;

const FilterLi = styled.li`
  list-style: none;
  cursor: pointer;
`;

const OpenSearchModalBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 80px;
  margin-left: -5px;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    margin-left: 10px;
  }
`;

const Findtxt = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 600;
  margin-top: -10px;
  @media screen and (max-width: 767px) {
    margin-top: 0;
  }
`;

const Removetxt = styled.div`
  color: ${({ theme }) => theme.colors.lightgray};
  text-decoration: underline;
  font-weight: 500;
`;

export default EventPage;
