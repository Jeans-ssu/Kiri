import styled from 'styled-components';

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const EtcHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
`;
const LinkInput = styled.input`
  width: 350px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  outline: none;
`;

const ImgUploadBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainColor};
  &:hover {
    cursor: pointer;
  }
`;

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
      <EtcContainer>
        <EtcHeader>이미지</EtcHeader>
        <ImgUploadBtn>파일 선택</ImgUploadBtn>
      </EtcContainer>
    </EventEtcInputContainer>
  );
};

export default EventEtcInput;
