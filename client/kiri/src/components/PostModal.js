import { useNavigate } from 'react-router';
import styled from 'styled-components';

const PostModal = ({ text, isOpen, setIsOpen, postid }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalContent>
              <div>게시물 {text} 성공 :)</div>
            </ModalContent>
            <ModalBtns>
              <button
                className="cancel"
                onClick={() => {
                  navigate(`/event/${postid}`);
                }}
              >
                내가 {text}한 게시물 보러 가기
              </button>
            </ModalBtns>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

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
  width: 300px;
  height: 160px;
  background-color: white;
  &.fail {
    height: 120px;
  }
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  padding: 30px 0;
  padding-top: 40px;
  margin: 0 15px;
  &.fail {
    border: none;
  }
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  button {
    margin: 0 5px;
    width: 170px;
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

export default PostModal;
