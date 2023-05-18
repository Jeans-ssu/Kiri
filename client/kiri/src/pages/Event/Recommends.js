import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import eventColorMatcher from 'util/eventColorMatcher';

export const Recommends = ({ recommended }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(recommended);
  }, []);

  const handleClickEventContainer = (eventId) => {
    navigate(`/event/${eventId}`);
    window.location.reload();
  };

  //TODO: 이미지 src 추가
  return (
    <>
      {events?.length === 0 ? null : (
        <>
          <RecommendsHeader>이런 이벤트는 어때요?</RecommendsHeader>
          <RecommendsContainer>
            {events?.map((el) => {
              return (
                <EventContainer
                  key={el.post_id}
                  onClick={() => {
                    handleClickEventContainer(el.post_id);
                  }}
                >
                  <ImgContainer>
                    <img src={''} alt="이벤트 포스터" />
                  </ImgContainer>
                  <EtcInfo>
                    <EventTag
                      style={{ backgroundColor: eventColorMatcher(el.event) }}
                    >
                      {el.event}
                    </EventTag>
                    <School>{el.school}</School>
                  </EtcInfo>
                  <Title>{el.title}</Title>
                </EventContainer>
              );
            })}
          </RecommendsContainer>
        </>
      )}
    </>
  );
};

const RecommendsHeader = styled.div`
  margin: 25px 0 10px;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
`;

const RecommendsContainer = styled.div`
  width: 100%;
  display: flex;
`;

const EventContainer = styled.div`
  width: 20%;
  padding: 12px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  img {
    width: 100%;
    //object-fit: cover;
  }
`;

const Title = styled.div`
  font-size: 14px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const EtcInfo = styled.div`
  margin-bottom: 10px;
`;

const EventTag = styled.span`
  font-size: 12px;
  padding: 4px 7px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  margin-right: 5px;
`;

const School = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;
