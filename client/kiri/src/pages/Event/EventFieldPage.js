import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';

const EventFieldPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
`;

const EventFieldPage = () => {
  return (
    <PageContainer header footer>
      <EventFieldPageContainer>
        <div>이벤트 분야</div>
      </EventFieldPageContainer>
    </PageContainer>
  );
};

export default EventFieldPage;
