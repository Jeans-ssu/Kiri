import styled from 'styled-components';
import { useState } from 'react';
import { Regions, EventCategory } from 'util/info';
import SearchUnivModal from 'components/SearchUnivModal';
import { SearchUnivBtn } from 'components/buttons/SearchUnivBtn';
import { FiSearch } from 'react-icons/fi';

const EventInfoInputContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  margin: 15px 0;
  padding: 15px 15px 5px 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .start {
    margin-left: -13px;
  }

  .univ {
    margin-left: -2px;
  }
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
  width: ${(props) => props.width || '300px'};
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

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const EventInfoInput = ({
  info,
  setInfo,
  hostRef,
  emailRef,
  regionRef,
  univRef,
  typeRef,
  startDateRef,
  endDateRef,
  errorMessage,
}) => {
  //학교 찾기 모달
  const [isOpen, setIsOpen] = useState(false);
  const handleChangeInput = (e, target) => {
    setInfo({
      ...info,
      [target]: e.target.value,
    });
  };

  const handleSetUniv = (univName) => {
    setInfo({
      ...info,
      univ: univName,
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
          ref={hostRef}
        />
        <ErrorMessageBox> {errorMessage.hostErrorMessage}</ErrorMessageBox>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          이메일 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput
          type="email"
          value={info?.email}
          onChange={(e) => handleChangeInput(e, 'email')}
          ref={emailRef}
        />
        <ErrorMessageBox> {errorMessage.emailErrorMessage}</ErrorMessageBox>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>연락처</InfoHeader>
        <InfoTextInput
          type="tel"
          value={info?.tel}
          onChange={(e) => handleChangeInput(e, 'tel')}
        />
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          지역 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput
          value={info?.region}
          onChange={(e) => {
            handleChangeInput(e, 'region');
          }}
          ref={regionRef}
        >
          <option value="선택">{info?.region}</option>
          {Regions.map((el, idx) => {
            return (
              <option value={el} key={idx}>
                {el}
              </option>
            );
          })}
        </InfoSelectInput>
        <ErrorMessageBox> {errorMessage.regionErrorMessage}</ErrorMessageBox>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          학교 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput width="200px" readOnly value={info?.univ} />
        <SearchUnivBtn
          onClick={() => {
            setIsOpen(true);
          }}
          ref={univRef}
        >
          <FiSearch />
          찾아보기
        </SearchUnivBtn>
        <SearchUnivModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setUserUniv={handleSetUniv}
        />
        <ErrorMessageBox className="univ">
          {errorMessage.univErrorMessage}
        </ErrorMessageBox>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          유형 <span className="green">*</span>
        </InfoHeader>
        <InfoSelectInput
          value={info?.type}
          onChange={(e) => {
            handleChangeInput(e, 'type');
          }}
          ref={typeRef}
        >
          <option value="선택">선택</option>
          {EventCategory.map((el, idx) => {
            return (
              <option value={el} key={idx}>
                {el}
              </option>
            );
          })}
        </InfoSelectInput>
        <ErrorMessageBox> {errorMessage.typeErrorMessage}</ErrorMessageBox>
      </InfoContainer>
      <InfoContainer>
        <InfoHeader>
          날짜 <span className="green">*</span>
        </InfoHeader>
        <InfoTextInput
          type="date"
          className="smallSize"
          value={info?.startDate}
          onChange={(e) => handleChangeInput(e, 'startDate')}
          ref={startDateRef}
        />
        <InfoTextInput
          type="date"
          className="smallSize"
          value={info?.endDate}
          onChange={(e) => handleChangeInput(e, 'endDate')}
          ref={endDateRef}
        />
        {/* {errorMessage.startDateErrorMessage === '' &&
        errorMessage.endDateErrorMessage === '' ? (
          <ErrorMessageBox>날짜를 입력해주세요</ErrorMessageBox>
        ) : (
          ''
        )} */}
        <ErrorMessageBox className="start">
          {errorMessage.startDateErrorMessage}
        </ErrorMessageBox>
        <ErrorMessageBox> {errorMessage.endDateErrorMessage}</ErrorMessageBox>
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
