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
//import { AiFillHeart } from 'react-icons/ai';
import { MobileLikedEvents } from './MobileLikedEvents';
import { MobileLikedEventsList } from './MobileLikedEventList';
import { SavedDate } from './SavedDate';
import { selectIsLogin } from 'store/modules/userSlice';

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
  setMobileSelectedDate,
  setMobileLikedEvents,
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
        <SavedDate
          key={day}
          today={day}
          todayEvents={todayEvents}
          setMobileSelectedDate={setMobileSelectedDate}
          extractEvents={extractEvents}
          setMobileLikedEvents={setMobileLikedEvents}
        >
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
                day={day}
              />
            ) : null}
            <MobileLikedEvents eventCnt={todayEvents.length} today={day} />
          </div>
        </SavedDate>
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
  //모바일 버전 선택된 날짜 - 기본은 오늘
  const [mobileSelectedDate, setMobileSelectedDate] = useState(new Date());
  //모바일 버전 선택된 날짜의 이벤트들
  const [mobileLikedEvents, setMobileLikedEvents] = useState([]);

  const isLogin = useSelector(selectIsLogin);

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const getMonthEvents = async () => {
    if (calType === 'liked' && isLogin) {
      //캘린더가 좋아요한 이벤트이고 로그인한 상태이면
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
        mobileSelectedDate={mobileSelectedDate}
        setMobileSelectedDate={setMobileSelectedDate}
        mobileLikedEvents={mobileLikedEvents}
        setMobileLikedEvents={setMobileLikedEvents}
      />
      <MobileLikedEventsList
        today={mobileSelectedDate}
        events={mobileLikedEvents}
        calType={calType}
      />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 950px;
  @media screen and (max-width: 767px) {
    width: 96%;
  }
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
        @media screen and (max-width: 767px) {
          font-size: 1.3em;
        }
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
    @media screen and (max-width: 767px) {
      margin: 4px 0;
    }
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
      @media screen and (max-width: 767px) {
        font-size: 0.8em;
      }
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
      @media screen and (max-width: 767px) {
        padding: 5px 0 5px 5px;
        font-size: 0.7em;
      }
    }
    height: 130px;
    @media screen and (max-width: 767px) {
      height: 50px;
    }
    &.today > span {
      color: ${({ theme }) => theme.colors.mainColor};
    }
  }
  div.cell.disabled {
    background-color: ${({ theme }) => theme.colors.light};
  }
`;
