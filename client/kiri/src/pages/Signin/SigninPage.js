import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import SigninInputs from './SigninInputs';

const SigninPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigninHeader = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 28px;
  font-weight: 700;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  margin: 40px 0;
`;

const SigninPage = () => {
  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <SigninPageContainer>
        <SigninHeader>
          <span className="green">끼리끼리</span> 로그인
        </SigninHeader>
        <SigninInputs />
      </SigninPageContainer>
    </PageContainer>
  );
};

export default SigninPage;
