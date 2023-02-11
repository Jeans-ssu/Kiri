import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import SignupInputs from './SignupInputs';

const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupHeader = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 28px;
  font-weight: 700;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  margin-top: 10px;
`;

const SignupPage = () => {
  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <SignupPageContainer>
        <SignupHeader>
          <span className="green">끼리끼리</span> 회원가입
        </SignupHeader>
        <SignupInputs />
      </SignupPageContainer>
    </PageContainer>
  );
};

export default SignupPage;
