import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import { MypageHeader as UserpageHeader } from 'pages/Mypage/Mypage';
import UserInfo from 'pages/User/UserInfo';
import MyEvents from './MyEvents';
import axios from '../../api/axios';
import { setAuthHeader } from 'api/setAuthHeader';
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
  const [userEvents, setUserEvents] = useState([]);

  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  useEffect(() => {
    axios
      .get('/member')
      .then((res) => {
        setUserInfo({ ...res.data });
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
    axios
      .get('/api/posts/mypost')
      .then((res) => {
        setUserEvents([...res.data]);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, []);

  return (
    <PageContainer header footer={false} margin_bottom={false}>
      <UserPageContainer>
        <UserpageHeader>마이페이지</UserpageHeader>
        <UserInfo userInfo={userInfo} />
        <MyEvents userEvents={userEvents} />
      </UserPageContainer>
    </PageContainer>
  );
};

export default UserPage;
