import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
//import EventList from './EventList';
import { CalendarComponent } from 'components/calendar/Calendar';
import { useState } from 'react';
import { Regions } from 'util/info';

const Calendar = () => {
  const [calType, setCalType] = useState('liked'); //캘린더 타입 liked or region
  const [region, setRegion] = useState('서울');

  return (
    <PageContainer
      header
      footer
      margin_bottom={false}
      padding="15px 0 60px 0"
      page={'calendar'}
    >
      <Container>
        <CalendarBox>
          <CalendarSelect
            calType={calType}
            setCalType={setCalType}
            region={region}
            setRegion={setRegion}
          />
          <CalendarComponent calType={calType} region={region} />
        </CalendarBox>
        {/* <EventBox>
          <EventList></EventList>
        </EventBox> */}
      </Container>
    </PageContainer>
  );
};

const CalendarSelect = ({ calType, setCalType, setRegion }) => {
  const handleClickCalTypeBtn = () => {
    if (calType === 'liked') setCalType('region');
    else setCalType('liked');
  };

  const handleChagneRegionSelect = (e) => {
    setRegion(e.target.value);
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
      {calType === 'region' ? (
        <select name="region" onChange={handleChagneRegionSelect}>
          {Regions.map((el, idx) => {
            return (
              <option key={idx} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      ) : null}
    </CalendarSelectContainer>
  );
};

const CalendarSelectContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  width: 950px;
  height: 25px;
  padding: 10px 0;
  margin-bottom: 10px;
  display: flex;
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
  select {
    outline: none;
    font-size: 12px;
    padding: 3px;
    margin-bottom: 2px;
    border: none;
    &:hover {
      cursor: pointer;
    }
    color: ${({ theme }) => theme.colors.darkgray};
    font-weight: 600;
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
