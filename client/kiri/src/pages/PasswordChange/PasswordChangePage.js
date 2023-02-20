import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import { MypageHeader } from 'pages/Mypage/Mypage';
import { checkIsValid } from 'pages/Mypage/MypageInput';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';

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
  div.not-same {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.red};
    margin-top: 3px;
  }
`;

const InputHeader = styled.div`
  font-size: 16px;
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

const SaveChangeBtn = styled.button``;

const InitialValue = {
  currentPW: '',
  newPW: '',
  checkNewPW: '',
};

const ValidInitialValue = {
  currentPW: false,
  newPW: false,
  checkNewPW: false,
};

const PasswordChangePage = () => {
  const [passwords, setPasswords] = useState(InitialValue);
  const [isValid, setIsValid] = useState(ValidInitialValue);

  const handleChangeInput = (event, type) => {
    setPasswords({
      ...passwords,
      [type]: event.target.value,
    });
    setIsValid({
      ...isValid,
      [type]: checkIsValid('password', event.target.value),
    });
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
          <div className={`not-same`}>비밀번호가 일치하지 않습니다.</div>
        </InputContainer>
        <SaveChangeBtn>변경하기</SaveChangeBtn>
      </PasswordChangePageContainer>
    </PageContainer>
  );
};

export default PasswordChangePage;
