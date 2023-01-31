import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router';

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
  &.fail {
    height: 120px;
  }
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
    &.fail {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  padding: 30px 0;
  margin: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  &.fail {
    border: none;
  }
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  button {
    margin: 0 5px;
    width: 120px;
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

const SignupSuccessModal = ({ isOpen, setIsOpen }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>회원가입 성공</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <ModalContent>회원가입에 성공했습니다! 반가워요:)</ModalContent>
            <ModalBtns>
              <button
                className="cancel"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                로그인하러 가기
              </button>
            </ModalBtns>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

const SignupFailModal = ({ isOpen, setIsOpen }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView className="fail" onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div className="fail">회원가입 실패</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <ModalContent className="fail">
              회원가입에 실패했습니다 :(
            </ModalContent>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export { SignupSuccessModal, SignupFailModal };
