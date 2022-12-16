import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';

const EventKeyworldPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
`;

const EventKeyworldPage = () => {
  return (
    <PageContainer header footer>
      <EventKeyworldPageContainer>
        <div>이벤트 키워드</div>
      </EventKeyworldPageContainer>
    </PageContainer>
  );
};

export default EventKeyworldPage;
