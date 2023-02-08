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
  width: 450px;
  height: 350px;
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

const SearchSchoolModal = ({ isOpen, setIsOpen }) => {
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div>학교 검색</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default SearchSchoolModal;
