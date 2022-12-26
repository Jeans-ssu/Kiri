import styled from 'styled-components';
import { useState } from 'react';

const MypageInputWrapper = styled.div`
  height: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkgray};
  .type {
    font-weight: 700;
    width: 80px;
  }
  .value,
  .input {
    font-weight: 400;
    width: 400px;
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
    display: none;
  }
`;

const SaveBtn = styled.button`
  width: 37px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
  &.hide {
    display: none;
  }
`;

const EditInput = styled.input`
  width: 90%;
  height: 20px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkgray};
  &:focus {
    outline: none;
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

const interestTypes = {
  None: '선택안함',
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
  interest: '관심분야',
};

//TODO: 유효성 검사
const MypageInput = ({ type, userInfo, setUserInfo }) => {
  const [isEditmode, setIsEditmode] = useState(false);
  const [editvalue, setEditvalue] = useState(userInfo[type]);

  const handleClickEditBtn = () => {
    setIsEditmode(!isEditmode);
  };

  const handleChangeEditvalue = (e) => {
    setEditvalue(e.target.value);
  };

  const handleChangeInterestSelect = (e) => {
    setEditvalue(e.target.value);
  };

  const handleClickSaveBtn = () => {
    setUserInfo({ ...userInfo, [type]: editvalue });
    setEditvalue(editvalue);
    setIsEditmode(!isEditmode);
  };

  return (
    <MypageInputWrapper>
      <div className="type">{types[type]}</div>
      {isEditmode ? (
        <div className="input">
          {type === 'interest' ? (
            <SelectInput
              value={editvalue}
              onChange={handleChangeInterestSelect}
            >
              <option value="None">선택안함</option>
              <option value="IT">IT</option>
              <option value="Business">경영/경제</option>
              <option value="Science">자연과학</option>
              <option value="Marketing">마케팅/홍보</option>
              <option value="Humanities">인문사회</option>
              <option value="Art">예술</option>
              <option value="Engineering">공학</option>
            </SelectInput>
          ) : (
            <EditInput
              type={type === 'password' ? 'password' : 'text'}
              value={editvalue}
              onChange={handleChangeEditvalue}
            />
          )}
        </div>
      ) : type === 'password' ? (
        <div className="value">{userInfo[type].replace(/./g, '●')}</div>
      ) : (
        <div className="value">
          {type === 'interest' ? interestTypes[userInfo[type]] : userInfo[type]}
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
          onClick={handleClickEditBtn}
        >
          수정
        </EditBtn>
      )}
    </MypageInputWrapper>
  );
};

export default MypageInput;
