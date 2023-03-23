import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isToday,
  parseISO,
  isAfter,
  isBefore,
} from 'date-fns';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'api/axios';
import { LikedEvent } from './LikedEvent';
import { AllLikedEvent } from './AllLikedEvent';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className="header row">
      <IoIosArrowBack className="left" onClick={prevMonth} />
      <div className="dates row">
        <div className="text month">{format(currentMonth, 'M')}월</div>
        {format(currentMonth, 'yyyy')}
      </div>
      <IoIosArrowForward className="right" onClick={nextMonth} />
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  //const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className={`col day ${
          date[i] === '토' || date[i] === '일' ? 'weekend' : null
        }`}
        key={i}
      >
        {date[i]}
      </div>
    );
  }
  return <div className="days row">{days}</div>;
};

// const events = [
//   {
//     post_id: 1,
//     title: '글로벌미디어 졸업전시',
//     organizer: '숭실대',
//     school: '숭실대학교',
//     local: '서울',
//     event: '전시',
//     startScrapTime: '2023-03-05T10:10:10',
//     finishScrapTime: '2023-03-05T10:10:10',
//   },
//   {
//     post_id: 4,
//     title: '숭실대학교 대동제',
//     organizer: '숭실대',
//     school: '숭실대학교',
//     local: '서울',
//     event: '축제',
//     startScrapTime: '2023-03-04T10:10:10',
//     finishScrapTime: '2023-03-05T10:10:10',
//   },
//   {
//     post_id: 5,
//     title: '숭대극회 연극',
//     organizer: '숭실대',
//     school: '숭실대학교',
//     local: '서울',
//     event: '공연',
//     startScrapTime: '2023-03-16T10:10:10',
//     finishScrapTime: '2023-03-20T10:10:10',
//   },
//   {
//     post_id: 8,
//     title: '인공지능 경진대회',
//     organizer: '숭실대',
//     school: '숭실대학교',
//     local: '서울',
//     event: '대회',
//     startScrapTime: '2023-03-26T10:10:10',
//     finishScrapTime: '2023-03-26T10:10:10',
//   },
//   {
//     post_id: 9,
//     title: '취업하는법',
//     organizer: '숭실대',
//     school: '숭실대학교',
//     local: '서울',
//     event: '강연',
//     startScrapTime: '2023-03-31T10:10:10',
//     finishScrapTime: '2023-04-01T10:10:10',
//   },
// ];

//해당 날짜의 이벤트 객체들만 추출하는 함수
const extractEvents = (date, arr) => {
  const extractedEvents = [];
  const formattedDate = format(date, 'MM/dd/yyyy');
  arr?.map((el) => {
    let formattedStartScrapTime = format(
      parseISO(el.startScrapTime || el.startPostTime),
      'MM/dd/yyyy'
    );
    let formattedFinishScrapTime = format(
      parseISO(el.finishScrapTime || el.finishPostTime),
      'MM/dd/yyyy'
    );
    if (
      formattedStartScrapTime === formattedDate &&
      formattedFinishScrapTime === formattedDate
    ) {
      el.calDate = date;
      extractedEvents.push(el);
    } else if (formattedStartScrapTime === formattedDate) {
      el.calDate = date;
      extractedEvents.push(el);
    } else if (formattedFinishScrapTime === formattedDate) {
      el.calDate = date;
      extractedEvents.push(el);
    } else if (
      //여러날인 경우
      isAfter(date, parseISO(el.startScrapTime || el.startPostTime)) &&
      isBefore(date, parseISO(el.finishScrapTime || el.finsihPostTime))
    ) {
      el.calDate = date;
      extractedEvents.push(el);
    }
  });
  return extractedEvents;
};

const RenderCells = ({
  getMonthEvents,
  currentMonth,
  selectedDate,
  onDateClick,
  likedEvents,
}) => {
  const monthStart = startOfMonth(currentMonth); //오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); //오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); //monthStart가 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); //monthEnd가 속한 주의 마지막일

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const todayEvents = extractEvents(day, likedEvents);
      days.push(
        <div
          role="presentation"
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }
          ${isToday(day) ? 'today' : ''}`}
          key={day}
          onClick={() => {
            onDateClick(cloneDay);
          }}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : 'text'
            }
          >
            {formattedDate}
          </span>
          {todayEvents.slice(0, 3)?.map((el, idx) => {
            return (
              <LikedEvent
                key={idx}
                getMonthEvents={getMonthEvents}
                eventId={el.post_id}
                isSameMonth={isSameMonth(day, monthStart)}
                title={el.title}
                type={el.event}
                school={el.school}
                startTime={el.startScrapTime || el.startPostTime}
                finishTime={el.finishScrapTime || el.finishPostTime}
                organizer={el.organizer}
              />
            );
          })}
          {todayEvents.length > 3 ? (
            <AllLikedEvent
              leftEvents={todayEvents.length - 3}
              todayEvents={todayEvents}
            />
          ) : null}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const CalendarComponent = ({ calType, region }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [likedEvents, setLikedEvents] = useState([]);

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const getMonthEvents = async () => {
    if (calType === 'liked') {
      try {
        const response = await axios.get(
          `/calendar?year=${format(currentMonth, 'yyyy')}&month=${format(
            currentMonth,
            'M'
          )}`
        );
        const data = response.data;
        setLikedEvents(data);
      } catch (error) {
        console.error('ERROR: ', error);
      }
    } else {
      //calType === 'region'
      try {
        const response = await axios.get(
          `/scrap?year=${format(currentMonth, 'yyyy')}&month=${format(
            currentMonth,
            'M'
          )}&local=${region}`
        );
        const data = response.data;
        setLikedEvents(data);
      } catch (error) {
        console.error('ERROR: ', error);
      }
    }
  };

  useEffect(() => {
    getMonthEvents();
  }, [currentMonth, calType, region]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <CalendarContainer className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        getMonthEvents={getMonthEvents}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        likedEvents={likedEvents}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 950px;
  //border: 1px solid black;
  div.row {
    display: flex;
  }
  div.col {
    display: flex;
    flex-direction: column;
  }
  div.header {
    align-items: center;
    color: ${({ theme }) => theme.colors.dark};
    div.dates {
      font-weight: 600;
      display: flex;
      align-items: baseline;
      div.month {
        font-size: 28px;
        font-weight: 600;
        padding-right: 5px;
        text-align: end;
      }
    }
    svg {
      width: 18px;
      height: 18px;
      color: ${({ theme }) => theme.colors.mainColor};
      &:hover {
        cursor: pointer;
      }
      &.left {
        margin-right: 10px;
      }
      &.right {
        margin-left: 10px;
      }
    }
    margin: 8px 0;
  }
  div.days {
    border-left: 1px solid transparent;
    div.day {
      width: 100%;
      height: 30px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.darkgray};
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
      padding: 3px 3px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.darkgray};
    }
    div.weekend {
      color: ${({ theme }) => theme.colors.gray};
    }
  }
  div.body {
    border-left: 1px solid ${({ theme }) => theme.colors.lightgray};
  }
  div.cell {
    width: 100%;
    border-right: 1px solid ${({ theme }) => theme.colors.lightgray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
    color: ${({ theme }) => theme.colors.darkgray};
    span.not-valid {
      color: ${({ theme }) => theme.colors.gray};
    }
    span.text {
      font-size: 13px;
      font-weight: 600;
      padding: 10px 0 5px 10px;
    }
    height: 130px;
    &.today > span {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
  div.cell.disabled {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;
