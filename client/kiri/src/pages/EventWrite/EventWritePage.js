import { useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';
import EventInfoInput from './EventInfoInput';
import EventExplainInput from './EventExplainInput';
import EventEtcInput from './EventEtcInput';

const EventWritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 60px;
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;
const WriteBtn = styled.button`
  width: 150px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  border-radius: 40px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
    background-color: #44cf95;
  }
`;

const EventWritePage = () => {
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState({
    host: '',
    tel: '',
    email: '',
    region: '서울', //지역
    univ: '', //학교
    type: '전시', //유형
    field: 'IT',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
  });
  const [explain, setExplain] = useState('');
  const [link, setLink] = useState('');
  const [img, setImg] = useState(new FormData());

  const handleClickWriteBtn = () => {
    const blob = new Blob([JSON.stringify({ title, ...info, explain, link })], {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('data', blob);
    formData.append('img', img.image);
    //console.log('글 작성', { title, ...info, explain, link });
    //axios POST - body에 formData
  };

  return (
    <PageContainer header footer margin_bottom={false} page={'event/write'}>
      <EventWritePageContainer>
        <EventTitleInput title={title} setTitle={setTitle} />
        <EventInfoInput info={info} setInfo={setInfo} />
        <EventExplainInput explain={explain} setExplain={setExplain} />
        <EventEtcInput
          link={link}
          setLink={setLink}
          img={img}
          setImg={setImg}
        />
        <BtnContainer>
          <WriteBtn onClick={handleClickWriteBtn}>글쓰기</WriteBtn>
        </BtnContainer>
      </EventWritePageContainer>
    </PageContainer>
  );
};

export default EventWritePage;
