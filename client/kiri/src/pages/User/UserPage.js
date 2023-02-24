import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import { MypageHeader as UserpageHeader } from 'pages/Mypage/Mypage';
import UserInfo from 'pages/Signup/UserInfo';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPage = () => {
  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <UserPageContainer>
        <UserpageHeader>마이페이지</UserpageHeader>
        <UserInfo />
      </UserPageContainer>
    </PageContainer>
  );
};

export default UserPage;
