import styled from 'styled-components';

const EventTitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 10px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 20px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 0 10px;
  &:active,
  &:focus {
    outline: none;
  }
`;

const EventTitleInput = ({ Title, setTitle }) => {
  const handleChangeInput = (e) => {
    setTitle(e.target.value);
  };
  return (
    <EventTitleInputContainer>
      <TitleHeader>
        제목 <span className="green">*</span>
      </TitleHeader>
      <TitleInput value={Title} onChange={handleChangeInput} />
    </EventTitleInputContainer>
  );
};

export default EventTitleInput;
