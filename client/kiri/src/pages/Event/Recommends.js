import styled from 'styled-components';
import { useNavigate } from 'react-router';
import eventColorMatcher from 'util/eventColorMatcher';

export const Recommends = ({ recommended }) => {
  const navigate = useNavigate();

  const handleClickEventContainer = (eventId) => {
    navigate(`/event/${eventId}`);
    window.location.reload();
  };

  return (
    <>
      <RecommendsHeader>이런 이벤트는 어때요?</RecommendsHeader>
      {recommended?.length === 0 ? null : (
        <>
          <MobileRecommendsContainer>
            {recommended?.map((el) => {
              return (
                <MobileEventContainer
                  key={el.post_id}
                  onClick={() => {
                    handleClickEventContainer(el.post_id);
                  }}
                >
                  <EventTag
                    style={{ backgroundColor: eventColorMatcher(el.event) }}
                  >
                    {el.event}
                  </EventTag>
                  <div className="school">{el.school}</div>
                  <div className="title">{el.title}</div>
                </MobileEventContainer>
              );
            })}
          </MobileRecommendsContainer>
          <RecommendsContainer>
            {recommended?.map((el) => {
              return (
                <EventContainer
                  key={el.post_id}
                  onClick={() => {
                    handleClickEventContainer(el.post_id);
                  }}
                >
                  <ImgContainer>
                    <img src={el.imgUrl} alt="이벤트 포스터" />
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const RecommendsContainer = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 767px) {
    display: none;
  }
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
  color: ${({ theme }) => theme.colors.dark};
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
  @media screen and (max-width: 767px) {
    font-size: 8px;
    font-weight: 500;
  }
`;

const School = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

//모바일 버전
const MobileRecommendsContainer = styled.div``;

const MobileEventContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;

  div.school,
  div.title {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.dark};
  }

  div.school {
    font-weight: 600;
    margin-right: 5px;
  }

  div.title {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
