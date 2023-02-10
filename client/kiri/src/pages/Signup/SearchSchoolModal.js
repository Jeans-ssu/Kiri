import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
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
    font-weight: 400;
    font-size: 14px;
  }
`;

const SchoolSearchbarContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 8px;
    top: 18px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const SchoolSearchbar = styled.input`
  box-sizing: border-box;
  width: 350px;
  height: 30px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding: 0 5px;
  outline: none;
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
              <div>재학/소속 중인 대학교 이름을 검색해주세요.</div>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <SchoolSearchbarContainer>
              <SchoolSearchbar />
              <FiSearch />
            </SchoolSearchbarContainer>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default SearchSchoolModal;
