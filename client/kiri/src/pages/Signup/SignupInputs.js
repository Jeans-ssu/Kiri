//import { useState } from 'react';
import styled from 'styled-components';

const SignupInputsContainer = styled.div`
  margin-top: 50px;
`;

// const InitialState = {
//   nickName: '',
//   email: '',
//   password: '',
//   Vpassword: '',
// };

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputHeader = styled.div`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
  margin-bottom: 10px;
`;

const SignupInput = styled.input`
  width: 400px;
  height: 35px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding: 0 10px;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const SignupInputs = () => {
  //const [userInput, setUserInput] = useState(InitialState);

  return (
    <SignupInputsContainer>
      <InputContainer>
        <InputHeader>닉네임</InputHeader>
        <SignupInput type="text" />
      </InputContainer>
      <InputContainer>
        <InputHeader>이메일</InputHeader>
        <SignupInput type="text" placeholder="abcd@gmail.com" />
      </InputContainer>
      <InputContainer>
        <InputHeader>비밀번호</InputHeader>
        <SignupInput type="password" />
      </InputContainer>
      <InputContainer>
        <InputHeader>비밀번호 확인</InputHeader>
        <SignupInput type="password" />
      </InputContainer>
    </SignupInputsContainer>
  );
};

export default SignupInputs;
