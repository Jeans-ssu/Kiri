import styled from 'styled-components';
import { MainHeader } from './MainEvents';
import { AiFillEye, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router';

export const eventsData = [
  {
    eventId: '1',
    title: 'event 1',
    host: 'someware',
    view: 23,
    like: 13,
  },
  {
    eventId: '2',
    title: 'event 2',
    host: 'someware',
    view: 35,
    like: 34,
  },
  {
    eventId: '3',
    title: 'event 3',
    host: 'someware',
    view: 8,
    like: 3,
  },
  {
    eventId: '4',
    title: 'event 4',
    host: 'someware',
    view: 64,
    like: 29,
  },
  {
    eventId: '5',
    title: 'event 5',
    host: 'someware',
    view: 45,
    like: 34,
  },
  {
    eventId: '6',
    title: 'event 6',
    host: 'someware',
    view: 32,
    like: 12,
  },
  {
    eventId: '7',
    title: 'event 7',
    host: 'someware',
    view: 97,
    like: 38,
  },
  {
    eventId: '8',
    title: 'event 8',
    host: 'someware',
    view: 84,
    like: 23,
  },
  {
    eventId: '9',
    title: 'event 9',
    host: 'someware',
    view: 23,
    like: 12,
  },
  {
    eventId: '10',
    title: 'event 10',
    host: 'someware',
    view: 63,
    like: 21,
  },
];

const SelectedEventsContainer = styled.div`
  width: 90%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  width: 100%;
`;

const EventsHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  .title {
    width: 70%;
  }
  .host {
    width: 20%;
  }
  .view {
    width: 5%;
    color: ${({ theme }) => theme.colors.gray};
  }
  .like {
    width: 5%;
    color: ${({ theme }) => theme.colors.purple};
  }
  padding: 5px 0 0;
  border-top: 2px solid ${({ theme }) => theme.colors.green_1};
  border-bottom: 2px solid ${({ theme }) => theme.colors.green_1};
`;

const EventsContentContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  padding: 4px 0;
  div {
    display: flex;
    align-items: center;
  }
  .title {
    width: 70%;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.darkgray};
    box-sizing: border-box;
  }
  .host {
    width: 20%;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
    justify-content: center;
  }
  .view {
    width: 5%;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 13px;
    justify-content: center;
  }
  .like {
    width: 5%;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    justify-content: center;
    color: ${({ theme }) => theme.colors.darkgray};
  }
  &:hover {
    cursor: pointer;
    .title {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
`;

export const EventsHeader = () => {
  return (
    <EventsHeaderContainer>
      <div className="title">이벤트</div>
      <div className="host">주최</div>
      <div className="like">
        <AiFillHeart size="18" />
      </div>
      <div className="view">
        <AiFillEye size="18" />
      </div>
    </EventsHeaderContainer>
  );
};

export const EventContent = ({ event }) => {
  const navigate = useNavigate();

  const handleClickEvent = () => {
    navigate(`/event/${event.eventId}`);
  };

  return (
    <EventsContentContainer onClick={handleClickEvent}>
      <div className="title">{event.title}</div>
      <div className="host">{event.host}</div>
      <div className="like">{event.like}</div>
      <div className="view">{event.view}</div>
    </EventsContentContainer>
  );
};

//TODO: 유저 닉네임, 관심분야 설정
//TODO: 로그인 안했을 때 처리 -> 랜덤으로
const SelectedEvents = () => {
  return (
    <SelectedEventsContainer>
      <MainHeader>
        <span className="purple">김뫄뫄</span>님이 관심있는{' '}
        <span className="green">IT</span> 분야 이벤트
      </MainHeader>
      <MainContent>
        <EventsHeader />
        {eventsData?.map((el) => {
          return <EventContent key={el.eventId} event={el} />;
        })}
      </MainContent>
    </SelectedEventsContainer>
  );
};

export default SelectedEvents;
