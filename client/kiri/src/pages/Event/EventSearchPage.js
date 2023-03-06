import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { BsEyeFill } from 'react-icons/bs';
import { selectSearchWord } from 'store/modules/searchSlice';
import { useSelector } from 'react-redux';

const pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EventSearchPage = () => {
  const word = useSelector(selectSearchWord);
  console.log(word);
  return (
    <PageContainer header footer>
      <EventKeywordPageContainer>
        <h1>&apos;{word}&apos; 검색 결과</h1>
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
  margin-left: 122px;
  margin-top: 30px;
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

export default EventSearchPage;
