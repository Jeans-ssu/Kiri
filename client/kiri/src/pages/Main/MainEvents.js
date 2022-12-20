import styled from 'styled-components';

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

const MainHeader = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const MainContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MainEvent = styled.div`
  width: 18%;
`;

const EventImgContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    font-weight: 600;
  }
  .content {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 13px;
  }
`;

const MainEvents = () => {
  return (
    <MainEventsContainer>
      <MainHeader>요즘 학교 축제 어때요?</MainHeader>
      <MainContents>
        {data.map((el) => {
          return (
            <MainEvent key={el.eventId}>
              <EventImgContainer>
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
