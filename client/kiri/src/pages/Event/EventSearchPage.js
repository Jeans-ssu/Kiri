import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { selectSearchWord } from 'store/modules/searchSlice';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import EventContent from './EventContent';

const EventSearchPage = () => {
  const [data, setData] = useState();
  const word = useSelector(selectSearchWord);

  useEffect(() => {
    getSearch();
  }, []);

  async function getSearch() {
    await axios
      .get(`/posts/search?relation=${word}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log(word);
  return (
    <PageContainer header footer>
      <EventKeywordPageContainer>
        <h1>&apos;{word}&apos; 검색 결과</h1>
        <EventListMain>
          <EventContent data={data} setData={setData} />
        </EventListMain>
      </EventKeywordPageContainer>
    </PageContainer>
  );
};

const EventKeywordPageContainer = styled.div`
  h1 {
    color: black;
    padding-left: 30px;
    margin-bottom: 0;
    margin-top: 0;
  }

  .titlesearch {
    text-align: center;
    font-weight: 500;
    color: #898989;
  }

  .flex {
    display: flex;
  }
`;

const EventListMain = styled.main`
  display: flex;
  justify-content: row;
  flex-wrap: wrap;
  margin-top: 30px;
`;

export default EventSearchPage;
