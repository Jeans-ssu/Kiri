import styled from 'styled-components';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const EventContent = ({ data }) => {

  const navigate = useNavigate();

  const handleOnClickEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const DDay = (expiry_date) => {
    const now = new Date(); // 2022-11-25
    const target = new Date(
      expiry_date.slice(0, 4),
      MakeDay(expiry_date.slice(5, 7)) - 1,
      MakeDay(expiry_date.slice(8, 10))
    );
    const distance = target.getTime() - now.getTime();
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    return day + 1;
  };
  const MakeDay = (data) => {
    if (data.indexOf('0') === 0) {
      return data.slice(1, 2);
    } else {
      return data;
    }
  };

  return (
    <Container>
      <EventListMain>
        {data?.map((el, idx) => (
          <EventContainer key={idx}>
            <EventList onClick={() => handleOnClickEvent(el.post_id)}>
              <h4>{el.title}</h4>
              <p className="host">{el.post_id}</p>
              <div className="flex">
                <p className="dday">D-{DDay(el.startPostTime.slice(0, 10))}</p>
                <div className="flex">
                  <BsFillSuitHeartFill
                    className="eyeicon"
                    size="12"
                    color="#ff6b6b"
                  />
                  <p className="watch">{el.scrap_count}</p>
                </div>
              </div>
            </EventList>
            <EventImg>
              <img
                className="poster"
                alt="poster"
                src={el.imgUrl}
                // src={`${process.env.PUBLIC_URL}/poster.jpg`}
              ></img>
            </EventImg>
          </EventContainer>
        ))}
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
  margin: auto;
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
