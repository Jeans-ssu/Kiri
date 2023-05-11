import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'api/axios';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'store/modules/userSlice';

export const SavedDate = ({
  children,
  today,
  todayEvents,
  setMobileSelectedDate,
  extractEvents,
  setMobileLikedEvents,
}) => {
  const [date] = useState(today);
  const [events, setEvents] = useState(todayEvents);

  //로그인 여부
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) {
      getMonthEvents();
    }
  }, []);

  const getMonthEvents = async () => {
    try {
      const response = await axios.get(
        `/calendar?year=${format(date, 'yyyy')}&month=${format(date, 'M')}`
      );
      const data = response.data;
      setEvents(extractEvents(date, data));
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  return (
    <BoxContainer
      onClick={() => {
        setMobileSelectedDate(date);
        setMobileLikedEvents(events);
      }}
    >
      {children}
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  box-sizing: content-box;
  width: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.lightgray};
`;
