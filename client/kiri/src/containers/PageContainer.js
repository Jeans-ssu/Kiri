import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

const PageContainerBox = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  min-width: 500px;
`;

//TODO: 헤더, 푸터 추가
const PageContainer = ({ children, header, footer }) => {
  return (
    <PageContainerBox>
      <ThemeProvider theme={theme}>
        {header === false ? null : <div>header</div>}
        <ContentContainer>{children}</ContentContainer>
        {footer === false ? null : <div>footer</div>}
      </ThemeProvider>
    </PageContainerBox>
  );
};

export default PageContainer;
