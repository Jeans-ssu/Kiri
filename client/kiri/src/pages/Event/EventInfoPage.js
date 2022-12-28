import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { FiShare2 } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';

const EventInfoContainer = styled.div`
  padding: 0 40px 40px 40px;
`;

const EventTopdiv = styled.div``;

const EventUpdiv = styled.div`
  display: flex;
  .left {
    display: flex;
  }

  .icon {
    line-height: 40px;
  }
`;

const EventTitlediv = styled.div`
  h1 {
    margin: 0;
  }
`;

const EventSharediv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

const EventBookmarkdiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`;

const EventPerioddiv = styled.div`
  display: flex;
  font-size: 18px;
`;

const EventDdaydiv = styled.div``;

const EventWriterdiv = styled.div`
  margin-left: 15px;
`;

const EventTimediv = styled.div`
  margin-left: auto;
`;

const EventContentdiv = styled.div`
  display: flex;
  margin-top: 30px;
`;

const EventPosterdiv = styled.div`
  img {
    width: 400px;
  }
`;

const EventInfodiv = styled.div`
  margin-left: 40px;
`;

const EventInfoPage = () => {
  const [mark, setMark] = useState(false);

  const markHandler = () => {
    setMark(!mark);
  };

  return (
    <PageContainer header footer>
      <EventInfoContainer>
        <EventTopdiv>
          <EventUpdiv>
            <div className="left">
              <EventTitlediv>
                <h1>Event title</h1>
              </EventTitlediv>
              <EventSharediv>
                <FiShare2 size="27" />
              </EventSharediv>
            </div>
            <EventBookmarkdiv onClick={() => markHandler()}>
              {mark ? <BsBookmarkFill size="27" /> : <BsBookmark size="27" />}
            </EventBookmarkdiv>
          </EventUpdiv>
          <EventPerioddiv>
            <EventDdaydiv>D-??</EventDdaydiv>
            <EventWriterdiv>주최</EventWriterdiv>
            <EventTimediv>2023.02.06</EventTimediv>
          </EventPerioddiv>
        </EventTopdiv>
        <EventContentdiv>
          <EventPosterdiv>
            <img
              className="poster"
              alt="poster"
              src={`${process.env.PUBLIC_URL}/poster.jpg`}
            ></img>
          </EventPosterdiv>
          <EventInfodiv>
            <article>
              ○ 활동내용<br></br>
              -비브(ViiV)어플을 활용한 다양한 브이로그 영상 제작<br></br>
              -빙고판을 활용한 빙고 촬영 미션 수행
              <br></br>
              <br></br>○ 기간 및 일정<br></br>
              -접수 기간:12.26~01.08<br></br>
              -서포터즈 선발 발표:01.09<br></br>
              -활동 기간:2023.01.10~02.28(약 2개월)<br></br>
              -지원자 선발:50명 내외<br></br>
              <br></br>
              <br></br>○ 모집 대상<br></br>
              -대학생, 졸업생, 휴학생 등 20대 연령층부터 30대 연령층 모두 가능
              <br></br>
              -온라인 활동이 가능한 사람<br></br>
              -여행과 영상을 좋아하는 사람<br></br>
              -SNS 활동을 즐겨하는 사람<br></br>
              <br></br>
              <br></br>○ 우대 사항<br></br>
              -책임감이 강하고 아이디어가 반짝이는 사람<br></br>
              -인플루언서 (인스타그램, 유튜버, 블로거)<br></br>
              -영상을 만드는 것에 관심이 많은 사람<br></br>
              -다양한 여가, 여행지 소개를 즐기는 사람<br></br>
              <br></br>
              <br></br>○ 활동 지역<br></br>
              -활동은 모두 온라인으로 진행될 예정입니다!<br></br>
              <br></br>
              <br></br>○ 활동 혜택<br></br>
              -월간 활동비 10만원 지급(미션 완료 시)<br></br>
              -우수 활동자 시상<br></br>
              (에어팟 2세대, CJ 5만원권, 배민 3만원권 및 미션 완료자 기프티콘
              증정)<br></br>
              -서포터즈 수료증 발급<br></br>
              -비브 인스타그램 공식 계정 업로드<br></br>
              <br></br>
              <br></br>○ 지원 방법<br></br>
              -구글 폼 접수 : https://url.kr/i4fgv7<br></br>
              <br></br>
              <br></br>○ 공식 카페/블로그 및 SNS<br></br>
              -인스타그램 : @viiv.official_
            </article>
          </EventInfodiv>
        </EventContentdiv>
      </EventInfoContainer>
    </PageContainer>
  );
};

export default EventInfoPage;
