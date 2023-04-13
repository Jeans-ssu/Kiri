import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import MypageInputs from './MypageInputs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectIsLogin } from 'store/modules/userSlice';
import { useEffect } from 'react';

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MypageHeader = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 28px;
  font-weight: 700;
  margin: 10px 0;
  @media screen and (max-width: 767px) {
    margin: 15px 0;
    font-size: 24px;
  }
`;

const Mypage = () => {
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();

  //미로그인 상태에서 마이페이지 접근시 메인페이지로 이동
  useEffect(() => {
    if (!isLogin) navigate('/');
  }, [isLogin]);

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
