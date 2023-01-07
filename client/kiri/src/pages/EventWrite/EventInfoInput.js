import styled from 'styled-components';

const EventInfoInputContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  margin: 15px 0;
  padding: 15px 15px 5px 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const InfoHeader = styled.div`
  width: 85px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
const InfoTextInput = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
  &.smallSize {
    width: 140px;
    margin-right: 20px;
  }
`;
const InfoSelectInput = styled.select`
  width: 120px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 0 5px;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const EventInfoInput = ({ info, setInfo }) => {
  const handleChangeInput = (e, target) => {
    setInfo({
      ...info,
      [target]: e.target.value,
    });
  };

  return (
    <EventInfoInputContainer>
      <InfoContainer>
        <InfoHeader>
          주최/단체 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput
          type="text"
          value={info.host}
          onChange={(e) => handleChangeInput(e, 'host')}
        />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>연락처</InfoHeader>
        <InfoTextInput
          type="tel"
          value={info.tel}
          onChange={(e) => handleChangeInput(e, 'tel')}
        />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          구분 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput
          value={info.type}
          onChange={(e) => {
            handleChangeInput(e, 'type');
          }}
        >
          <option value="Circle">동아리</option>
          <option value="Contest">공모전</option>
          <option value="Volunteer">봉사</option>
          <option value="lecture">강연</option>
          <option value="Supporters">서포터즈</option>
          <option value="SchoolFestival">학교축제</option>
          <option value="LocalFestival">지역축제</option>
          <option value="Etc">기타</option>
        </InfoSelectInput>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          분야 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput
          value={info.field}
          onChange={(e) => {
            handleChangeInput(e, 'field');
          }}
        >
          <option value="IT">IT</option>
          <option value="Business">경영/경제</option>
          <option value="Science">자연과학</option>
          <option value="Marketing">마케팅/홍보</option>
          <option value="Humanities">인문사회</option>
          <option value="Art">예술</option>
          <option value="Engineering">공학</option>
          <option value="Etc">기타</option>
        </InfoSelectInput>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          날짜 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput
          type="date"
          className="smallSize"
          value={info.startDate}
          onChange={(e) => handleChangeInput(e, 'startDate')}
        />
        <InfoTextInput
          type="date"
          className="smallSize"
          value={info.endDate}
          onChange={(e) => handleChangeInput(e, 'endDate')}
        />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>시간</InfoHeader>
        <InfoTextInput
          type="time"
          className="smallSize"
          value={info.startTime}
          onChange={(e) => handleChangeInput(e, 'startTime')}
        />
        <InfoTextInput
          type="time"
          className="smallSize"
          value={info.endTime}
          onChange={(e) => handleChangeInput(e, 'endTime')}
        />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>장소</InfoHeader>
        <InfoTextInput
          type="text"
          value={info.location}
          onChange={(e) => handleChangeInput(e, 'location')}
        />
      </InfoContainer>
    </EventInfoInputContainer>
  );
};

export default EventInfoInput;
