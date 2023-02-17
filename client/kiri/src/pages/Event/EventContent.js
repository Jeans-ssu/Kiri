import styled from 'styled-components';
import { BsEyeFill } from 'react-icons/bs';

const pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EventContent = () => {
  return (
    <Container>
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
    </Container>
  );
};

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
