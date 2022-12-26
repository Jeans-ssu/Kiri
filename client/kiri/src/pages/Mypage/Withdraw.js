import styled from 'styled-components';

const WithdrawWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkgray};
  .type {
    font-weight: 700;
    width: 80px;
  }
  .wrapper {
    display: flex;
    align-items: center;
  }
  .info {
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const WitdhdrawBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  width: 80px;
  height: 30px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #ff8787;
  }
`;

//TODO: 탈퇴하기 모달
const Withdraw = () => {
  return (
    <WithdrawWrapper>
      <div className="wrapper">
        <div className="type">회원탈퇴</div>
        <WitdhdrawBtn>탈퇴하기</WitdhdrawBtn>
      </div>
      <div className="info">
        탈퇴시 작성하신 게시물이 모두 삭제되며 복구되지 않습니다.
      </div>
    </WithdrawWrapper>
  );
};

export default Withdraw;
