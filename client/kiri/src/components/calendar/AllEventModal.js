import styled from 'styled-components';
import format from 'date-fns/format';
import getISODay from 'date-fns/getISODay';
import parseISO from 'date-fns/parseISO';
import eventColorMatcher from 'util/eventColorMatcher';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router';

export const AllEventModal = ({ isOpen, setIsOpen, todayEvents, day }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const dayNum = getISODay(day);
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const navigate = useNavigate();

  return (
    <AllEventModalContainer>
      {isOpen ? (
        <AllEventModalBackdrop onClick={openModalHandler}>
          <AllEventModalView>
            <CloseBtn
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <IoMdClose />
            </CloseBtn>
            <div className="date">
              {format(day, 'yyyy. MM. dd')} ({days[dayNum]})
            </div>
            <div className="events">
              {todayEvents?.map((el) => {
                return (
                  <EventBox key={el.post_id}>
                    <div className="tag">
                      <EventTag color={eventColorMatcher(el.event)}>
                        {el.event}
                      </EventTag>
                    </div>
                    <div className="school">{el.school}</div>
                    <div
                      className="title"
                      role="presentation"
                      onClick={() => {
                        navigate(`/event/${el.post_id}`);
                      }}
                    >
                      {el.title}
                    </div>
                    <div className="days">
                      {`${format(
                        parseISO(el.startScrapTime || el.startPostTime),
                        'MM/dd'
                      )} ~
                    ${format(
                      parseISO(el.finishScrapTime || el.finishPostTime),
                      'MM/dd'
                    )}`}
                    </div>
                  </EventBox>
                );
              })}
            </div>
          </AllEventModalView>
        </AllEventModalBackdrop>
      ) : null}
    </AllEventModalContainer>
  );
};

const AllEventModalContainer = styled.div``;

const AllEventModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllEventModalView = styled.div`
  width: 600px;
  height: 400px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  display: flex;
  flex-direction: column;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;

  div.date {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  }
  div.events {
    height: 310px;
    overflow-y: scroll;
    -ms-overflow-style: none;
  }
  div.events::-webkit-scrollbar {
    display: none;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  svg {
    width: 16px;
    height: 16px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const EventBox = styled.div`
  display: flex;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  align-items: center;
  font-size: 13px;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.darkgray};
  div.tag {
    width: 40px;
  }
  div.school {
    font-weight: 600;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  div.title {
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  div.days {
    white-space: nowrap;
    text-align: end;
  }
  div.like {
    box-sizing: border-box;
    margin-left: 15px;
    svg {
      fill: ${({ theme }) => theme.colors.gray};
      width: 18px;
      height: 18px;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

const EventTag = styled.div`
  background-color: ${({ color }) => color};
  color: white;
  font-size: 13px;
  border-radius: 10px;
  width: 32px;
  box-sizing: border-box;
  padding: 3px 6px;
  font-size: 11px;
  font-weight: 500;
`;
