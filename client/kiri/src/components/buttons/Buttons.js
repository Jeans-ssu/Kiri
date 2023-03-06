import styled from 'styled-components';

const Button1Container = styled.button`
  width: ${(props) => props.width || '80px'};
  height: ${(props) => props.height || '30px'};
  font-size: ${(props) => props.fontSize || '14px'};
  border-radius: 6px;
  border: none;
  color: #4c695d;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.green_2};
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.green_1};
  }
`;

const Button2Container = styled.button`
  width: ${(props) => props.width || '80px'};
  height: ${(props) => props.height || '30px'};
  border-radius: 6px;
  border: 2px solid ${({ theme }) => theme.colors.mainColor};
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 700;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.green_2};
    border: none;
    color: #4c695d;
  }
`;

const Button_1 = ({ children, ...props }) => {
  return <Button1Container {...props}>{children}</Button1Container>;
};

const Button_2 = ({ children, ...props }) => {
  return <Button2Container {...props}>{children}</Button2Container>;
};

export { Button_1, Button_2 };
