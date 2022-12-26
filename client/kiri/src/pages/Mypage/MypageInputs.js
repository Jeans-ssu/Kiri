import styled from 'styled-components';
import { useState } from 'react';
import MypageInput from './MypageInput';
import Withdraw from './Withdraw';

const MypageInputsContainer = styled.div``;

const MypageInputs = () => {
  const [userInfo, setUserInfo] = useState({
    nickName: '김뀨뀨',
    email: 'abcd@email.com',
    password: '1234',
    interest: 'IT',
  });

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
    </MypageInputsContainer>
  );
};

export default MypageInputs;
