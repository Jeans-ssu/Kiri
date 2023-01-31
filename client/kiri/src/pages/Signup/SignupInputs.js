import { useState } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { ViewPasswordBtn } from 'pages/Mypage/MypageInput';

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
  position: relative;
  svg#check {
    margin-left: 5px;
    visibility: hidden;
    fill: ${({ theme }) => theme.colors.mainColor};
  }
  svg#check.validate {
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

const InputMsg = styled.div`
  padding-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.red};
  display: none;
  &.show {
    display: block;
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
  margin-top: 50px;
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

const ViewPasswordBtn_ = styled(ViewPasswordBtn)`
  position: absolute;
  right: 0;
`;

const ValidationMsg = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 5px;
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

const checkExistEmail = (email) => {
  //TODO: axios 요청으로 변경
  //임시 - 랜덤으로 return
  if (email.length % 2 === 0) return true;
  else return false;
};

const SignupInputs = () => {
  const [userInput, setUserInput] = useState(InitialState); //닉네임, 이메일, 비밀번호 input
  const { nickName, email, password, Vpassword } = userInput;
  const [interest, setInterest] = useState('IT'); //관심분야 select
  const [existEmail, setExistEmail] = useState(false); //이미 존재하는 이메일인지 확인
  const [isViewMode, setIsViewMode] = useState(false); //비밀번호 보기 모드
  const [isViewMode_, setIsViewMode_] = useState(false); //비밀번호 확인 보기 모드

  const [validation, setValidation] = useState({
    nickName: false,
    email: false,
    password: false,
    Vpassword: false,
  }); //닉네임, 이메일, 비밀번호 유효성

  const checkNickName = /^[가-힣a-zA-Z]{2,10}$/; //한글,영문,숫자 2-10글자
  const checkPassword = /^[a-zA-Z0-9]{8,16}$/; //영문,숫자 8-16글자

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
    if (name === 'nickName') {
      if (checkNickName.test(value)) {
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
        //이메일 형식이 올바른 경우 -> 이메일 중복 검사
        if (checkExistEmail(value)) {
          //이미 존재하는 경우
          setExistEmail(true);
          setValidation({
            ...validation,
            email: false,
          });
        } else {
          //사용가능한 경우
          setExistEmail(false);
          setValidation({
            ...validation,
            email: true,
          });
        }
      }
    }
    if (name === 'password') {
      if (checkPassword.test(value)) {
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
    if (name === 'Vpassword') {
      if (userInput.password !== value) {
        setValidation({
          ...validation,
          Vpassword: false,
        });
      } else {
        setValidation({
          ...validation,
          Vpassword: true,
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
            <BsCheck
              id="check"
              className={validation.nickName ? 'validate' : null}
            />
          </InputHeader>
          <SignupInput
            name="nickName"
            type="text"
            value={nickName}
            onChange={handleChangeInput}
            className={validation.nickName ? 'validate' : null}
          />
          <ValidationMsg>한글,영문 2-10글자</ValidationMsg>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            이메일
            <BsCheck
              id="check"
              className={validation.email ? 'validate' : null}
            />
          </InputHeader>
          <SignupInput
            name="email"
            value={email}
            placeholder="abcd@gmail.com"
            onChange={handleChangeInput}
            className={validation.email ? 'validate' : null}
          />
          <InputMsg className={existEmail ? 'show' : null}>
            이미 존재하는 이메일입니다.
          </InputMsg>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호
            <BsCheck
              id="check"
              className={validation.password ? 'validate' : null}
            />
            <ViewPasswordBtn_
              onClick={() => {
                setIsViewMode(!isViewMode);
              }}
            >
              <AiFillEye />
            </ViewPasswordBtn_>
          </InputHeader>
          <SignupInput
            name="password"
            type={isViewMode ? 'text' : 'password'}
            value={password}
            onChange={handleChangeInput}
            className={validation.password ? 'validate' : null}
          />
          <ValidationMsg>영문,숫자 8-16글자</ValidationMsg>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호 확인
            <BsCheck
              id="check"
              className={validation.Vpassword ? 'validate' : null}
            />
            <ViewPasswordBtn_
              onClick={() => {
                setIsViewMode_(!isViewMode_);
              }}
            >
              <AiFillEye />
            </ViewPasswordBtn_>
          </InputHeader>
          <SignupInput
            name="Vpassword"
            type={isViewMode_ ? 'text' : 'password'}
            value={Vpassword}
            onChange={handleChangeInput}
            className={validation.password ? 'validate' : null}
          />
        </InputContainer>
        <InputHeader>관심분야</InputHeader>
        <SelectInput onChange={handleChangeInterest} value={interest}>
          <option value="IT">IT</option>
          <option value="Business">경영/경제</option>
          <option value="Science">자연과학</option>
          <option value="Marketing">마케팅/홍보</option>
          <option value="Humanities">인문사회</option>
          <option value="Art">예술</option>
          <option value="Engineering">공학</option>
          <option value="Etc">기타</option>
        </SelectInput>
      </SignupInputsContainer>
      <SubmitBtn onClick={handleClickSubmitBtn}>회원가입</SubmitBtn>
    </>
  );
};

export default SignupInputs;
