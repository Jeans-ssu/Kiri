import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';

const EventInfoContainer = styled.div``;

const EventTopdiv = styled.div``;

const EventUpdiv = styled.div``;

const EventTitlediv = styled.div``;

const EventSharediv = styled.div``;

const EventBookmarkdiv = styled.div``;

const EventPerioddiv = styled.div``;

const EventDdaydiv = styled.div``;

const EventWriterdiv = styled.div``;

const EventTimediv = styled.div``;

const EventPosterdiv = styled.div``;

const EventInfodiv = styled.div``;

const EventContentdiv = styled.div``;

const EventInfoPage = () => {
  return (
    <PageContainer header footer>
      <EventInfoContainer>
        <EventTopdiv>
          <EventUpdiv>
            <EventTitlediv>
              <h1>Event title</h1>
            </EventTitlediv>
            <EventSharediv></EventSharediv>
            <EventBookmarkdiv></EventBookmarkdiv>
          </EventUpdiv>
          <EventPerioddiv>
            <EventDdaydiv>D-??</EventDdaydiv>
            <EventWriterdiv>주최</EventWriterdiv>
            <EventTimediv>2023.02.06</EventTimediv>
          </EventPerioddiv>
        </EventTopdiv>
        <EventContentdiv>
          <EventPosterdiv>
            <img
              className="poster"
              alt="poster"
              src={`${process.env.PUBLIC_URL}/poster.jpg`}
            ></img>
          </EventPosterdiv>
          <EventInfodiv></EventInfodiv>
        </EventContentdiv>
      </EventInfoContainer>
    </PageContainer>
  );
};

export default EventInfoPage;
