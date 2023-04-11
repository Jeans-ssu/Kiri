import { useEffect, useRef, useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';
import EventInfoInput from './EventInfoInput';
import EventExplainInput from './EventExplainInput';
import EventEtcInput from './EventEtcInput';
import axios from '../../api/axios';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';
import { useSelector } from 'react-redux';
import PostModal from 'components/PostModal';

const EventWritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 60px;
  @media screen and (max-width: 767px) {
    min-width: 300px;
    width: 80%-40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    margin: auto;
  }
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

const EventEditPage = () => {
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const url = document.location.href;
  let postID;
  if (url.slice(-7, -6) === '/') {
    // 10 미만
    postID = url.slice(-6, -5);
  } else {
    postID = url.slice(-7, -5);
  }

  useEffect(() => {
    BasePost();
  }, []);

  const [base, setBase] = useState();
  const BasePost = async () => {
    await axios.get(`/posts/read/${postID}`).then((res) => {
      setBase(res.data);
      setTitle(res.data.title);
      setInfo({
        host: res.data.organizer,
        tel: res.data.contactNumber,
        email: res.data.email,
        region: res.data.local, //지역
        univ: res.data.school, //학교
        type: res.data.event, //유형
        startDate: res.data.startPostTime.slice(0, 10),
        endDate: res.data.finishPostTime.slice(0, 10),
        startTime: res.data.startPostTime.slice(11, 16),
        endTime: res.data.finishPostTime.slice(11, 16),
        location: res.data.place,
      });
      setLink(res.data.link);
      setExplain(res.data.content);
      setImg(res.data.savedImgList);
      console.log('baseData,current', base);
    });
  };

  const [postid, setPostID] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [info, setInfo] = useState({
    host: base?.organizer,
    tel: base?.contactNumber,
    email: base?.email,
    region: base?.local, //지역
    univ: base?.school, //학교
    type: base?.event, //유형
    startDate: base?.startPostTime.slice(0, 10),
    endDate: base?.finishPostTime.slice(0, 10),
    startTime: base?.startPostTime.slice(11, 16),
    endTime: base?.finishPostTime.slice(11, 16),
    location: base?.place,
  });
  console.log('info', info);
  const [explain, setExplain] = useState('');
  const [link, setLink] = useState('');
  const [img, setImg] = useState(new FormData());
  const [imgList, setImgList] = useState();
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

  const getImageID = () => {
    const imgarr = [];
    console.log('imgList', imgList);
    for (let i = 0; imgList?.length > i; i++) {
      imgarr.push(imgList[i].image_id);
    }
    console.log('imgarr', imgarr);
    return imgarr;
  };

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
      const imgarr = getImageID();
      console.log('imaarr', imgarr);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('scrap_count', 0);
      formData.append('email', info.email);
      formData.append('content', explain);
      formData.append('event', info.type);
      formData.append('local', info.region);
      formData.append('school', info.univ);
      formData.append('place', info.location);
      formData.append('organizer', info.host);
      formData.append('link', link);
      if (imgarr.length === 1) {
        formData.append('imageIdList[]', [Number(imgarr)]);
      } else {
        for (let i = 0; i < imgarr.length; i++) {
          formData.append('imageIdList[]', Number(imgarr[i]));
        }
      }
      formData.append('contactNumber', info.tel);
      formData.append(
        'startPostTime',
        info.startDate + ' ' + info.startTime + ':00'
      );
      formData.append(
        'finishPostTime',
        info.endDate + ' ' + info.endTime + ':00'
      );
      axios
        .post(`/api/posts/${postID}`, formData)
        .then((res) => {
          setPostID(res.data.post_id);
          setIsSuccess(true);
        })
        .catch((err) => console.error(err));
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
          imgList={imgList}
          setImgList={setImgList}
        />
        <BtnContainer>
          <WriteBtn onClick={handleClickWriteBtn}>글쓰기</WriteBtn>
        </BtnContainer>
        <PostModal
          text={'수정'}
          postid={postid}
          isOpen={isSuccess}
          setIsOpen={setIsSuccess}
        />
      </EventWritePageContainer>
    </PageContainer>
  );
};

export default EventEditPage;
