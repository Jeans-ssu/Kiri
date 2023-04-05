import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import Footer from '../components/Footer';
import Header from '../components/Header';

const PageContainerBox = styled.div`
  min-height: 100vh;
  min-width: 1096px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 1024px;
  background-color: white;
  margin-bottom: 30px;
  padding: ${(props) => (props.padding ? props.padding : '40px 0')};
  &.none {
    margin-bottom: 0;
  }
`;

//TODO: 헤더, 푸터 추가
const PageContainer = ({
  children,
  header,
  footer,
  margin_bottom = true,
  page = {},
  padding,
}) => {
  return (
    <PageContainerBox>
      <ThemeProvider theme={theme}>
        {header === false ? null : <Header page={page} />}
        <ContentContainer
          className={margin_bottom ? null : 'none'}
          padding={padding}
        >
          {children}
        </ContentContainer>
        {footer === false ? null : <Footer />}
      </ThemeProvider>
    </PageContainerBox>
  );
};

export default PageContainer;
