import styled from 'styled-components';
import { useState } from 'react';
import MypageInput from './MypageInput';
import Withdraw from './Withdraw';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'store/modules/userSlice';
import { selectAccessToken } from 'store/modules/authSlice';
import axios from '../../api/axios';

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
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
    background-color: #44cf95;
    transform: translateY(-3px);
    transition: all 0.3s;
  }
`;

const MypageInputs = () => {
  const userInfo_ = useSelector(selectUserInfo);
  const accessToken = useSelector(selectAccessToken);

  //TODO: 비밀번호 수정기능 추가
  const [userInfo, setUserInfo] = useState({
    nickName: userInfo_.nickName,
    email: userInfo_.email,
    password: 'password1234',
    interest: userInfo_.interest,
    status: '학생',
    univ: '뫄뫄대학교',
  });

  const handleClickEditInfoBtn = () => {
    console.log('수정', userInfo);
    axios.defaults.headers.common['Authorization'] = accessToken;
    axios
      .post('/member', {
        username: userInfo.nickName,
        email: userInfo.email,
        password: userInfo.password,
        interest: userInfo.interest,
      })
      .then((res) => {
        //TODO: 닉네임 필요, redux에 회원정보 수정
        console.log(res.data);
      })
      .catch((err) => console.error(err));
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
        type={'region'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <MypageInput
        type={'status'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <MypageInput
        type={'univ'}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Withdraw />
      <BtnWrapper>
        <EditInfoBtn onClick={handleClickEditInfoBtn}>저장하기</EditInfoBtn>
      </BtnWrapper>
    </MypageInputsContainer>
  );
};

export default MypageInputs;
