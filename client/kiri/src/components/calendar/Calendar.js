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
} from 'date-fns';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'api/axios';

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

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
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

export const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [likedEvents, setLikedEvents] = useState([]);

  useEffect(() => {
    axios
      .get(
        `/calendar?year=${format(currentMonth, 'yyyy')}&month=${format(
          currentMonth,
          'M'
        )}`
      )
      .then((res) => {
        setLikedEvents(res.data);
        console.log(likedEvents);
      })
      .catch((err) => console.log('ERROR: ', err));
  }, [currentMonth]);

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
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
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
      padding: 10px;
    }
    height: 100px;
    &.today > span {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
  div.cell.disabled {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;
