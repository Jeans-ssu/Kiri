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
  width: 40%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
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

const EventInfoInput = () => {
  return (
    <EventInfoInputContainer>
      <InfoContainer>
        <InfoHeader>
          주최/단체 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>연락처</InfoHeader>
        <InfoTextInput />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          구분 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput>
          <option>동아리</option>
          <option>공모전</option>
          <option>봉사</option>
          <option>강연</option>
          <option>서포터즈</option>
          <option>학교축제</option>
          <option>지역축제</option>
          <option>기타</option>
        </InfoSelectInput>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          분야 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput>
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
        <InfoTextInput />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>시간</InfoHeader>
        <InfoTextInput />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>장소</InfoHeader>
        <InfoTextInput />
      </InfoContainer>
    </EventInfoInputContainer>
  );
};

export default EventInfoInput;
