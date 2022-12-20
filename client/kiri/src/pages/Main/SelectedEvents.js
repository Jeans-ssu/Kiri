import styled from 'styled-components';
import { MainHeader } from './MainEvents';
import { AiFillEye } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

const data = [
  {
    eventId: '1',
    title: 'event 1',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '2',
    title: 'event 2',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '3',
    title: 'event 3',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '4',
    title: 'event 4',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '5',
    title: 'event 5',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '6',
    title: 'event 6',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '7',
    title: 'event 7',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '8',
    title: 'event 8',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '9',
    title: 'event 9',
    host: 'someware',
    view: '23',
  },
  {
    eventId: '10',
    title: 'event 10',
    host: 'someware',
    view: '23',
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

const EventsHeader = styled.div`
  width: 100%;
  display: flex;
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
    width: 10%;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  padding: 5px 0 0;
  border-top: 2px solid ${({ theme }) => theme.colors.green_1};
  border-bottom: 2px solid ${({ theme }) => theme.colors.green_1};
`;

const EventsContent = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  padding: 4px 0;
  .title {
    width: 70%;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.darkgray};
  }
  .host {
    width: 20%;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
  }
  .view {
    width: 10%;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 600;
    font-size: 13px;
  }
`;

const OpenBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 0;
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.darkgray};
    :hover {
      cursor: pointer;
    }
  }
`;

//TODO: 유저 닉네임, 관심분야 설정
//TODO: 로그인 안했을 때 처리 -> 랜덤으로
const SelectedEvents = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectedEventsContainer>
      <MainHeader>
        <span className="purple">김뫄뫄</span>님이 관심있는{' '}
        <span className="green">IT</span> 분야 이벤트
      </MainHeader>
      <MainContent>
        <EventsHeader>
          <div className="title">이벤트</div>
          <div className="host">주최</div>
          <div className="view">
            <AiFillEye size="18" />
          </div>
        </EventsHeader>
        {isOpen ? (
          <>
            {data?.map((el) => {
              return (
                <EventsContent key={el.eventId}>
                  <div className="title">{el.title}</div>
                  <div className="host">{el.host}</div>
                  <div className="view">{el.view}</div>
                </EventsContent>
              );
            })}
          </>
        ) : (
          <>
            {data.slice(0, 5)?.map((el) => {
              return (
                <EventsContent key={el.eventId}>
                  <div className="title">{el.title}</div>
                  <div className="host">{el.host}</div>
                  <div className="view">{el.view}</div>
                </EventsContent>
              );
            })}
          </>
        )}
        <OpenBtnContainer>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoIosArrowUp /> : <BsThreeDotsVertical />}
          </button>
        </OpenBtnContainer>
      </MainContent>
    </SelectedEventsContainer>
  );
};

export default SelectedEvents;
