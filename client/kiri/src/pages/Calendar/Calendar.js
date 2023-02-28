import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventList from './EventList';
import { CalendarComponent } from 'components/calendar/Calendar';

const Calendar = () => {
  return (
    <PageContainer header footer>
      <Container>
        <CalendarComponent />
        <EventBox>
          <EventList></EventList>
        </EventBox>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div``;

//const CalendarBox = styled.div``;

const EventBox = styled.div``;

export default Calendar;
