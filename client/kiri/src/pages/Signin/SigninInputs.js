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
import { AiFillEye } from 'react-icons/ai';
import { ViewPasswordBtn } from 'pages/Mypage/MypageInput';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from 'store/modules/authSlice';
import { SET_USER } from 'store/modules/userSlice';
import { SigninFailModal } from 'components/SignupinModal';

const SigninInputs = () => {
  const [userInput, setUserInput] = useState(InitialState);
  const { email, password } = userInput;
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  const [isViewMode, setIsViewMode] = useState(false); //비밀번호 보기 모드

  //로그인 실패 모달
  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkPassword = /^[a-zA-Z0-9]{8,16}$/;

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
  };

  //로그인 api 호출
  const handleClickSigninBtn = () => {
    if (!Object.values(validation).includes(false)) {
      axios
        .post('/login', {
          ...userInput,
        })
        .then((res) => {
          //로그인 성공
          //axios 헤더에 Access Token 추가
          axios.defaults.headers.common['Authorization'] =
            res.headers.get('Authorization');
          //redux에 Access Token 저장
          dispatch(SET_TOKEN(res.headers.get('Authorization')));
          //redux에 유저 정보 저장
          dispatch(
            SET_USER({
              nickName: res.data.username,
              email: res.data.email,
              region: res.data.local,
              univ: res.data.school,
              status: res.data.department,
              memberId: res.data.id,
            })
          );
          //메인페이지로 이동
          navigate('/');
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setErrMsg('이메일 또는 비밀번호가 틀렸습니다.');
          } else {
            setErrMsg('로그인에 실패했습니다 :(');
          }
          setIsOpen(true);
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
            <BsCheck
              id="check"
              className={validation.email ? 'validate' : null}
            />
          </InputHeader>
          <SigninInput
            name="email"
            type="text"
            value={email}
            placeholder="helloword@email.com"
            onChange={handleChangeInput}
            className={validation.email ? 'validate' : null}
          />
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호
            <BsCheck
              id="check"
              className={validation.password ? 'validate' : null}
            />
          </InputHeader>
          <label htmlFor="signininput">
            <SigninInput
              name="password"
              type={isViewMode ? 'text' : 'password'}
              value={password}
              onChange={handleChangeInput}
              className={validation.password ? 'validate' : null}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleClickSigninBtn();
                }
              }}
            />
            <ViewPasswordBtn_
              onClick={() => {
                setIsViewMode(!isViewMode);
              }}
            >
              <AiFillEye />
            </ViewPasswordBtn_>
          </label>
        </InputContainer>
        <BtnContainer>
          <MoveToSignupBtn onClick={handleClickMoveToSignupBtn}>
            <span>회원가입하러 가기</span>
            <BsArrowRightShort size="18" />
          </MoveToSignupBtn>
        </BtnContainer>
      </SigninInputsContainer>
      <SigninBtn onClick={handleClickSigninBtn}>로그인</SigninBtn>
      <SigninFailModal isOpen={isOpen} setIsOpen={setIsOpen} message={errMsg} />
    </>
  );
};

const SigninInputsContainer = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 767px) {
  }
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

const ViewPasswordBtn_ = styled(ViewPasswordBtn)`
  position: absolute;
  right: 0;
`;

const InitialState = {
  email: '',
  password: '',
};

export default SigninInputs;
