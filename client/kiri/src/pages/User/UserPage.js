import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import { MypageHeader as UserpageHeader } from 'pages/Mypage/Mypage';
import UserInfo from 'pages/User/UserInfo';
import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({});

  const accessToken = useSelector(selectAccessToken);
  axios.defaults.headers.common['Authorization'] = accessToken;

  useEffect(() => {
    axios
      .get('/member')
      .then((res) => {
        setUserInfo({ ...res.data });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, [userInfo]);

  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <UserPageContainer>
        <UserpageHeader>마이페이지</UserpageHeader>
        <UserInfo userInfo={userInfo} />
      </UserPageContainer>
    </PageContainer>
  );
};

export default UserPage;
