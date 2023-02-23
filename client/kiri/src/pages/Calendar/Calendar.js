import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventList from './EventList';

const Calendar = () => {
  return (
    <PageContainer header footer>
      <Container>
        <CalendarBox>캘린더</CalendarBox>
        <EventBox>
          <EventList></EventList>
        </EventBox>
      </Container>
    </PageContainer>
  );
};

const Container = styled.div``;

const CalendarBox = styled.div``;

const EventBox = styled.div``;

export default Calendar;
