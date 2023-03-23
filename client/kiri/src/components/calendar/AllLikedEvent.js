import styled from 'styled-components';
import { HiPlusSm } from 'react-icons/hi';
import { useState } from 'react';
import { AllEventModal } from './AllEventModal';

export const AllLikedEvent = ({ leftEvents, todayEvents }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AllLikedEventContainer>
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiPlusSm />
        {leftEvents}
      </button>
      <AllEventModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        todayEvents={todayEvents}
      />
    </AllLikedEventContainer>
  );
};

const AllLikedEventContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 38px;
    height: 18px;
    margin-right: 5px;
    border-radius: 12px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.lightgray};
    font-size: 11px;
    color: ${({ theme }) => theme.colors.darkgray};
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 12px;
      height: 12px;
      fill: ${({ theme }) => theme.colors.darkgray};
    }
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
