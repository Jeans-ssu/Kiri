import styled from 'styled-components';

const EventTitleInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const TitleHeader = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 10px;
  display: flex;
  .title {
    margin-right: 3px;
  }
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 20px;
  }
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  font-size: 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 767px) {
    width: 93vw;
  }
`;

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 3px;
`;

const EventTitleInput = ({ Title, setTitle, titleRef, errorMessage }) => {
  const handleChangeInput = (e) => {
    setTitle(e.target.value);
  };
  return (
    <EventTitleInputContainer className="titlecontainer">
      <TitleHeader>
        <div className="title">제목</div>
        <span className="green">*</span>
        <ErrorMessageBox> {errorMessage.titleErrorMessage}</ErrorMessageBox>
      </TitleHeader>
      <TitleInput value={Title} onChange={handleChangeInput} ref={titleRef} />
    </EventTitleInputContainer>
  );
};

export default EventTitleInput;
