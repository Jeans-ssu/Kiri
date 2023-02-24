import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const MyEventsContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
`;

const MyEventsHeader = styled.div`
  padding: 15px 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

const MyEventsContentWrapper = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  overflow-y: auto;
  overflow: overlay;
`;

const myevents = [
  {
    post_id: 1,
    title: '숭실대학교 글로벌미디어학부 졸업전시회에 초대합니다',
    event: '전시',
    startPostTime: '2022-11-25T12:10:00',
    finishPostTime: '2022-11-25T12:30:00',
  },
  {
    post_id: 2,
    title: '숭실대학교 대동제',
    event: '축제',
    startPostTime: '2022-11-25T12:10:00',
    finishPostTime: '2022-11-25T12:30:00',
  },
];

const MyEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(myevents);
  }, [events]);

  return (
    <MyEventsContainer>
      <MyEventsHeader>내가 작성한 이벤트</MyEventsHeader>
      <MyEventsContentWrapper>
        {events.map((el) => {
          return <MyEvent key={el.post_id} eventInfo={el} />;
        })}
      </MyEventsContentWrapper>
    </MyEventsContainer>
  );
};

const MyEventContainer = styled.div`
  box-sizing: border-box;
  width: 600px;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
  }
  div {
    margin: 3px 0;
  }
  div.title {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.mainColor};
    position: relative;
    span.tag {
      position: absolute;
      right: 0;
      background-color: ${({ theme }) => theme.colors.mainColor};
      color: white;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 11px;
    }
  }
  div.time {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const MyEvent = ({ eventInfo }) => {
  const navigate = useNavigate();

  return (
    <MyEventContainer
      onClick={() => {
        navigate(`/event/${eventInfo.post_id}`);
      }}
    >
      <div className="title">
        <span>{eventInfo.title}</span>
        <span className="tag">{eventInfo.event}</span>
      </div>
      <div className="time">{`${eventInfo.startPostTime.slice(
        0,
        10
      )} ~ ${eventInfo.finishPostTime.slice(0, 10)}`}</div>
    </MyEventContainer>
  );
};

export default MyEvents;
