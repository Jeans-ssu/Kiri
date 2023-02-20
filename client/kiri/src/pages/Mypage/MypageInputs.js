import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { MypageInput, PasswordInput } from './MypageInput';
import Withdraw from './Withdraw';
import { useSelector } from 'react-redux';
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
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    getUserInfo();
  }, []);

  const [userInfo, setUserInfo] = useState({
    nickName: '',
    email: '',
    interest: '',
    status: '',
    univ: '',
    password: '',
  });

  const getUserInfo = async () => {
    axios.defaults.headers.common['Authorization'] = accessToken;
    try {
      const response = await axios.get('/member');
      const data = response.data;
      setUserInfo({
        nickName: data.username,
        email: data.email,
        region: data.local,
        univ: data.school,
        status: data.department,
        password: '',
      });
      console.log(data);
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

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
      <PasswordInput
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
