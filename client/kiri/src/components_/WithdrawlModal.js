import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const ModalContainer = styled.div``;

const ModalBackdrop = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  width: 400px;
  height: 200px;
  background-color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    position: absolute;
    top: 20px;
    right: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  div {
    margin-top: 20px;
    font-weight: 600;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  padding: 30px 0;
  margin: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  button {
    margin: 0 5px;
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
  button.withdraw {
    &:hover {
      background-color: #d6d6d6;
    }
  }
  button.cancel {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
    &:hover {
      background-color: #44cf95;
    }
  }
`;

const WithdrawlModal = ({ isOpen, setIsOpen, handleWithdraw }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>회원 탈퇴</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <ModalContent>정말 탈퇴하시겠습니까?</ModalContent>
            <ModalBtns>
              <button className="withdraw" onClick={handleWithdraw}>
                탈퇴
              </button>
              <button className="cancel" onClick={openModalHandler}>
                취소
              </button>
            </ModalBtns>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default WithdrawlModal;
