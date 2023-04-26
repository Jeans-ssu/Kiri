import { useState } from 'react';
import styled from 'styled-components';
import eventColorMatcher from 'util/eventColorMatcher';
import EventModal from './EventModal';

const LikedEventContainer = styled.div`
  height: 22px;
  background-color: ${({ theme }) => theme.colors.light};
  border-left: 4px solid ${({ type }) => eventColorMatcher(type)};
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  margin: 0 0 1px 1px;
  padding-left: 4px;
  color: ${({ theme }) => theme.colors.darkgray};
  color: ${({ isSameMonth }) => (isSameMonth ? '#434343' : '#737373')};
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.lightgray};
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const LikedEvent = ({
  eventId,
  getMonthEvents,
  isSameMonth,
  title,
  type,
  school,
  startTime,
  finishTime,
  organizer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <LikedEventContainer
      type={type}
      isSameMonth={isSameMonth}
      onClick={() => setIsOpen(!isOpen)}
    >
      {title}
      <EventModal
        getMonthEvents={getMonthEvents}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eventId={eventId}
        title={title}
        type={type}
        school={school}
        startTime={startTime}
        finishTime={finishTime}
        organizer={organizer}
      />
    </LikedEventContainer>
  );
};
