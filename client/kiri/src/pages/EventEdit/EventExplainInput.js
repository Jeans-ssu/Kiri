import styled from 'styled-components';

const EventExplainInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  @media screen and (max-width: 767px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const ExplainHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 10px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 18px;
    margin-left: 3px;
  }
  display: flex;
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

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const EventExplainInput = ({
  explain,
  setExplain,
  explainRef,
  errorMessage,
}) => {
  const handleChangeInput = (e) => {
    setExplain(e.target.value);
  };

  return (
    <EventExplainInputContainer>
      <ExplainHeader>
        설명 <span className="green">*</span>
        <ErrorMessageBox> {errorMessage.explainErrorMessage}</ErrorMessageBox>
      </ExplainHeader>
      <ExplainInput
        type="text"
        value={explain || ''}
        onChange={handleChangeInput}
        ref={explainRef}
      />
    </EventExplainInputContainer>
  );
};

export default EventExplainInput;
