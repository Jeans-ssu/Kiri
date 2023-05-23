import { useEffect, useRef, useState } from 'react';
import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';
import EventTitleInput from './EventTitleInput';
import EventInfoInput from './EventInfoInput';
import EventExplainInput from './EventExplainInput';
import { EventTagInput } from './EventTagInput';
import EventEtcInput from './EventEtcInput';
import axios from '../../api/axios';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';
import { useDispatch, useSelector } from 'react-redux';
import PostModal from 'components/PostModal';
import { setOcrResult } from 'store/modules/ocrSlice';
import { Spinner } from 'components/spinner/spinner';
import EventImg from './EventImg';
import { selectIsLogin } from 'store/modules/userSlice';
import NeedLoginModal from 'components/NeedLoginModal';

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
    padding: 0px;
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

const EventWritePage = () => {
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsLogin);

  const [isOpenSpinner, setIsOpenSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(setOcrResult(''));
  }, []);

  const [isSuccess, setIsSuccess] = useState(false);
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
    startTime: '00:00',
    endTime: '00:00',
    location: '',
  });
  const [postid, setPostID] = useState();
  const [explain, setExplain] = useState('');
  const [tag, setTag] = useState([]);
  const [link, setLink] = useState('');
  const [img, setImg] = useState(new FormData());
  const [imgList, setImgList] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    titleErrorMessage: '',
    hostErrorMessage: '',
    regionErrorMessage: '',
    univErrorMessage: '',
    typeErrorMessage: '',
    startDateErrorMessage: '',
    endDateErrorMessage: '',
    explainErrorMessage: '',
    imgErrorMessage: '',
  });

  const getImageID = () => {
    const imgarr = [];
    for (let i = 0; imgList.length > i; i++) {
      imgarr.push(imgList[i].image_id);
    }
    return imgarr;
  };

  const titleRef = useRef();
  const hostRef = useRef();
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
      info.region === '선택' ||
      info.univ === '' ||
      info.type === '선택' ||
      info.startDate === '' ||
      info.endDate === '' ||
      explain === '' ||
      img.length === 0 ||
      img.length === undefined
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
      if (img.length === 0 || img.length === undefined) {
        setErrorMessage((prev) => {
          return { ...prev, imgErrorMessage: '이미지를 첨부해주세요.' };
        });
      } else {
        setErrorMessage((prev) => {
          return { ...prev, imgErrorMessage: '' };
        });
      }
    } else {
      const imgarr = getImageID();
      const formData = new FormData();
      const tagstring = tag?.toString();
      const tagarr = tagstring?.split(',');
      formData.append('title', title);
      formData.append('scrap_count', 0);
      formData.append('email', info.email);
      formData.append('content', explain);
      formData.append('event', info.type);
      formData.append('local', info.region);
      formData.append('school', info.univ);
      formData.append('place', info.location);
      formData.append('organizer', info.host);
      for (let i = 0; i < tagarr?.length; i++) {
        formData.append('tagList[]', tagarr[i]);
      }
      formData.append('link', link);
      if (imgarr.length === 1) {
        formData.append('imageIdList[]', [Number(imgarr)]);
      } else {
        for (let i = 0; i < imgarr.length; i++) {
          formData.append('imageIdList[]', Number(imgarr[i]));
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
          .post('/api/posts', formData)
          .then((res) => {
            setPostID(res.data.post_id);
            setIsSuccess(true);
          })
          .catch((err) => console.error(err));
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
        .post('/api/posts', formData)
        .then((res) => {
          setPostID(res.data.post_id);
          setIsSuccess(true);
        })
        .catch((err) => {
          setIsOpen(true);
          console.error(err);
        });
    }
  };
  return (
    <PageContainer header footer margin_bottom={false} page={'event/write'}>
      <EventWritePageContainer className="pagecontainer">
        <Spinner isOpen={isOpenSpinner} />
        <EventTitleInput
          title={title}
          setTitle={setTitle}
          titleRef={titleRef}
          errorMessage={errorMessage}
        />
        <EventImg
          img={img}
          setImg={setImg}
          imgList={imgList}
          setImgList={setImgList}
          errorMessage={errorMessage}
          setIsOpenSpinner={setIsOpenSpinner}
        />
        <EventInfoInput
          info={info}
          setInfo={setInfo}
          hostRef={hostRef}
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
        <EventTagInput setTag={setTag} />
        <EventEtcInput
          link={link}
          setLink={setLink}
          img={img}
          setImg={setImg}
          imgList={imgList}
          setImgList={setImgList}
          errorMessage={errorMessage}
          setIsOpenSpinner={setIsOpenSpinner}
        />
        <BtnContainer>
          <WriteBtn onClick={handleClickWriteBtn}>글쓰기</WriteBtn>
        </BtnContainer>
        {isLogin ? (
          <PostModal
            text={'등록'}
            postid={postid}
            isOpen={isSuccess}
            setIsOpen={setIsSuccess}
          />
        ) : (
          <NeedLoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </EventWritePageContainer>
    </PageContainer>
  );
};

export default EventWritePage;
