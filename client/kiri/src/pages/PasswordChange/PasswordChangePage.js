import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import { MypageHeader } from 'pages/Mypage/Mypage';
import { checkIsValid } from 'pages/Mypage/MypageInput';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BsCheck } from 'react-icons/bs';
import axios from '../../api/axios';
import { selectAccessToken } from 'store/modules/authSlice';
import { useSelector } from 'react-redux';
import { setAuthHeader } from 'api/setAuthHeader';

const PasswordChangePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageHeader = styled(MypageHeader)`
  margin-bottom: 40px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) =>
    props.margin_bottom ? props.margin_bottom : '15px'};
  div#passwordmsg {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.red};
    margin-top: 3px;
  }
  div.hide {
    visibility: hidden;
  }
`;

const InputHeader = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkgray};
  font-weight: 700;
  margin-bottom: 5px;
  position: relative;
  svg {
    margin-left: 3px;
    color: ${({ theme }) => theme.colors.mainColor};
  }
  svg.non-valid {
    visibility: hidden;
  }
  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 400;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const PasswordInput = styled.input`
  width: 350px;
  height: 25px;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  outline: none;
  padding: 5px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
  font-size: 16px;
`;

const SaveChangeBtn = styled.button`
  margin-top: 15px;
  width: 100px;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.green_2};
  border: none;
  border-radius: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  &:hover {
    cursor: pointer;
  }
`;

const InitialValue = {
  currentPW: '', //현재 비밀번호
  newPW: '', //새 비밀번호
  checkNewPW: '', //새 비밀번호 확인
};

const ValidInitialValue = {
  currentPW: false,
  newPW: false,
  checkNewPW: false,
};

const PasswordChangePage = () => {
  const [passwords, setPasswords] = useState(InitialValue);
  const [isValid, setIsValid] = useState(ValidInitialValue); //유효성 여부 확인
  const [isSame, setIsSame] = useState(true); //사용자 비밀번호와 현재 비밀번호 일치 여부
  const [isCorrect, setIsCorrect] = useState(false); //새 비밀번호와 새 비밀번호 확인 일치 여부

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const navigate = useNavigate();

  const checkExistingPassword = async (currentPW) => {
    try {
      const response = await axios.post('/auth/password/exist', {
        password: currentPW,
      });
      const check = response.data;
      if (check) setIsCorrect(true);
      else setIsCorrect(false);
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  const handleChangeInput = async (event, type) => {
    setPasswords({
      ...passwords,
      [type]: event.target.value,
    });
    //유효성 검사
    setIsValid({
      ...isValid,
      [type]: checkIsValid('password', event.target.value),
    });
    //사용자 비밀번호와 현재 비밀번호 일치 검사
    if (type === 'currentPW') checkExistingPassword(event.target.value);
    //새 비밀번호와 새 비밀번호 확인 일치 검사
    if (type === 'checkNewPW') {
      if (passwords.newPW !== event.target.value) setIsSame(false);
      else setIsSame(true);
    }
  };

  const handleClickSaveBtn = () => {
    //다시 마이페이지로 이동
    if (isSame && isCorrect && !Object.values(isValid).includes(false)) {
      navigate('/mypage/edit', { state: { password: passwords.newPW } });
    }
  };

  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <PasswordChangePageContainer>
        <PageHeader>비밀번호 변경</PageHeader>
        <InputContainer margin_bottom="40px">
          <InputHeader>
            현재 비밀번호
            <BsCheck className={isValid.currentPW ? null : 'non-valid'} />
          </InputHeader>
          <PasswordInput
            type="password"
            value={passwords.currentPW}
            onChange={(e) => handleChangeInput(e, 'currentPW')}
          />
          <div id="passwordmsg" className={isCorrect ? 'hide' : null}>
            비밀번호가 틀렸습니다.
          </div>
        </InputContainer>
        <InputContainer>
          <InputHeader>
            새 비밀번호
            <BsCheck className={isValid.newPW ? null : 'non-valid'} />
            <span>영문,숫자 2-10글자</span>
          </InputHeader>
          <PasswordInput
            type="password"
            value={passwords.newPW}
            onChange={(e) => handleChangeInput(e, 'newPW')}
          />
        </InputContainer>
        <InputContainer>
          <InputHeader>
            새 비밀번호 확인
            <BsCheck className={isValid.checkNewPW ? null : 'non-valid'} />
          </InputHeader>
          <PasswordInput
            type="password"
            value={passwords.checkNewPW}
            onChange={(e) => handleChangeInput(e, 'checkNewPW')}
          />
          <div id="passwordmsg" className={isSame ? 'hide' : null}>
            비밀번호가 일치하지 않습니다.
          </div>
        </InputContainer>
        <SaveChangeBtn onClick={handleClickSaveBtn}>변경하기</SaveChangeBtn>
      </PasswordChangePageContainer>
    </PageContainer>
  );
};

export default PasswordChangePage;
