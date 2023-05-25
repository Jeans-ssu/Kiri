import styled from 'styled-components';

const ImageErrorModal = ({ modal, setModal }) => {
  const openModalHandler = () => {
    setModal(!modal);
  };

  return (
    <ModalContainer>
      {modal ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>이미지 업로드 실패</div>
            </ModalHeader>
            <ModalBtns>
              <button className="cancel" onClick={openModalHandler}>
                닫기
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
  width: 250px;
  height: 150px;
  background-color: white;
  &.fail {
    height: 120px;
  }
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
    margin-top: 40px;
    font-weight: 600;
  }
`;

// const CloseBtnBox = styled.div``;

// const CloseBtn = styled.button``;

export default ImageErrorModal;
