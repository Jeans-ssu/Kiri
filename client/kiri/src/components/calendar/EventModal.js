import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router';
import eventColorMatcher from 'util/eventColorMatcher';
import { parseISO, format } from 'date-fns';
import { AiFillHeart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';

const ModalContainer = styled.div``;

const ModalBackdrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  width: 280px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;

const ModalHeader = styled.div`
  position: relative;
  height: 20px;
  svg {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 14px;
    height: 14px;
  }
`;

const EventTag = styled.span`
  background-color: ${({ color }) => color};
  color: white;
  font-size: 13px;
  border-radius: 10px;
  padding: 3px 6px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  div {
    padding: 0 15px;
  }
  div.event {
    font-weight: 600;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.lightgray};
    margin-bottom: 3px;
  }
  div.title {
    font-weight: 600;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.darkgray};
  }
  div.type.school {
    margin: 4px 0;
  }
  span.school {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkgray};
    margin: 0 6px;
  }
`;

const DetailContent = styled.div`
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 13px;
  margin: 7px 15px;
  padding: 7px 0;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  div {
    margin: 2px 0;
  }
  span {
    font-weight: 600;
  }
`;

const EventBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin: 20px 0;
  button {
    background-color: transparent;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    font-size: 12px;
    svg {
      width: 15px;
      height: 15px;
      margin-right: 2px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  button.cancel {
    color: ${({ theme }) => theme.colors.lightgray};
  }
  button.look {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const EventModal = ({
  getMonthEvents,
  isOpen,
  setIsOpen,
  eventId,
  title,
  type,
  school,
  startTime,
  finishTime,
  organizer,
}) => {
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleClickLookBtn = () => {
    navigate(`/event/${eventId}`);
  };

  const handleClickCancelBtn = () => {
    axios
      .post(`/extra/${eventId}`)
      .then(() => {
        console.log('좋아요 취소 성공');
        getMonthEvents();
      })
      .catch((err) => console.log('ERROR: ', err));
    openModalHandler();
  };

  return (
    <ModalContainer>
      {isOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <IoMdClose onClick={openModalHandler} />
            </ModalHeader>
            <MainContent>
              <div className="event">이벤트:</div>
              <div className="title">{title}</div>
              <div className="type school">
                <EventTag color={eventColorMatcher(type)}>{type}</EventTag>
                <span className="school">{school}</span>
              </div>
            </MainContent>
            <DetailContent>
              <div>
                <span>장소: </span>장소
              </div>
              <div>
                <span>날짜: </span>
                {format(parseISO(startTime), 'yyyy/MM/dd') ===
                format(parseISO(finishTime), 'yyyy/MM/dd')
                  ? `${format(parseISO(startTime), 'yyyy/MM/dd')}`
                  : `${format(parseISO(startTime), 'yyyy/MM/dd')} ~ ${format(
                      parseISO(finishTime),
                      'yyyy/MM/dd'
                    )}`}
              </div>
              <div>
                <span>주최: </span>
                {organizer}
              </div>
            </DetailContent>
            <EventBtnsContainer>
              <button className="cancel" onClick={handleClickCancelBtn}>
                <AiFillHeart />
                좋아요 취소
              </button>
              <button className="look" onClick={handleClickLookBtn}>
                <BiSearch />
                자세히 보기
              </button>
            </EventBtnsContainer>
          </ModalView>
        </ModalBackdrop>
      ) : null}
    </ModalContainer>
  );
};

export default EventModal;
