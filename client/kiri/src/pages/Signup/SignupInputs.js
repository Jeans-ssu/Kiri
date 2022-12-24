import { useState } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';

const SignupInputsContainer = styled.div`
  margin-top: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const InputHeader = styled.div`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  svg {
    margin-left: 5px;
    visibility: hidden;
    fill: ${({ theme }) => theme.colors.mainColor};
  }
  svg.validate {
    visibility: visible;
  }
`;

export const SignupInput = styled.input`
  box-sizing: border-box;
  width: 400px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.dark};
  background-color: transparent !important;
  &:focus,
  &.validate {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const SelectInput = styled.select`
  width: 400px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

export const SubmitBtn = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 40px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainColor};
  margin-top: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.light};
  font-size: 15px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
    background-color: #44cf95;
    transform: translateY(-3px);
    transition: all 0.3s;
  }
`;

const InitialState = {
  nickName: '',
  email: '',
  password: '',
  Vpassword: '',
};

export const checkEmail = (email) => {
  var check =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return check.test(email);
};

const SignupInputs = () => {
  const [userInput, setUserInput] = useState(InitialState); //닉네임, 이메일, 비밀번호 input
  const { nickName, email, password, Vpassword } = userInput;
  const [interest, setInterest] = useState('None'); //관심분야 select

  const [validation, setValidation] = useState({
    nickName: false,
    email: false,
    password: false,
  }); //닉네임, 이메일, 비밀번호 유효성

  //TODO: 닉네임 조건 유효성 검사
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    if (name === 'nickName') {
      if (value.length > 0 && value.length < 10) {
        setValidation({
          ...validation,
          nickName: true,
        });
      } else {
        setValidation({
          ...validation,
          nickName: false,
        });
      }
    }
    if (name === 'email') {
      if (!checkEmail(value)) {
        setValidation({
          ...validation,
          email: false,
        });
      } else {
        setValidation({
          ...validation,
          email: true,
        });
      }
    }
    if (name === 'Vpassword') {
      if (userInput.password !== value) {
        setValidation({
          ...validation,
          password: false,
        });
      } else {
        setValidation({
          ...validation,
          password: true,
        });
      }
    }
  };

  const handleChangeInterest = (e) => {
    setInterest(e.target.value);
  };

  const handleClickSubmitBtn = () => {
    if (!Object.values(validation).includes(false)) {
      console.log('회원가입!', {
        ...userInput,
        interest,
      });
    }
  };

  return (
    <>
      <SignupInputsContainer>
        <InputContainer>
          <InputHeader>
            닉네임
            <BsCheck className={validation.nickName ? 'validate' : null} />
          </InputHeader>
          <SignupInput
            name="nickName"
            type="text"
            value={nickName}
            onChange={handleChangeInput}
            className={validation.nickName ? 'validate' : null}
          />
        </InputContainer>
        <InputContainer>
          <InputHeader>
            이메일
            <BsCheck className={validation.email ? 'validate' : null} />
          </InputHeader>
          <SignupInput
            name="email"
            value={email}
            placeholder="abcd@gmail.com"
            onChange={handleChangeInput}
            className={validation.email ? 'validate' : null}
          />
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호
            <BsCheck className={validation.password ? 'validate' : null} />
          </InputHeader>
          <SignupInput
            name="password"
            type="password"
            value={password}
            onChange={handleChangeInput}
            className={validation.password ? 'validate' : null}
          />
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호 확인
            <BsCheck className={validation.password ? 'validate' : null} />
          </InputHeader>
          <SignupInput
            name="Vpassword"
            type="password"
            value={Vpassword}
            onChange={handleChangeInput}
            className={validation.password ? 'validate' : null}
          />
        </InputContainer>
        <InputHeader>관심분야</InputHeader>
        <SelectInput onChange={handleChangeInterest} valus={interest}>
          <option value="None">선택안함</option>
          <option value="IT">IT</option>
          <option value="Business">경영/경제</option>
          <option value="Science">자연과학</option>
          <option value="Marketing">마케팅/홍보</option>
          <option value="Humanities">인문사회</option>
          <option value="Art">예술</option>
          <option value="Engineering">공학</option>
        </SelectInput>
      </SignupInputsContainer>
      <SubmitBtn onClick={handleClickSubmitBtn}>회원가입</SubmitBtn>
    </>
  );
};

export default SignupInputs;
