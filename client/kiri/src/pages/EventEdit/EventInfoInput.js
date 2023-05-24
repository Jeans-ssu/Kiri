import styled from 'styled-components';
import { useState } from 'react';
import { Regions, EventCategory } from 'util/info';
import SearchUnivModal from 'components/SearchUnivModal';
import { SearchUnivBtn } from 'components/buttons/SearchUnivBtn';
import { FiSearch } from 'react-icons/fi';

const MobileContainer = styled.div`
  @media screen and (max-width: 767px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const EventInfoInputContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  margin: 15px 0;
  padding: 15px 15px 5px 15px;
  @media screen and (max-width: 767px) {
    .smallSize {
      display: flex;
      flex-direction: row;
      margin-right: 5px;
    }
    margin: 15px auto;
  }
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
  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 15px;
    .start {
      margin-left: -13px;
    }

    .univ {
      margin-left: -2px;
    }
  }
`;

const InfoHeader = styled.div`
  width: 85px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 767px) {
    width: 85px;
    margin-bottom: 5px;
    margin-right: auto;
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
  @media screen and (max-width: 767px) {
    width: ${(props) => props.width || '90%'};
    margin-bottom: 5px;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    &.smallSize {
      display: flex;
      width: 140px;
      margin-right: 7px;
    }
  }
`;

const InfoSmallBox = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: auto;
  }
`;

const SchoolBox = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    margin-right: auto;
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
  @media screen and (max-width: 767px) {
    width: 120px;
    margin-right: auto;
  }
`;

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 5px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const ErrorMessageMobileBox = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.red};
    display: flex;
    margin-right: auto;
    margin-bottom: 2px;
    &.date {
      font-size: 12px;
    }
    &.start {
      margin-right: 5px;
    }
  }
`;

const MobileFlex = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    margin-left: 15px;
    margin-right: auto;
  }
`;

const EventInfoInput = ({
  info,
  setInfo,
  hostRef,
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
    <MobileContainer>
      <EventInfoInputContainer>
        <InfoContainer>
          <InfoHeader>
            주최/단체 <span className="green">*</span>
          </InfoHeader>
          <ErrorMessageMobileBox>
            {errorMessage.hostErrorMessage}
          </ErrorMessageMobileBox>
          <InfoTextInput
            type="text"
            value={info?.host || ''}
            onChange={(e) => handleChangeInput(e, 'host')}
            ref={hostRef}
          />
          <ErrorMessageBox> {errorMessage.hostErrorMessage}</ErrorMessageBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>이메일</InfoHeader>
          <InfoTextInput
            type="email"
            value={info?.email || ''}
            onChange={(e) => handleChangeInput(e, 'email')}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>연락처</InfoHeader>
          <InfoTextInput
            type="tel"
            value={info?.tel || ''}
            onChange={(e) => handleChangeInput(e, 'tel')}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>
            지역 <span className="green">*</span>
          </InfoHeader>
          <ErrorMessageMobileBox>
            {errorMessage.regionErrorMessage}
          </ErrorMessageMobileBox>
          <InfoSelectInput
            value={info?.region || ''}
            onChange={(e) => {
              handleChangeInput(e, 'region');
            }}
            ref={regionRef}
          >
            <option value="선택">{info?.region}</option>
            {Regions?.map((el, idx) => {
              return (
                <option value={el || ''} key={idx}>
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
          <ErrorMessageMobileBox>
            {errorMessage.univErrorMessage}
          </ErrorMessageMobileBox>
          <SchoolBox>
            <InfoTextInput width="200px" readOnly value={info?.univ || ''} />
            <SearchUnivBtn
              onClick={() => {
                setIsOpen(true);
              }}
              ref={univRef}
            >
              <FiSearch />
              찾아보기
            </SearchUnivBtn>
          </SchoolBox>
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
          <ErrorMessageMobileBox>
            {errorMessage.typeErrorMessage}
          </ErrorMessageMobileBox>
          <InfoSelectInput
            value={info?.type || ''}
            onChange={(e) => {
              handleChangeInput(e, 'type');
            }}
            ref={typeRef}
          >
            <option value="선택">선택</option>
            {EventCategory?.map((el, idx) => {
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
          <MobileFlex>
            <ErrorMessageMobileBox className="start date">
              {errorMessage.startDateErrorMessage}
            </ErrorMessageMobileBox>
            <ErrorMessageMobileBox className="date">
              {errorMessage.endDateErrorMessage}
            </ErrorMessageMobileBox>
          </MobileFlex>
          <InfoSmallBox>
            <InfoTextInput
              type="date"
              className="smallSize"
              value={info?.startDate || ''}
              onChange={(e) => handleChangeInput(e, 'startDate')}
              ref={startDateRef}
            />
            <InfoTextInput
              type="date"
              className="smallSize"
              value={info?.endDate || ''}
              onChange={(e) => handleChangeInput(e, 'endDate')}
              ref={endDateRef}
            />
          </InfoSmallBox>
          <ErrorMessageBox className="start">
            {errorMessage.startDateErrorMessage}
          </ErrorMessageBox>
          <ErrorMessageBox> {errorMessage.endDateErrorMessage}</ErrorMessageBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>시간</InfoHeader>
          <InfoSmallBox>
            <InfoTextInput
              type="time"
              className="smallSize"
              value={info?.startTime || ''}
              onChange={(e) => handleChangeInput(e, 'startTime')}
            />
            <InfoTextInput
              type="time"
              className="smallSize"
              value={info?.endTime || ''}
              onChange={(e) => handleChangeInput(e, 'endTime')}
            />
          </InfoSmallBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>장소</InfoHeader>
          <InfoTextInput
            type="text"
            value={info?.location || ''}
            onChange={(e) => handleChangeInput(e, 'location')}
          />
        </InfoContainer>
      </EventInfoInputContainer>
    </MobileContainer>
  );
};

export default EventInfoInput;
