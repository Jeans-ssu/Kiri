import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Footer from '../components_/Footer';
import Header from '../components_/Header';

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
  margin-bottom: 30px;
  padding: 40px 0;
  &.none {
    margin-bottom: 0;
  }
`;

//TODO: 헤더, 푸터 추가
const PageContainer = ({ children, header, footer, margin_bottom = true }) => {
  return (
    <PageContainerBox>
      <ThemeProvider theme={theme}>
        {header === false ? null : <Header />}
        <ContentContainer className={margin_bottom ? null : 'none'}>
          {children}
        </ContentContainer>
        {footer === false ? null : <Footer />}
      </ThemeProvider>
    </PageContainerBox>
  );
};

export default PageContainer;
