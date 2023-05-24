import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Regions, EventCategory } from 'util/info';
import SearchUnivModal from 'components/SearchUnivModal';
import { SearchUnivBtn } from 'components/buttons/SearchUnivBtn';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOcrMode,
  selectOcrResult,
  setOcrMode,
} from 'store/modules/ocrSlice';

const MobileContainer = styled.div`
  @media screen and (max-width: 767px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const EventInfoInputContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  margin: 0 0 15px;
  padding: 15px 15px 5px 15px;
  @media screen and (max-width: 767px) {
    .smallSize {
      display: flex;
      flex-direction: row;
      margin-right: 5px;
    }
    margin: 0 auto 15px;
    padding: 10px 10px 0px 10px;
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
    font-size: 13px;
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

const ErrorMessageWebBox = styled.div`
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

  const ocrResult = useSelector(selectOcrResult);
  const ocrMode = useSelector(selectOcrMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ocrResult.length !== 0) {
      setInfo({
        host: JSON.parse(ocrResult)?.host,
        tel: JSON.parse(ocrResult)?.contact,
        startDate: JSON.parse(ocrResult)?.startDate,
        endDate: JSON.parse(ocrResult)?.endDate,
        startTime: JSON.parse(ocrResult)?.startTime || '00:00',
        endTime: JSON.parse(ocrResult)?.endTime || '00:00',
        location: JSON.parse(ocrResult)?.location,
        email: '',
        region: '선택',
        univ: '',
        type: '선택',
      });
      dispatch(setOcrMode(false));
    }
  }, [ocrMode]);

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
      <EventInfoInputContainer className="infocontainer">
        <InfoContainer>
          <InfoHeader>
            주최/단체 <span className="green">*</span>
          </InfoHeader>
          <ErrorMessageMobileBox>
            {errorMessage.hostErrorMessage}
          </ErrorMessageMobileBox>
          <InfoTextInput
            type="text"
            value={info.host || ''}
            onChange={(e) => handleChangeInput(e, 'host')}
            ref={hostRef}
          />
          <ErrorMessageWebBox>
            {errorMessage.hostErrorMessage}
          </ErrorMessageWebBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>이메일</InfoHeader>
          <InfoTextInput
            type="email"
            value={info.email || ''}
            onChange={(e) => handleChangeInput(e, 'email')}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>연락처</InfoHeader>
          <InfoTextInput
            type="tel"
            value={info.tel || ''}
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
            value={info.region}
            onChange={(e) => {
              handleChangeInput(e, 'region');
            }}
            ref={regionRef}
          >
            <option value="선택">선택</option>
            {Regions?.map((el, idx) => {
              return (
                <option value={el} key={idx}>
                  {el}
                </option>
              );
            })}
          </InfoSelectInput>
          <ErrorMessageWebBox>
            {errorMessage.regionErrorMessage}
          </ErrorMessageWebBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>
            학교 <span className="green">*</span>
          </InfoHeader>
          <ErrorMessageMobileBox>
            {errorMessage.univErrorMessage}
          </ErrorMessageMobileBox>

          <SchoolBox>
            <InfoTextInput width="200px" readOnly value={info.univ || ''} />
            <SearchUnivBtn
              onClick={() => {
                setIsOpen(true);
              }}
              ref={univRef}
            >
              <FiSearch size="12" />
              찾아보기
            </SearchUnivBtn>
          </SchoolBox>
          <SearchUnivModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setUserUniv={handleSetUniv}
          />
          <ErrorMessageWebBox className="univ">
            {errorMessage.univErrorMessage}
          </ErrorMessageWebBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>
            유형 <span className="green">*</span>
          </InfoHeader>
          <ErrorMessageMobileBox>
            {errorMessage.typeErrorMessage}
          </ErrorMessageMobileBox>

          <InfoSelectInput
            value={info.type}
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
          <ErrorMessageWebBox>
            {errorMessage.typeErrorMessage}
          </ErrorMessageWebBox>
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
              value={info.startDate || ''}
              onChange={(e) => handleChangeInput(e, 'startDate')}
              ref={startDateRef}
            />
            <InfoTextInput
              type="date"
              className="smallSize"
              value={info.endDate || ''}
              onChange={(e) => handleChangeInput(e, 'endDate')}
              ref={endDateRef}
            />
          </InfoSmallBox>
          <ErrorMessageWebBox className="start">
            {errorMessage.startDateErrorMessage}
          </ErrorMessageWebBox>
          <ErrorMessageWebBox>
            {errorMessage.endDateErrorMessage}
          </ErrorMessageWebBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>시간</InfoHeader>
          <InfoSmallBox>
            <InfoTextInput
              type="time"
              className="smallSize"
              value={info.startTime || ''}
              onChange={(e) => handleChangeInput(e, 'startTime')}
            />
            <InfoTextInput
              type="time"
              className="smallSize"
              value={info.endTime || ''}
              onChange={(e) => handleChangeInput(e, 'endTime')}
            />
          </InfoSmallBox>
        </InfoContainer>
        <InfoContainer>
          <InfoHeader>장소</InfoHeader>
          <InfoTextInput
            type="text"
            value={info.location || ''}
            onChange={(e) => handleChangeInput(e, 'location')}
          />
        </InfoContainer>
      </EventInfoInputContainer>
    </MobileContainer>
  );
};

export default EventInfoInput;
