import { useRef, useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';
import EventInfoInput from './EventInfoInput';
import EventExplainInput from './EventExplainInput';
import EventEtcInput from './EventEtcInput';
import axios from '../../api/axios';

const jwtToken = localStorage.getItem('Authorization');
const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: jwtToken,
};

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
    region: '선택', //지역
    univ: '', //학교
    type: '선택', //유형
    field: 'IT',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  const [post, setPost] = useState({
    email: '',
    event: '',
    local: '',
    school: '',
    place: null,
    organizer: '',
    contactNumber: null,
    startPostTime: '',
    finishPostTime: '',
    scrap_count: 0,
    title: '',
    link: null,
    imageIdList: null,
  });

  const [explain, setExplain] = useState('');
  const [link, setLink] = useState('');
  const [img, setImg] = useState(new FormData());
  const [errorMessage, setErrorMessage] = useState({
    titleErrorMessage: '',
    hostErrorMessage: '',
    emailErrorMessage: '',
    regionErrorMessage: '',
    univErrorMessage: '',
    typeErrorMessage: '',
    startDateErrorMessage: '',
    endDateErrorMessage: '',
    explainErrorMessage: '',
  });

  const titleRef = useRef();
  const hostRef = useRef();
  const emailRef = useRef();
  const regionRef = useRef();
  const univRef = useRef();
  const typeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const explainRef = useRef();

  const handleClickWriteBtn = () => {
    if (
      title === '' ||
      info.host === '' ||
      info.email === '' ||
      info.region === '선택' ||
      info.univ === '' ||
      info.type === '선택' ||
      info.startDate === '' ||
      info.endDate === '' ||
      explain === ''
    ) {
      if (explain === '') {
        explainRef.current && explainRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, explainErrorMessage: '설명을 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, explainErrorMessage: '' };
        });
      }
      if (info.endDate === '') {
        endDateRef.current && endDateRef.current.focus();
        setErrorMessage((prev) => {
          return {
            ...prev,
            endDateErrorMessage: '끝나는 날짜를 입력해주세요.',
          };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, endDateErrorMessage: '' };
        });
      }
      if (info.startDate === '') {
        startDateRef.current && startDateRef.current.focus();
        setErrorMessage((prev) => {
          return {
            ...prev,
            startDateErrorMessage: '시작하는 날짜를 입력해주세요.',
          };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, startDateErrorMessage: '' };
        });
      }
      if (info.type === '선택') {
        typeRef.current && typeRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, typeErrorMessage: '유형을 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, typeErrorMessage: '' };
        });
      }
      if (info.univ === '') {
        univRef.current && univRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, univErrorMessage: '학교를 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, univErrorMessage: '' };
        });
      }
      if (info.region === '선택') {
        regionRef.current && regionRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, regionErrorMessage: '지역을 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, regionErrorMessage: '' };
        });
      }
      if (info.email === '') {
        emailRef.current && emailRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, emailErrorMessage: '이메일을 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, emailErrorMessage: '' };
        });
      }
      if (info.host === '') {
        hostRef.current && hostRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, hostErrorMessage: '주체/단체를 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, hostErrorMessage: '' };
        });
      }
      if (title === '') {
        titleRef.current && titleRef.current.focus();
        setErrorMessage((prev) => {
          return { ...prev, titleErrorMessage: '제목을 입력해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, titleErrorMessage: '' };
        });
      }
    } else {
      console.log('img', img);
      setPost({
        email: info.email,
        event: info.type,
        local: info.region,
        school: info.univ,
        place: info.location,
        organizer: info.host,
        contactNumber: info.tel,
        startPostTime: info.startDate + ' ' + info.startTime,
        finishPostTime: info.endDate + ' ' + info.endTime,
        link: link,
        imageIdList: img.image,
        title: title,
        scrap_count: 0,
      });

      const blob = new Blob([JSON.stringify({ post })], {
        event: 'application/json',
      });
      const formData = new FormData();
      formData.append('title', title);
      formData.append('scrap_count', 0);
      formData.append('email', post.email);
      formData.append('content', explain);
      formData.append('event', post.event);
      formData.append('local', post.local);
      formData.append('school', post.school);
      formData.append('place', post.place);
      formData.append('organizer', post.orgainzer);
      formData.append('link', link);
      formData.append('contactNumber', post.contactNumber);
      formData.append('imageIdList', null);
      formData.append('startPostTime', info.startDate + ' ' + info.startTime);
      formData.append('finishPostTime', info.endDate + ' ' + info.endTime);
      console.log(blob);
      // formData.append('img', img.image);
      console.log('글 작성', { title, ...post, explain, link });
      //axios POST - body에 formData
      for (var key of formData.keys()) {
        console.log('formData Key', key);
      }

      for (var value of formData.values()) {
        console.log('formData Value', value);
      }
      axios
        .post(
          '/api/posts',
          formData
          // {
          //   title: title,
          //   scrap_count: 0,
          //   email: info.email,
          //   content: info.content,
          //   event: info.event,
          //   local: info.local,
          //   school: info.school,
          //   place: info.place,
          //   organizer: info.orgainzer,
          //   link: link,
          //   contactNumber: info.contactNumber,
          //   imageIdList: null,
          //   startPostTime: info.startDate + info.startTime,
          //   finishPostTime: info.endDate + info.endTime,
          // }
        )
        .then(() => {
          alert('등록이 완료되었습니다');
        })
        .catch((err) => console.error(err));
      //console.log('글 작성', { title, ...info, explain, link });
      //axios POST - body에 formData
    }
  };

  return (
    <PageContainer header footer margin_bottom={false} page={'event/write'}>
      <EventWritePageContainer>
        <EventTitleInput
          title={title}
          setTitle={setTitle}
          titleRef={titleRef}
          errorMessage={errorMessage}
        />
        <EventInfoInput
          info={info}
          setInfo={setInfo}
          hostRef={hostRef}
          emailRef={emailRef}
          regionRef={regionRef}
          univRef={univRef}
          typeRef={typeRef}
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          errorMessage={errorMessage}
        />
        <EventExplainInput
          explain={explain}
          setExplain={setExplain}
          explainRef={explainRef}
          errorMessage={errorMessage}
        />
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
