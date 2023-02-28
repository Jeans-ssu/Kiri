import styled from 'styled-components';
import PageContainer from 'containers/PageContainer';
import { FiShare2 } from 'react-icons/fi';
import { BsFillSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useRef, useState } from 'react';

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

const SliderBox = styled.div`
  width: 500px;
  height: 600px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  ul {
    list-style: none;
  }

  li {
    position: absolute;
    transition-delay: 1s;
    padding: 0;
    margin: 0;
  }
`;

const CircleBox = styled.div`
  position: absolute;
  transform: translateX(-50%);
  z-index: 2;
  left: 610px;
  bottom: 140px;

  .select {
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid rgba(0, 0, 0, 0.55);
    width: 7px;
    height: 7px;
    margin: 0 5px;
  }
  .unselect {
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.55);
    width: 10px;
    height: 10px;
    margin: 0 5px;
    cursor: pointer;
  }
`;

const CircleList = styled.div`
  display: inline-block;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.55);
  width: 10px;
  height: 10px;
  margin: 0 5px;
  cursor: pointer;
`;

// const SliderBox = styled.div`
//   width: 400px;
//   height: 600px;
//   position: relative;
//   margin: 0 auto;
//   overflow: hidden;

//   ul.imgs {
//     padding: 0;
//     margin: 0;
//     list-style: none;
//   }

//   ul.imgs li {
//     position: absolute;
//     left: 400px;
//     transition-delay: 1s;

//     padding: 0;
//     margin: 0;
//   }
//   label {
//     display: inline-block;
//     border-radius: 50%;
//     background-color: rgba(0, 0, 0, 0.55);
//     width: 10px;
//     height: 10px;
//     margin: 0 5px;

//     cursor: pointer;
//   }
// `;

// const Radiobtn = styled.input.attrs({ type: 'radio' })`
//   display: none;
//   &:nth-child(1):checked ~ .bullets > label:nth-child(1) {
//     background-color: transparent;
//     border: 3px solid rgba(0, 0, 0, 0.55);
//   }
//   &:nth-child(2):checked ~ .bullets > label:nth-child(2) {
//     background-color: transparent;
//     border: 3px solid rgba(0, 0, 0, 0.55);
//   }
//   &:nth-child(3):checked ~ .bullets > label:nth-child(3) {
//     background-color: transparent;
//     border: 3px solid rgba(0, 0, 0, 0.55);
//   }
//   &:nth-child(4):checked ~ .bullets > label:nth-child(4) {
//     background-color: transparent;
//     border: 3px solid rgba(0, 0, 0, 0.55);
//   }

//   &:nth-child(1):checked ~ ul.imgs > li:nth-child(1) {
//     left: 0;
//     transition: 0.5s;
//     z-index: 1;
//   }
//   &:nth-child(2):checked ~ ul.imgs > li:nth-child(2) {
//     left: 0;
//     transition: 0.5s;
//     z-index: 1;
//   }
//   &:nth-child(3):checked ~ ul.imgs > li:nth-child(3) {
//     left: 0;
//     transition: 0.5s;
//     z-index: 1;
//   }
//   &:nth-child(4):checked ~ ul.imgs > li:nth-child(4) {
//     left: 0;
//     transition: 0.5s;
//     z-index: 1;
//   }
// `;

// const BulletsBox = styled.div`
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   bottom: 20px;
//   z-index: 2;
// `;

const EventInfodiv = styled.div`
  margin-left: 40px;
`;

const EventInfoPage = () => {
  // 나중에 이미지 배열로 수정 필요
  const posters = [
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
    `${process.env.PUBLIC_URL}/img/event_cover.jpeg`,
    `${process.env.PUBLIC_URL}/poster.jpg`,
  ];
  const [mark, setMark] = useState(false);
  const [select, setSelect] = useState(0);
  const number = useRef(0);

  const selectHandler = (idx) => {
    number.current = idx;
    setSelect(idx);
    console.log(number.current);
  };

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
              {mark ? (
                <BsFillSuitHeartFill size="27" color="#ff6b6b" />
              ) : (
                <BsSuitHeart size="27" />
              )}
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
            <SliderBox>
              <ul className="imgs">
                {posters.map((el, idx) => {
                  return (
                    <li key={idx}>
                      {idx === select ? <img alt={idx} src={el}></img> : ''}
                    </li>
                  );
                })}
              </ul>
            </SliderBox>
            <CircleBox>
              {posters.map((el, idx) => {
                return (
                  <CircleList
                    onClick={() => selectHandler(idx)}
                    key={idx}
                    className={select === idx ? 'select' : 'unselect'}
                  ></CircleList>
                );
              })}
            </CircleBox>
            {/* <SliderBox>
              <Radiobtn
                type="radio"
                name="slide"
                id="slide1"
                checked
              ></Radiobtn>
              <Radiobtn type="radio" name="slide" id="slide2"></Radiobtn>
              <Radiobtn type="radio" name="slide" id="slide3"></Radiobtn>
              <Radiobtn type="radio" name="slide" id="slide4"></Radiobtn>
              <ul id="imgholder" className="imgs">
                <li>
                  <img
                    className="poster"
                    alt="poster"
                    src={`${process.env.PUBLIC_URL}/img/event_cover.jpeg`}
                  ></img>
                </li>
                <li>
                  <img
                    className="poster"
                    alt="poster"
                    src={`${process.env.PUBLIC_URL}/poster.jpg`}
                  ></img>
                </li>
                <li>
                  <img
                    className="poster"
                    alt="poster"
                    src={`${process.env.PUBLIC_URL}/img/event_cover.jpeg`}
                  ></img>
                </li>
                <li>
                  <img
                    className="poster"
                    alt="poster"
                    src={`${process.env.PUBLIC_URL}/poster.jpg`}
                  ></img>
                </li>
              </ul>
              <BulletsBox className="bullets">
                <label htmlFor="slide1">&nbsp;</label>
                <label htmlFor="slide2">&nbsp;</label>
                <label htmlFor="slide3">&nbsp;</label>
                <label htmlFor="slide4">&nbsp;</label>
              </BulletsBox>
            </SliderBox> */}
            {/* <img
              className="poster"
              alt="poster"
              src={`${process.env.PUBLIC_URL}/poster.jpg`}
            ></img> */}
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
