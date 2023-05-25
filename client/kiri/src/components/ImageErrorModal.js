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
            <ModalContent>
              <Message className="message">
                이미지를 업로드할 수 없습니다
              </Message>
            </ModalContent>
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
  &.fail {
    border: none;
  }
`;

const Message = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export default ImageErrorModal;
