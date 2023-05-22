import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { selectSearchMode, setSearchMode } from 'store/modules/searchSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EventContent from './EventContent';

const EventSearchPage = () => {
  const [data, setData] = useState([]);
  const searchMode = useSelector(selectSearchMode);

  const { searchWordParam } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    getSearch();
  }, [searchMode]);

  async function getSearch() {
    await axios
      .get(`/posts/search?relation=${searchWordParam}`)
      .then((res) => {
        setData(res.data);
        dispatch(setSearchMode(false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setSearchMode(false));
      });
  }

  return (
    <PageContainer header footer padding="20px 0" margin_bottom={false}>
      <EventKeywordPageContainer>
        <h1>{`"${searchWordParam}"의 검색 결과`}</h1>
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
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
    @media screen and (max-width: 767px) {
      padding-left: 15px;
    }
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
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

export default EventSearchPage;
