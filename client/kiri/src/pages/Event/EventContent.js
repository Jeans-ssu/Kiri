import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import theme from 'styles/theme';

const { yellow, blue, pink, orange, purple2, green_1 } = theme.colors;

const EventContent = ({ data }) => {
  const navigate = useNavigate();

  const handleOnClickEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const DDay = (expiry_date) => {
    const now = new Date();
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
        {data !== undefined ? (
          data?.length === 0 ? (
            <NoEventContainer>검색 결과가 없습니다.</NoEventContainer>
          ) : (
            data?.map((el, idx) => (
              <EventContainer key={idx}>
                <EventList onClick={() => handleOnClickEvent(el.post_id)}>
                  <EventTagBox tag={el.event}>
                    <EventTagSpan>{el.event}</EventTagSpan>
                  </EventTagBox>
                  <h4>{el.title}</h4>
                  <p className="host">{el.organizer}</p>
                  <div className="flex info">
                    <p className="dday">
                      D
                      {DDay(el.startPostTime.slice(0, 10)) < 0
                        ? '+' + Math.abs(DDay(el.startPostTime.slice(0, 10)))
                        : '-' + DDay(el.startPostTime.slice(0, 10))}
                    </p>
                    <div className="flex">
                      <AiFillHeart
                        className="eyeicon"
                        size="16"
                        color="#ff6b6b"
                      />
                      <p className="watch">{el.scrap_count}</p>
                    </div>
                  </div>
                </EventList>
                <EventImg>
                  {el.imgUrl === null ? (
                    <ImgNull>
                      <img
                        className="logo"
                        src={process.env.PUBLIC_URL + '/img/main_logo.svg'}
                        alt="main logo"
                      />
                    </ImgNull>
                  ) : (
                    <img className="poster" alt="poster" src={el.imgUrl}></img>
                  )}
                </EventImg>
              </EventContainer>
            ))
          )
        ) : (
          <NoEventContainer>검색 결과가 없습니다.</NoEventContainer>
        )}
        {data?.length % 2 === 1 ? <div className="empty" /> : ''}
      </EventListMain>
    </Container>
  );
};

const EventTagBox = styled.div`
  background-color: ${(props) =>
    props.tag === '축제'
      ? yellow
      : props.tag === '전시'
      ? blue
      : props.tag === '공연'
      ? pink
      : props.tag === '강연'
      ? orange
      : props.tag === '대회'
      ? purple2
      : green_1};
  color: white;
  font-size: 12px;
  width: 35px;
  height: 22px;
  display: flex;
  margin-bottom: 10px;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 18px;
    font-size: 10px;
  }
`;

const EventTagSpan = styled.span`
  margin: auto;
`;

const NoEventContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  width: 800px;
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: ${({ theme }) => theme.colors.gray};
  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;

const ImgNull = styled.div`
  width: 150px;
  height: 210px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  .logo {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const EventListMain = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;

  .empty {
    width: 360px;
    height: 210px;
    display: flex;
    margin-bottom: 10px;
    margin-left: 10px;
    padding-left: 30px;
    padding: 10px;
  }

  @media screen and (max-width: 767px) {
    min-width: 350px;
    width: 100%;
  }
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

  @media screen and (max-width: 767px) {
    justify-content: center;
    margin: 0 auto 30px;
    width: 100%;
    min-width: 350px;
    padding: 0;
  }

  @media screen and (max-width: 395px) {
    min-width: 350px;
    margin: 0 auto 30px;
    padding: 0;
  }
`;

const EventList = styled.div`
  justify-content: row;
  width: 200px;

  @media screen and (max-width: 767px) {
    width: 150px;
  }

  h4 {
    margin-top: 0px;
    margin-bottom: 0px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.dark};
    @media screen and (max-width: 767px) {
      font-size: 13px;
    }
  }

  div.info {
    align-items: center;
  }

  .host {
    font-size: 14px;
    color: #636363;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }

  .dday {
    margin-top: 0;
    font-size: 12px;
    color: #59b89d;
    @media screen and (max-width: 767px) {
      font-size: 11px;
      margin-bottom: 10px;
    }
  }

  .watch {
    margin-top: 1px;
    font-size: 12px;
    color: #737373;
    margin-left: 3px;
    @media screen and (max-width: 767px) {
      font-size: 11px;
      margin-top: 2px;
    }
  }

  .eyeicon {
    margin-left: 10px;
    color: #737373;
    @media screen and (max-width: 767px) {
      width: 20px;
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 767px) {
    width: 150px;
    margin-left: 0;
  }
`;

const EventImg = styled.div`
  width: 150px;
  img {
    justify-content: column;
    width: 150px;
    top: 50%;
    left: 50%;
    position: absoulte;
    cursor: pointer;
  }
`;

export default EventContent;
