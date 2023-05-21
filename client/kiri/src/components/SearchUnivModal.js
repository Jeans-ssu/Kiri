import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { SearchSchool } from 'util/SearchUniv';

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

const UnivSearchbarContainer = styled.div`
  position: relative;
  svg {
    position: absolute;
    right: 8px;
    top: 18px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const UnivSearchbarInput = styled.input`
  box-sizing: border-box;
  width: 350px;
  height: 30px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding: 0 5px;
  outline: none;
`;

const UnivListContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  width: 350px;
  height: 200px;
  margin-top: 10px;
  overflow-y: auto;
`;

const UnivBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  font-size: 12px;
  height: 25px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.light};
  }
  &.isSelected {
    background-color: ${({ theme }) => theme.colors.lightgray};
  }
`;

const SelectUnivBtn = styled.button`
  margin-top: 15px;
  background-color: transparent;
  border: none;
  padding: 5px;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 700;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`;

const SearchUnivModal = ({
  isOpen,
  setIsOpen,
  setUserUniv,
  getCategory,
  filter,
}) => {
  const [searchword, setSearchword] = useState('');
  const [univlist, setUnivlist] = useState([]);
  const [selectedUniv, setSelectedUniv] = useState(null);
  //학교이름 + (캠퍼스 이름) 으로 구분함 ex. 숭실대학교 (본교)

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeSearchInput = (e) => {
    setSearchword(e.target.value);
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      SearchSchool(searchword, setUnivlist);
    }
  };

  const handleClickUniv = (univName) => {
    setSelectedUniv(univName);
  };

  const handleClickSelectBtn = () => {
    setUserUniv(selectedUniv);
    setIsOpen(!isOpen);
    if (filter === '학교') {
      getCategory(selectedUniv);
    }
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
            <UnivSearchbarContainer>
              <UnivSearchbarInput
                value={searchword}
                onChange={handleChangeSearchInput}
                onKeyPress={handleOnKeyPressEnter}
              />
              <FiSearch />
            </UnivSearchbarContainer>
            <UnivListContainer>
              {univlist?.map((el, idx) => {
                return (
                  <UnivBox
                    key={idx}
                    onClick={() => {
                      handleClickUniv(`${el.schoolName} (${el.campusName})`);
                    }}
                    className={
                      selectedUniv === `${el.schoolName} (${el.campusName})`
                        ? 'isSelected'
                        : null
                    }
                  >
                    {`${el.schoolName} (${el.campusName})`}
                  </UnivBox>
                );
              })}
            </UnivListContainer>
            <SelectUnivBtn onClick={handleClickSelectBtn}>
              선택 완료
            </SelectUnivBtn>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default SearchUnivModal;
