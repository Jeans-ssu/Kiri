import styled from 'styled-components';
import eventColorMatcher from 'util/eventColorMatcher';

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
`;

export const LikedEvent = ({ title, type, isSameMonth }) => {
  return (
    <LikedEventContainer type={type} isSameMonth={isSameMonth}>
      {title}
    </LikedEventContainer>
  );
};
