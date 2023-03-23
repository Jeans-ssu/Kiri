import styled from 'styled-components';
import { BiDotsVerticalRounded } from 'react-icons/bi';

export const AllLikedEvent = () => {
  return (
    <AllLikedEventContainer>
      <BiDotsVerticalRounded />
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
