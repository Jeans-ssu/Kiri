import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { format, getDay, parseISO, addDays } from 'date-fns';
import eventColorMatcher from 'util/eventColorMatcher';
import { CreateIcsFile } from 'pages/Calendar/CreateIcsFile';

const Days = ['일', '월', '화', '수', '목', '금', '토'];

export const MobileLikedEventsList = ({
  today = new Date(),
  events,
  calType,
}) => {
  const [likedEvents, setLikedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLikedEvents(events);
  }, [today]);

  return (
    <ListContainer className={calType === 'region' ? 'hide' : null}>
      <ListHeader>{`${format(today, 'yyyy. MM. dd')} (${
        Days[getDay(today)]
      })`}</ListHeader>
      <EventsBox>
        {likedEvents?.map((el) => {
          return (
            <EventContainer key={el.post_id}>
              <div
                className="type"
                style={{ backgroundColor: eventColorMatcher(el.event) }}
              >
                {el.event}
              </div>
              <div className="school">{el.school}</div>
              <div
                className="title"
                onClick={() => {
                  navigate(`/event/${el.post_id}`);
                }}
                role="presentation"
              >
                {el.title}
              </div>
              <button className="export">
                <a
                  href={CreateIcsFile(
                    format(parseISO(el.startScrapTime), 'yyyyMMdd'),
                    format(
                      addDays(parseISO(el.finishScrapTime), 1),
                      'yyyyMMdd'
                    ),
                    el.title,
                    el.event,
                    el.school
                  )}
                  download={`${el.title}.ics`}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL + '/img/calendar_export_icon.svg'
                    }
                    alt="내보내기"
                  />
                </a>
              </button>
            </EventContainer>
          );
        })}
      </EventsBox>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    width: 100%;
    margin-top: 15px;
  }
  &.hide {
    display: none;
  }
`;

const ListHeader = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const EventsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
`;

const EventContainer = styled.div`
  display: flex;
  font-size: 13px;
  height: 25px;
  align-items: center;
  margin: 3px 0;
  padding: 3px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  div.type {
    font-weight: 600;
    font-size: 11px;
    width: 32px;
    border-radius: 10px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    color: white;
  }
  div.school {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
    margin: 0 5px;
  }
  div.title {
    flex: 1;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.dark};
    &:hover {
      cursor: pointer;
    }
  }
  button.export {
    border: none;
    background-color: transparent;
    margin-left: 5px;
    padding: 0;
    display: flex;
    align-items: center;
    width: 20px;
    img {
      width: 15px;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
