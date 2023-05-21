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
  z-index: 500;
`;

const ModalView = styled.div`
  width: 350px;
  height: 160px;
  background-color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    position: absolute;
    top: 25px;
    right: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  div {
    margin-top: 40px;
    font-weight: 600;
  }
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
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
  button.signup {
    &:hover {
      background-color: #d6d6d6;
    }
  }
  button.signin {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
    &:hover {
      background-color: #44cf95;
    }
  }
`;

const NeedLoginModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView>
            <ModalHeader>
              <div>로그인이 필요한 서비스입니다.</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <ModalBtns>
              <button
                className="signin"
                onClick={() => {
                  navigate('/signin');
                }}
              >
                로그인
              </button>
              <button
                className="signup"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </button>
            </ModalBtns>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default NeedLoginModal;
