import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';

const MainPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
`;

const MainPage = () => {
  return (
    <PageContainer header footer>
      <MainPageContainer>
        <div>메인 페이지</div>
      </MainPageContainer>
    </PageContainer>
  );
};

export default MainPage;
