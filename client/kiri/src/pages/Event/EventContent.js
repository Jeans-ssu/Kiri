import styled from 'styled-components';
import { BsEyeFill } from 'react-icons/bs';

const EventContent = ({ data }) => {
  return (
    <Container>
      <EventListMain>
        {data.length === 0 ? (
          <NoEventContainer>검색 결과가 없습니다.</NoEventContainer>
        ) : (
          data?.map((el) => (
            <EventContainer key={el}>
              <EventList>
                <h4>{el.title}</h4>
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
                <img className="poster" alt="poster" src={el.imgUrl}></img>
              </EventImg>
            </EventContainer>
          ))
        )}
      </EventListMain>
    </Container>
  );
};

const NoEventContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  width: 800px;
  height: 400px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
`;

const EventListMain = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

export default EventContent;
