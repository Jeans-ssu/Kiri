import styled from 'styled-components';

const EventEtcInput = ({ link, setLink }) => {
  const handleChangeInput = (e) => {
    setLink(e.target.value);
  };

  return (
    <EventEtcInputContainer>
      <EtcContainer>
        <EtcHeader>참고링크</EtcHeader>
        <LinkInput type="url" value={link} onChange={handleChangeInput} />
      </EtcContainer>
    </EventEtcInputContainer>
  );
};

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 5px;
    font-size: 13px;
    font-weight: 600;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      width: 60px;
      height: 24px;
      font-size: 11px;
    }
  }
`;
const EtcHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 18px;
    margin-left: 3px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
const LinkInput = styled.input`
  width: 350px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  outline: none;

  @media screen and (max-width: 767px) {
    width: 65vw;
  }
`;

export default EventEtcInput;
