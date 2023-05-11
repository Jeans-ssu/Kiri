import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectIsLogin } from 'store/modules/userSlice';

export const MobileLikedEvents = ({ eventCnt }) => {
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {}, []);

  return (
    <MobileLikedEventsContainer className={isLogin ? null : 'hide'}>
      <div>{eventCnt}</div>
    </MobileLikedEventsContainer>
  );
};

const MobileLikedEventsContainer = styled.div`
  display: none;
  &.hide {
    display: none;
  }
  @media screen and (max-width: 767px) {
    text-align: center;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    div {
      font-size: 11px;
      border: 1px solid ${({ theme }) => theme.colors.lightgray};
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
    }
  }
`;
