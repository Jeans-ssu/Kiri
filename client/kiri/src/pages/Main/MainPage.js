import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import MainCarousel from './MainCarousel';

const MainPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
`;

const MainPage = () => {
  return (
    <PageContainer header footer>
      <MainPageContainer>
        <MainCarousel />
      </MainPageContainer>
    </PageContainer>
  );
};

export default MainPage;
