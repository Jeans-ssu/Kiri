import styled from 'styled-components';
import { useNavigate } from 'react-router';

const UserInfo = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    <UserInfoConatiner>
      <ProfileCircleContainer>
        <img
          src={process.env.PUBLIC_URL + '/img/profile_circle_green.svg'}
          alt="profile_circle"
        />
      </ProfileCircleContainer>
      <InfoConatiner>
        <div className="section one">
          <span className="nickname">{userInfo.username}</span>
          <button
            className="edit"
            onClick={() => {
              navigate('/mypage/edit');
            }}
          >
            개인정보수정
          </button>
        </div>
        <div className="section">
          <span className="email">{userInfo.email}</span>
        </div>
      </InfoConatiner>
    </UserInfoConatiner>
  );
};

const UserInfoConatiner = styled.div`
  width: 600px;
  height: 80px;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 5px;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 360px;
  }
`;

const ProfileCircleContainer = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 45px;
  }
`;

const InfoConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div.section {
    height: 30%;
    padding-right: 10px;
    display: flex;
    align-items: center;
    &.one {
      justify-content: space-between;
      align-items: center;
    }
  }
  span.nickname {
    font-weight: 600;
  }
  span.email {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.dark};
  }
  button.edit {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 11px;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default UserInfo;
