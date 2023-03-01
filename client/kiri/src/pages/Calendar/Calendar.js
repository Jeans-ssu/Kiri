import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventList from './EventList';
import { CalendarComponent } from 'components/calendar/Calendar';

const Calendar = () => {
  return (
    <PageContainer header footer padding="15px 0">
      <Container>
        <CalendarBox>
          <CalendarComponent />
        </CalendarBox>
        <EventBox>
          <EventList></EventList>
        </EventBox>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div``;

const CalendarBox = styled.div`
  display: flex;
  justify-content: center;
`;

const EventBox = styled.div``;

export default Calendar;
