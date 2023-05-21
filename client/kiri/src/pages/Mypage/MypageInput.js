import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { Regions, Status } from 'util/info';
import SearchUnivModal from 'components/SearchUnivModal';
import { useNavigate } from 'react-router';

const interestTypes = {
  Etc: '기타',
  IT: 'IT',
  Business: '경영/경제',
  Science: '자연과학',
  Marketing: '마케팅/홍보',
  Humanities: '인문사회',
  Art: '예술',
  Engineering: '공학',
};

const types = {
  nickName: '닉네임',
  email: '이메일',
  password: '비밀번호',
  region: '지역',
  status: '소속',
  univ: '학교',
};

//유효성 검사 함수
export const checkIsValid = (type, value) => {
  const checkNickName = /^[가-힣a-zA-Z0-9]{2,10}$/;
  const checkPassword = /^[a-zA-Z0-9]{8,16}$/;

  if (type === 'nickName') {
    if (checkNickName.test(value)) return true;
    else return false;
  }
  if (type === 'password') {
    if (checkPassword.test(value)) return true;
    else return false;
  }
  return true;
};

const MypageInput = ({ type, userInfo, setUserInfo }) => {
  const [isEditmode, setIsEditmode] = useState(false);
  const [editvalue, setEditvalue] = useState(userInfo[type]);
  const [isValid, setIsValid] = useState(true); //유효한지 여부
  const [isViewMode, setIsViewMode] = useState(false); //비밀번호 보기 모드
  const [isSelectUniv, setIsSelectUniv] = useState(false); //학교 선택안함

  const [isOpen, setIsOpen] = useState(false); //학교 검색 모달

  useEffect(() => {
    setEditvalue(userInfo[type]);
  }, [userInfo]);

  const handleChangeIsSelectUniv = () => {
    setIsSelectUniv(!isSelectUniv);
    if (!isSelectUniv) {
      setUserInfo({ ...userInfo, univ: '선택안함' });
    } else {
      setIsOpen(true);
    }
  };

  const handleClickEditBtn = () => {
    setIsEditmode(!isEditmode);
  };

  const handleChangeEditvalue = (e) => {
    setEditvalue(e.target.value);
    if (checkIsValid(type, editvalue)) setIsValid(true);
    else setIsValid(false);
  };

  const handleChangeInterestSelect = (e) => {
    setEditvalue(e.target.value);
  };

  const handleClickSaveBtn = () => {
    if (isValid) {
      setUserInfo({ ...userInfo, [type]: editvalue });
    } else {
      setEditvalue(userInfo[type]);
    }
    setIsValid(true);
    setIsViewMode(false);
    setIsEditmode(!isEditmode);
  };

  const handleChangeUserUniv = (univ) => {
    if (!univ) {
      setUserInfo({ ...userInfo, univ: '선택안함' });
      setIsSelectUniv(true);
    } else {
      setUserInfo({ ...userInfo, univ: univ });
      setIsSelectUniv(false);
    }
  };

  return (
    <MypageInputWrapper>
      <div className="type">{types[type]}</div>
      {isEditmode ? (
        <div className="conatiner">
          <div className="input">
            {type === 'region' || type === 'status' ? (
              <SelectInput
                value={editvalue}
                onChange={handleChangeInterestSelect}
              >
                {type === 'region'
                  ? Regions?.map((el, idx) => {
                      return (
                        <option value={el} key={idx}>
                          {el}
                        </option>
                      );
                    })
                  : Status.map((el, idx) => {
                      return (
                        <option value={el} key={idx}>
                          {el}
                        </option>
                      );
                    })}
              </SelectInput>
            ) : (
              <EditInput
                type={
                  type === 'password' && isViewMode === false
                    ? 'password'
                    : 'text'
                }
                value={editvalue}
                onChange={handleChangeEditvalue}
                className={isValid ? null : 'notValid'}
              />
            )}
            <BsExclamationCircle className={isValid ? null : 'notValid'} />
            {type === 'password' ? (
              <ViewPasswordBtn
                onClick={() => {
                  setIsViewMode(!isViewMode);
                }}
              >
                <AiFillEye />
              </ViewPasswordBtn>
            ) : null}
          </div>
          <ValidationMsg className={type}>영문,숫자 8-16글자</ValidationMsg>
        </div>
      ) : type === 'password' ? (
        <div className="value">{userInfo[type].replace(/./g, '●')}</div>
      ) : (
        <div className="value">
          {type === 'interest' ? interestTypes[userInfo[type]] : userInfo[type]}
          {type === 'univ' ? (
            <label>
              선택안함
              <input
                type="checkbox"
                name="chose"
                checked={isSelectUniv}
                onChange={handleChangeIsSelectUniv}
              />
            </label>
          ) : null}
        </div>
      )}
      {isEditmode ? (
        <SaveBtn
          className={type === 'email' ? 'hide' : null}
          onClick={handleClickSaveBtn}
        >
          저장
        </SaveBtn>
      ) : (
        <EditBtn
          className={type === 'email' ? 'hide' : null}
          onClick={
            type === 'univ'
              ? () => {
                  setIsOpen(true);
                }
              : handleClickEditBtn
          }
        >
          수정
        </EditBtn>
      )}
      <SearchUnivModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setUserUniv={handleChangeUserUniv}
      />
    </MypageInputWrapper>
  );
};

const PasswordInput = () => {
  const navigate = useNavigate();

  const handleClickEditBtn = () => {
    navigate('/passwordchange');
  };

  return (
    <MypageInputWrapper>
      <div className="type">비밀번호</div>
      <EditBtn onClick={handleClickEditBtn}>비밀번호 변경</EditBtn>
    </MypageInputWrapper>
  );
};

const MypageInputWrapper = styled.div`
  height: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkgray};
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  .type {
    font-weight: 700;
    width: 80px;
  }
  .value {
    font-weight: 400;
    width: 400px;
    display: flex;
    position: relative;
    label {
      font-size: 12px;
      display: flex;
      align-items: center;
      position: absolute;
      right: 10px;
    }
    @media screen and (max-width: 767px) {
      width: 240px;
    }
  }
  .conatiner {
    width: 75%;
  }
  .input {
    font-weight: 400;
    display: flex;
    position: relative;
    align-items: center;
  }
  .input > svg {
    color: ${({ theme }) => theme.colors.red};
    position: absolute;
    right: 10%;
    visibility: hidden;
    &.notValid {
      visibility: visible;
    }
  }
`;

export const ViewPasswordBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.gray};
  &:hover {
    cursor: pointer;
  }
`;

const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 14px;
  font-weight: 400;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.mainColor};
  &:hover {
    cursor: pointer;
  }
  &.hide {
    visibility: hidden;
  }
`;

const SaveBtn = styled.button`
  width: 60px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #44cf95;
  }
  &.hide {
    display: none;
  }
`;

const EditInput = styled.input`
  width: 90%;
  height: 20px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkgray};
  &:focus {
    outline: none;
  }
  &.notValid {
    border-bottom: 1px solid ${({ theme }) => theme.colors.red};
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const SelectInput = styled.select`
  width: 90%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

const ValidationMsg = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 5px;
  display: none;
  &.password {
    display: block;
  }
`;

export { PasswordInput, MypageInput };
