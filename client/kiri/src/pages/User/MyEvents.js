import styled from 'styled-components';
import { useNavigate } from 'react-router';
import eventColorMatcher from 'util/eventColorMatcher';

const MyEvent = ({ eventInfo }) => {
  const navigate = useNavigate();

  //TODO: 이벤트 타입 api 수정 필요
  return (
    <MyEventContainer
      onClick={() => {
        navigate(`/event/${eventInfo.post_id}`);
      }}
    >
      <div className="title">
        <span>{eventInfo.title}</span>
        <span
          className="tag"
          style={{ backgroundColor: eventColorMatcher(eventInfo.event) }}
        >
          {eventInfo.event}
        </span>
      </div>
      <div className="time">{`${eventInfo.startPostTime.slice(
        0,
        10
      )} ~ ${eventInfo.finishPostTime.slice(0, 10)}`}</div>
    </MyEventContainer>
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
  @media screen and (max-width: 767px) {
    width: 360px;
  }
`;

const MyEvents = ({ userEvents }) => {
  const navigate = useNavigate();

  return (
    <MyEventsContainer>
      <MyEventsHeader>내가 작성한 이벤트</MyEventsHeader>
      <MyEventsContentWrapper>
        {userEvents.length !== 0 ? (
          userEvents?.map((el) => {
            return <MyEvent key={el.post_id} eventInfo={el} />;
          })
        ) : (
          <EventGuideMsg>
            <div>
              아직 작성한 이벤트가 없습니다. 원하는 이벤트를 공유해보세요!
            </div>
            <button onClick={() => navigate('/event/write')}>
              글 작성하러 가기
            </button>
          </EventGuideMsg>
        )}
      </MyEventsContentWrapper>
    </MyEventsContainer>
  );
};

const MyEventsContainer = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 360px;
  }
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
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 767px) {
    width: 360px;
  }
`;

const EventGuideMsg = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
  button {
    background-color: transparent;
    border: none;
    margin: 8px;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 500;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default MyEvents;
