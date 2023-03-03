import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { EventTag } from './EventTag';
import { Link } from 'react-router-dom';
import EventContent from './EventContent';
import SearchUnivModal from 'components/SearchUnivModal';
import axios from '../../api/axios';

const EventPage = () => {
  const [click, setClick] = useState(false);
  const [currentNav, setCurrentNav] = useState(-1);
  const [searchuniv, setSearchUniv] = useState('');
  const [data, setData] = useState();

  //학교 검색 모달
  const [showUnivModal, setShowUnivModal] = useState(false);

  const setUserUniv = (univName) => {
    console.log(univName);
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
      const response = await axios.get('/posts?division=학교');
      const resdata = response.data;
      console.log('data', resdata);
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
    console.log(field[idx], fieldClick, currentNav);
  };

  const handleClickSearchUnivBtn = () => {
    setShowUnivModal(true);
  };

  const removeUniv = () => {
    setSearchUniv('');
  };

  const filter = ['학교', '지역'];
  const eventlink = ['', '/region'];

  return (
    <PageContainer header footer page={'event'}>
      <EventFieldPageContainer>
        <TopBox>
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
          <SchoolSearchContainer>
            <Searchdiv>
              <FaSearch size="17" className="searchicon" />
              <SearchInput
                type="text"
                id="text"
                placeholder="원하는 학교를 검색해보세요"
                value={searchuniv}
              ></SearchInput>
              <OpenSearchModalBtn>
                {searchuniv === '' ? (
                  <Findtxt onClick={handleClickSearchUnivBtn}>찾아보기</Findtxt>
                ) : (
                  <Removetxt onClick={removeUniv}>선택안함</Removetxt>
                )}
              </OpenSearchModalBtn>
            </Searchdiv>
            <SearchUnivModal
              isOpen={showUnivModal}
              setIsOpen={setShowUnivModal}
              setUserUniv={setUserUniv}
            />
          </SchoolSearchContainer>
        </TopBox>
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
`;

const SchoolRegionBox = styled.div`
  display: flex;
  h2 {
    padding-left: 30px;
    margin-bottom: 10px;
    margin-top: 0;
  }
`;

const TopBox = styled.div`
  display: flex;
`;

const Bar = styled.hr`
  width: 95%;
  border: 0px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const SchoolSearchContainer = styled.div`
  padding-left: 18px;
  display: flex;
  align-items: center;
`;

const Searchdiv = styled.div`
  display: flex;
  margin-left: 10px;

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
  width: 240px;
  color: black;
  margin-left: 5px;
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
`;

const Findtxt = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 600;
`;

const Removetxt = styled.div`
  color: ${({ theme }) => theme.colors.lightgray};
  text-decoration: underline;
  font-weight: 500;
`;

export default EventPage;
