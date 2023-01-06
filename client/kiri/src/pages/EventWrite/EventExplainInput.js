import styled from 'styled-components';

const EventExplainInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const ExplainHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 10px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 18px;
  }
`;

const ExplainInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 15px;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const EventExplainInput = ({ explain, setExplain }) => {
  const handleChangeInput = (e) => {
    setExplain(e.target.value);
  };

  return (
    <EventExplainInputContainer>
      <ExplainHeader>
        설명 <span className="green">*</span>
      </ExplainHeader>
      <ExplainInput type="text" value={explain} onChange={handleChangeInput} />
    </EventExplainInputContainer>
  );
};

export default EventExplainInput;
