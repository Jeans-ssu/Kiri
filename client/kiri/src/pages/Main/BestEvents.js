import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MainHeader } from './MainEvents';
import {
  EventsHeader,
  EventContent,
  OpenBtn,
  eventsData,
} from './SelectedEvents';

const BestEventsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const MainContent = styled.div`
  width: 100%;
`;

const BestEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      eventsData.sort((a, b) => {
        return b.like - a.like;
      })
    );
  }, []);

  return (
    <BestEventsContainer>
      <MainHeader>
        끼리끼리에서 <span className="yellow">인기있는</span> 이벤트
      </MainHeader>
      <MainContent>
        <EventsHeader />
        {isOpen ? (
          <>
            {data?.map((el) => {
              return <EventContent key={el.eventId} event={el} />;
            })}
          </>
        ) : (
          <>
            {data.slice(0, 5)?.map((el) => {
              return <EventContent key={el.eventId} event={el} />;
            })}
          </>
        )}
        <OpenBtn isOpen={isOpen} setIsOpen={setIsOpen} />
      </MainContent>
    </BestEventsContainer>
  );
};

export default BestEvents;
