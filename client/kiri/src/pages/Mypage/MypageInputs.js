import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { MypageInput, PasswordInput } from './MypageInput';
import Withdraw from './Withdraw';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { selectAccessToken } from 'store/modules/authSlice';
import axios from '../../api/axios';
import { setAuthHeader } from 'api/setAuthHeader';

const MypageInputs = () => {
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    nickName: '',
    email: '',
    status: '',
    univ: '',
    region: '',
  });
  const [newPassword, setNewPassword] = useState(location.state?.password);

  useEffect(() => {
    getUserInfo();
    setNewPassword(location.state?.password);
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get('/member');
      const data = response.data;
      setUserInfo({
        ...userInfo,
        nickName: data.username,
        email: data.email,
        region: data.local,
        univ: data.school,
        status: data.department,
      });
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const handleClickEditInfoBtn = () => {
    axios
      .post('/member', {
        username: userInfo.nickName,
        email: userInfo.email,
        check_password: newPassword !== undefined ? true : false,
        password: newPassword !== undefined ? newPassword : null,
        local: userInfo.region,
        school: userInfo.univ,
        department: userInfo.status,
      })
      .then(() => {
        window.location.reload();
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
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 35px;
    font-size: 14px;
  }
`;

export default MypageInputs;
