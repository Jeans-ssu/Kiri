import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import MypageInputs from './MypageInputs';

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MypageHeader = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const Mypage = () => {
  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <MypageContainer>
        <MypageHeader>회원정보</MypageHeader>
        <MypageInputs />
      </MypageContainer>
    </PageContainer>
  );
};

export default Mypage;
