import styled from 'styled-components';

const WithdrawWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  padding: 20px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkgray};
  .type {
    font-weight: 700;
    width: 80px;
  }
`;

const WitdhdrawBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  height: 30px;
  font-size: 14px;
  font-weight: 600;
`;

const Withdraw = () => {
  return (
    <WithdrawWrapper>
      <div className="type">회원탈퇴</div>
      <WitdhdrawBtn>탈퇴하기</WitdhdrawBtn>
    </WithdrawWrapper>
  );
};

export default Withdraw;
