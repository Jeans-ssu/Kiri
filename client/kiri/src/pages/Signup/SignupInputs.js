import { useState } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { ViewPasswordBtn } from 'pages/Mypage/MypageInput';
import axios from '../../api/axios';
import { SignupSuccessModal, SignupFailModal } from 'components/SignupinModal';
import SearchUnivModal from 'components/SearchUnivModal';
import { Regions } from 'util/info';

const SignupInputs = () => {
  const [userInput, setUserInput] = useState(InitialState); //닉네임, 이메일, 비밀번호, 소속, 지역
  const { nickName, email, password, Vpassword } = userInput;
  const [existEmail, setExistEmail] = useState(false); //이미 존재하는 이메일인지 확인
  const [isViewMode, setIsViewMode] = useState(false); //비밀번호 보기 모드
  const [isViewMode_, setIsViewMode_] = useState(false); //비밀번호 확인 보기 모드

  const [isSelectUniv, setIsSelectUniv] = useState(false); //학교 선택 여부

  //회원가입 후 성공/실패 모달
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  //학교 검색 모달
  const [showUnivModal, setShowUnivModal] = useState(false);

  const [validation, setValidation] = useState(ValidationInitialState); //닉네임, 이메일, 비밀번호 유효성

  //유효성 조건
  const checkNickName = /^[가-힣a-zA-Z]{2,10}$/; //한글,영문,숫자 2-10글자
  const checkPassword = /^[a-zA-Z0-9]{8,16}$/; //영문,숫자 8-16글자

  //이메일 중복여부 확인
  const checkExistEmail = async (email) => {
    try {
      const response = await axios.post(`/auth/${email}/exist`);
      const check = response.data;
      setExistEmail(check);
      setValidation({
        ...validation,
        email: !check,
      });
    } catch (error) {
      setExistEmail(false);
      setValidation({
        ...validation,
        email: true,
      });
      console.error('ERROR:', error);
    }
  };

  //닉네임, 이메일, 비밀번호
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
        checkExistEmail(value);
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

  //소속
  const handleChangeStatus = (e) => {
    setUserInput({ ...userInput, status: e.target.value });
  };

  //지역
  const handleChangeRegion = (e) => {
    setUserInput({ ...userInput, region: e.target.value });
  };

  //학교 설정 여부
  const handleChangeIsSelectUniv = () => {
    setIsSelectUniv(!isSelectUniv);
    if (!isSelectUniv) {
      setUserInput({ ...userInput, univ: '선택안함' });
    } else {
      setUserInput({ ...userInput, univ: '' });
    }
  };

  //학교 검색
  const handleClickSearchUnivBtn = () => {
    setShowUnivModal(true);
  };

  //학교 설정
  const setUserUniv = (univName) => {
    setUserInput({ ...userInput, univ: univName });
  };

  const handleClickSubmitBtn = () => {
    if (!Object.values(validation).includes(false)) {
      axios
        .post('/auth/signup', {
          username: userInput.nickName,
          email: userInput.email,
          password: userInput.password,
          passwordVal: userInput.Vpassword,
          local: userInput.region,
          school: userInput.univ,
          department: userInput.status,
        })
        .then(() => {
          setUserInput(InitialState);
          setValidation(ValidationInitialState);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.error(error);
          setUserInput(InitialState);
          setValidation(ValidationInitialState);
          setIsFailed(true);
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
            placeholder="helloworld@email.com"
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
          </InputHeader>
          <label htmlFor="signupinputs">
            <SignupInput
              name="password"
              type={isViewMode ? 'text' : 'password'}
              value={password}
              onChange={handleChangeInput}
              className={validation.password ? 'validate' : null}
            />
            <ViewPasswordBtn_
              onClick={() => {
                setIsViewMode(!isViewMode);
              }}
            >
              <AiFillEye />
            </ViewPasswordBtn_>
          </label>
          <ValidationMsg>영문,숫자 8-16글자</ValidationMsg>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            비밀번호 확인
            <BsCheck
              id="check"
              className={validation.Vpassword ? 'validate' : null}
            />
          </InputHeader>
          <label htmlFor="signupinputs">
            <SignupInput
              name="Vpassword"
              type={isViewMode_ ? 'text' : 'password'}
              value={Vpassword}
              onChange={handleChangeInput}
              className={validation.password ? 'validate' : null}
            />
            <ViewPasswordBtn_
              onClick={() => {
                setIsViewMode_(!isViewMode_);
              }}
            >
              <AiFillEye />
            </ViewPasswordBtn_>
          </label>
        </InputContainer>
        <InputContainer>
          <InputHeader>소속</InputHeader>
          <SelectInput onChange={handleChangeStatus} value={userInput.status}>
            <option value="대학생">대학생</option>
            <option value="중고등학생">중고등학생</option>
            <option value="일반인">일반인</option>
          </SelectInput>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            <span>학교</span>
            <label>
              선택안함
              <input
                type="checkbox"
                name="chose"
                value="선택안함"
                checked={isSelectUniv}
                onChange={handleChangeIsSelectUniv}
              />
            </label>
          </InputHeader>
          <div className="column">
            <SignupInput readOnly short value={userInput.univ} />
            <OpenSearchModalBtn
              onClick={handleClickSearchUnivBtn}
              disabled={isSelectUniv ? 'disabled' : null}
            >
              <FiSearch />
              찾아보기
            </OpenSearchModalBtn>
          </div>
        </InputContainer>
        <InputContainer>
          <InputHeader>지역</InputHeader>
          <SelectInput onChange={handleChangeRegion} value={userInput.region}>
            {Regions?.map((el, idx) => {
              return (
                <option key={idx} value={el}>
                  {el}
                </option>
              );
            })}
          </SelectInput>
        </InputContainer>
      </SignupInputsContainer>
      <SubmitBtn onClick={handleClickSubmitBtn}>회원가입</SubmitBtn>
      <SearchUnivModal
        isOpen={showUnivModal}
        setIsOpen={setShowUnivModal}
        setUserUniv={setUserUniv}
      />
      <SignupSuccessModal isOpen={isSuccess} setIsOpen={setIsSuccess} />
      <SignupFailModal isOpen={isFailed} setIsOpen={setIsFailed} />
    </>
  );
};

const SignupInputsContainer = styled.div`
  margin-top: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  div.column {
    display: flex;
  }
  &.hide {
    display: none;
  }
  label {
    position: relative;
    button {
      position: absolute;
      right: 0;
      top: 25%;
    }
  }
  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;

export const InputHeader = styled.div`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  svg#check {
    margin-left: 5px;
    visibility: hidden;
    fill: ${({ theme }) => theme.colors.mainColor};
  }
  svg#check.validate {
    visibility: visible;
  }
  label {
    display: flex;
    align-items: center;
    margin-right: 80px;
    font-size: 11px;
    @media screen and (max-width: 767px) {
      margin-right: 62px;
    }
  }
`;

export const SignupInput = styled.input`
  box-sizing: border-box;
  width: ${(props) => (props.short ? '320px' : '400px')};
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
  @media screen and (max-width: 767px) {
    width: 300px;
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
  @media screen and (max-width: 767px) {
    width: 300px;
  }
`;

const OpenSearchModalBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 80px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: ${({ theme }) => theme.colors.gray};
  }
  @media screen and (max-width: 767px) {
    font-size: 11px;
  }
`;

export const SubmitBtn = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 40px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainColor};
  margin-top: 30px;
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
  status: '대학생',
  region: '서울',
  univ: '',
};

const ValidationInitialState = {
  nickName: false,
  email: false,
  password: false,
  Vpassword: false,
};

export const checkEmail = (email) => {
  var check =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return check.test(email);
};

export default SignupInputs;
