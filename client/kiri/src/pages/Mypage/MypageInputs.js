import styled from 'styled-components';
import { useState } from 'react';
import MypageInput from './MypageInput';
import Withdraw from './Withdraw';

const MypageInputsContainer = styled.div``;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const EditInfoBtn = styled.button`
  width: 120px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    background-color: #44cf95;
    transform: translateY(-3px);
    transition: all 0.3s;
  }
`;

const MypageInputs = () => {
  const [userInfo, setUserInfo] = useState({
    nickName: '김뀨뀨',
    email: 'abcd@email.com',
    password: '1234',
    interest: 'IT',
  });

  const handleClickEditInfoBtn = () => {
    console.log('수정', userInfo);
  };

  return (
    <MypageInputsContainer>
      <MypageInput
        type={'nickName'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <MypageInput
        type={'email'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <MypageInput
        type={'password'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <MypageInput
        type={'interest'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Withdraw />
      <BtnWrapper>
        <EditInfoBtn onClick={handleClickEditInfoBtn}>수정하기</EditInfoBtn>
      </BtnWrapper>
    </MypageInputsContainer>
  );
};

export default MypageInputs;
