import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useState } from 'react';
import { AllEventModal } from './AllEventModal';

export const AllLikedEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AllLikedEventContainer onClick={() => setIsOpen(!isOpen)}>
      <BiDotsVerticalRounded />
      <AllEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </AllLikedEventContainer>
  );
};

const AllLikedEventContainer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;
