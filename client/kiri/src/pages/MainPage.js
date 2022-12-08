import styled from 'styled-components';

const MainPageContainer = styled.div`
  color: ${({ theme }) => theme.colors.mainColor};
`;

const MainPage = () => {
  return (
    <MainPageContainer>
      <div>메인 페이지</div>
    </MainPageContainer>
  );
};

export default MainPage;
