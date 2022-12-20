import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';

const PageContainerBox = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1024px;
  min-width: 375px;
  background-color: white;
  margin: 20px 0;
`;

//TODO: 헤더, 푸터 추가
const PageContainer = ({ children, header, footer }) => {
  return (
    <PageContainerBox>
      <ThemeProvider theme={theme}>
        {header === false ? null : <Header />}
        <ContentContainer>{children}</ContentContainer>
        {footer === false ? null : <Footer />}
      </ThemeProvider>
    </PageContainerBox>
  );
};

export default PageContainer;
