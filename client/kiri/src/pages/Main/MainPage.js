import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import MainCarousel from './MainCarousel';
import MainEvents from './MainEvents';

const MainPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPage = () => {
  return (
    <PageContainer header footer>
      <MainPageContainer>
        <MainCarousel />
        <MainEvents />
      </MainPageContainer>
    </PageContainer>
  );
};

export default MainPage;
