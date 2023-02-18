import styled from 'styled-components';
import {
  BsFillSuitHeartFill,
  BsSuitHeart,
  BsFillCaretLeftFill,
  BsCaretRightFill,
} from 'react-icons/bs';
import { useState } from 'react';

const day = [1, 2, 3, 4, 5, 6, 7];

const EventList = () => {
  const [mark, setMark] = useState(true);

  const markHandler = () => {
    setMark(!mark);
  };

  return (
    <Container>
      <HeaderBox>
        <h3>이번주 이벤트</h3>
      </HeaderBox>
      <PeriodBox>
        <LeftBox>
          <BsFillCaretLeftFill size="21" />
        </LeftBox>
        <CenterBox>
          <span>11/1 ~ 11/7</span>
        </CenterBox>
        <RightBox>
          <BsCaretRightFill size="21" />
        </RightBox>
      </PeriodBox>
      <EventListContainer>
        {day.map((el, idx) => {
          return (
            <EventListBox key={idx}>
              <DayListBox>11/{el}</DayListBox>
              <TitleListBox>이벤트 이름</TitleListBox>
              <TimeListBox>00:00 - 00:00</TimeListBox>
              <HeartListBox onClick={markHandler}>
                {mark ? (
                  <BsFillSuitHeartFill size="22" color="#ff6b6b" />
                ) : (
                  <BsSuitHeart size="27" />
                )}
              </HeartListBox>
            </EventListBox>
          );
        })}
      </EventListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 30px;

  h3 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 15px;
  }
`;

const HeaderBox = styled.div``;

const PeriodBox = styled.div`
  display: flex;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const CenterBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const EventListContainer = styled.div``;

const EventListBox = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const DayListBox = styled.div`
  font-weight: 500;
  margin-right: 10px;
`;

const TitleListBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  height: 30px;
  width: 760px;
  padding: 3px;
  display: flex;
  align-items: center;
`;

const TimeListBox = styled.div`
  margin: 0 15px;
  margin-left: auto;
`;

const HeartListBox = styled.div`
  margin-left: auto;
`;

export default EventList;
