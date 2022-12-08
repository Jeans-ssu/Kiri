import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { Footer } from 'Components/Footer';

const PageContainerBox = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
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
        {footer === false ? null : <Footer />}
      </ThemeProvider>
    </PageContainerBox>
  );
};

export default PageContainer;
