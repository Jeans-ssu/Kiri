import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
//import EventList from './EventList';
import { CalendarComponent } from 'components/calendar/Calendar';
import { useState } from 'react';

const Calendar = () => {
  const [calType, setCalType] = useState('liked'); //캘린더 타입 liked or region

  return (
    <PageContainer
      header
      footer
      margin_bottom={false}
      padding="15px 0"
      page={'calendar'}
    >
      <Container>
        <CalendarBox>
          <CalendarSelect calType={calType} setCalType={setCalType} />
          <CalendarComponent calType={calType} />
        </CalendarBox>
        {/* <EventBox>
          <EventList></EventList>
        </EventBox> */}
      </Container>
    </PageContainer>
  );
};

const CalendarSelect = ({ calType, setCalType }) => {
  const handleClickCalTypeBtn = () => {
    if (calType === 'liked') setCalType('region');
    else setCalType('liked');
  };

  return (
    <CalendarSelectContainer>
      <button
        className={calType === 'liked' ? 'current' : null}
        onClick={handleClickCalTypeBtn}
      >
        좋아요한 이벤트
      </button>
      <button
        className={calType === 'region' ? 'current' : null}
        onClick={handleClickCalTypeBtn}
      >
        지역별 이벤트
      </button>
    </CalendarSelectContainer>
  );
};

const CalendarSelectContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  width: 950px;
  padding: 10px 0;
  margin-bottom: 10px;
  button {
    margin: 0 3px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray};
    &:hover {
      cursor: pointer;
    }
  }
  button.current {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const Container = styled.div``;

const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//const EventBox = styled.div``;

export default Calendar;
