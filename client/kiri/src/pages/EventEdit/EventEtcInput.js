import styled from 'styled-components';
import { useEffect } from 'react';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';

const EventEtcInput = ({ link, setLink }) => {
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const url = document.location.href;
  let postID;
  if (url.slice(-7, -6) === '/') {
    // 10 미만
    postID = url.slice(-6, -5);
  } else {
    postID = url.slice(-7, -5);
  }

  useEffect(() => {
    BasePost();
  }, []);

  const BasePost = async () => {
    await axios.get(`/posts/read/${postID}`).then((res) => {
      setLink(res.data.link);
    });
  };

  const handleChangeInput = (e) => {
    setLink(e.target.value);
  };

  return (
    <EventEtcInputContainer>
      <EtcContainer>
        <EtcHeader>참고링크</EtcHeader>
        <LinkInput type="url" value={link || ''} onChange={handleChangeInput} />
      </EtcContainer>
    </EventEtcInputContainer>
  );
};

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin: 15px auto;
    width: 90%;
  }
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 5px;
    font-size: 13px;
    font-weight: 600;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      cursor: pointer;
    }
  }
`;
const EtcHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 18px;
    margin-left: 3px;
  }
`;
const LinkInput = styled.input`
  width: 350px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  outline: none;
  @media screen and (max-width: 767px) {
    width: 65vw;
  }
`;

export default EventEtcInput;
