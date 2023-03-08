import styled from 'styled-components';

export const SearchUnivBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 80px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;