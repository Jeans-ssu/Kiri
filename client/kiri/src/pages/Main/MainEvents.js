import styled from 'styled-components';
import { useNavigate } from 'react-router';

const data = [
  {
    eventId: 1,
    img: 'img',
    title: 'event 1',
    content: 'content',
  },
  {
    eventId: 2,
    img: 'img',
    title: 'event 2',
    content: 'content',
  },
  {
    eventId: 3,
    img: 'img',
    title: 'event 3',
    content: 'content',
  },
  {
    eventId: 4,
    img: 'img',
    title: 'event 4',
    content: 'content',
  },
  {
    eventId: 5,
    img: 'img',
    title: 'event 5',
    content: 'content',
  },
];

const MainEventsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const MainHeader = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  .purple {
    color: ${({ theme }) => theme.colors.purple};
  }
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  .yellow {
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

const MainContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MainEvent = styled.div`
  width: 18%;
  &:hover {
    cursor: pointer;
  }
`;

const EventImgContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  position: relative;
  .fill,
  .date {
    position: absolute;
    top: 0;
    width: 100%;
    visibility: hidden;
  }
  .fill {
    background-color: ${({ theme }) => theme.colors.dark};
    opacity: 0.6;
    z-index: 100;
    height: 97%;
  }
  .date {
    z-index: 150;
    height: 100%;
    text-align: center;
    padding-top: 40%;
    font-weight: 600;
    font-size: 22px;
  }
  :hover {
    .fill,
    .date {
      visibility: visible;
    }
  }
`;

const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 600;
  }
  .content {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 13px;
  }
`;

//TODO: 이벤트 D-DAY 계산
const MainEvents = () => {
  const navigate = useNavigate();

  const handleOnClickEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };
  return (
    <MainEventsContainer>
      <MainHeader>요즘 학교 축제 어때요?</MainHeader>
      <MainContents>
        {data?.map((el) => {
          return (
            <MainEvent
              key={el.eventId}
              onClick={() => handleOnClickEvent(el.eventId)}
            >
              <EventImgContainer>
                <div className="fill"></div>
                <div className="date">D-10</div>
                <img
                  src={process.env.PUBLIC_URL + '/img/event_cover.jpeg'}
                  alt="event cover"
                />
              </EventImgContainer>
              <EventInfoContainer>
                <div className="title">{el.title}</div>
                <div className="content">{el.content}</div>
              </EventInfoContainer>
            </MainEvent>
          );
        })}
      </MainContents>
    </MainEventsContainer>
  );
};

export default MainEvents;
