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
        <EventListBox className="border">
          <DayLineBox>
            <DayListBox>이번주 일정 모아보기</DayListBox>
          </DayLineBox>
        </EventListBox>
        {day?.map((el, idx) => {
          return (
            <EventListBox
              key={idx}
              className={`${idx === 2 || idx === 6 ? 'none' : 'border'}`}
            >
              <DayLineBox>
                <DayListBox>11/{el}</DayListBox>
              </DayLineBox>
              <PlanBox>
                <TimeListBox>00:00</TimeListBox>
                <TitleListBox>이벤트 이름</TitleListBox>
                <HeartListBox onClick={markHandler}>
                  {mark ? (
                    <BsFillSuitHeartFill
                      className="heart"
                      size="17"
                      color="#ff6b6b"
                    />
                  ) : (
                    <BsSuitHeart className="heart" size="17" />
                  )}
                </HeartListBox>
              </PlanBox>
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

const EventListContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 18px 0;

  .heart {
    display: flex;
    align-items: center;
  }

  .border {
    border-right: 1px solid black;
  }
`;

const EventListBox = styled.div`
  height: 250px;
  align-items: center;
`;

const PlanBox = styled.div`
  display: flex;
  padding: 0 10px;
`;

const DayLineBox = styled.div`
  border-bottom: 1px solid black;
`;

const DayListBox = styled.div`
  font-weight: 500;
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 19px;
`;

const TitleListBox = styled.div`
  padding: 3px;
  margin-left: 2px;
  display: flex;
  align-items: center;
`;

const TimeListBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const HeartListBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export default EventList;
