import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  InputContainer,
  InputHeader,
  SignupInput as SigninInput,
  checkEmail,
  SubmitBtn,
} from 'pages/Signup/SignupInputs';
import { BsCheck, BsArrowRightShort } from 'react-icons/bs';

const SigninInputsContainer = styled.div`
  margin-top: 30px;
`;

const SigninBtn = styled(SubmitBtn)``;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MoveToSignupBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.darkgray};
  display: flex;
  align-items: center;
  padding: 0;
  span {
    padding-top: 2px;
  }
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const InitialState = {
  email: '',
  password: '',
};

//TODO: password 유효성 검사 수정
const SigninInputs = () => {
  const [userInput, setUserInput] = useState(InitialState);
  const { email, password } = userInput;
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
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
    if (name === 'password') {
      if (value.length > 2) {
        setValidation({
          ...validation,
          password: true,
        });
      } else {
        setValidation({
          ...validation,
          password: false,
        });
      }
    }
  };

  const handleClickSigninBtn = () => {
    if (!Object.values(validation).includes(false)) {
      console.log('로그인!', {
        ...userInput,
      });
    }
  };

  const handleClickMoveToSignupBtn = () => {
    navigate('/signup');
  };

  return (
    <>
      <SigninInputsContainer>
        <InputContainer>
          <InputHeader>
            이메일
            <BsCheck className={validation.email ? 'validate' : null} />
          </InputHeader>
          <SigninInput
            name="email"
            type="text"
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
          <SigninInput
            name="password"
            type="password"
            value={password}
            onChange={handleChangeInput}
            className={validation.password ? 'validate' : null}
          />
        </InputContainer>
        <BtnContainer>
          <MoveToSignupBtn onClick={handleClickMoveToSignupBtn}>
            <span>회원가입하러 가기</span>
            <BsArrowRightShort size="18" />
          </MoveToSignupBtn>
        </BtnContainer>
      </SigninInputsContainer>
      <SigninBtn onClick={handleClickSigninBtn}>로그인</SigninBtn>
    </>
  );
};

export default SigninInputs;
