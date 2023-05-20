import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOcrMode, setOcrResult } from 'store/modules/ocrSlice';
import styled from 'styled-components';

const GoogleVisionApiKey = process.env.REACT_APP_API_KEY;
const NodeServer = process.env.REACT_APP_NODE;

const ImgBox = ({ el, idx, deleteImg, file, setIsOpenSpinner }) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(null);

  const targetfile = file[idx];
  const reader = new FileReader();
  reader.readAsDataURL(targetfile);
  reader.onload = () => {
    setImageUrl(reader.result);
  };
  reader.onerror = (error) => {
    console.log(error);
  };

  const analyzeImage = async () => {
    try {
      setIsOpenSpinner(true);
      const body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION' }],
            image: {
              content: imageUrl.split(',')[1],
            },
          },
        ],
      });
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GoogleVisionApiKey}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        }
      );
      const responseJson = await response.json();
      console.log(
        'responsetext',
        responseJson.responses[0].fullTextAnnotation.text
      );
      const message =
        responseJson.responses[0].fullTextAnnotation.text +
        '\n여기서 제목, 이메일, 주최, 장소, 시작날짜, 끝나는날짜, 대학교, 연락처, 시작시간, 끝나는시간, 핵심키워드5개를 JSON 형식으로 알려줘. 이때 키 값은 host, email, title, location, startDate, endDate, university, contact, startTime, endTime, keyword 이걸로 해야해. 날짜 형식은 "yyyy-MM-dd" 이 형식으로 줘야해.';

      fetch(NodeServer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setOcrMode(false));
          const first = data.message.indexOf('{');
          const end = data.message.indexOf('}');
          const obj = data.message.slice(first, end + 1);
          dispatch(setOcrResult(obj));
          dispatch(setOcrMode(true));
          setIsOpenSpinner(false);
        });
    } catch (error) {
      setIsOpenSpinner(false);
      console.log(error);
    }
  };

  return (
    <GridBox key={idx}>
      <TopBox>
        <GridImagePreview key={idx} alt="img" src={el} />
        <GridRemoveBtn onClick={() => deleteImg(idx)}>
          <Icon className="X" icon="ic:round-close" />
        </GridRemoveBtn>
      </TopBox>
      <BottomBox>
        <OcrBox>
          <OcrBtn onClick={analyzeImage}>자동 입력 하기</OcrBtn>
        </OcrBox>
      </BottomBox>
    </GridBox>
  );
};

const TopBox = styled.div`
  display: flex;
`;

const BottomBox = styled.div``;

const OcrBox = styled.div`
  width: 135px;
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;

const OcrBtn = styled.div`
  color: #759cff;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    color: #4f80ff;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const GridBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridImagePreview = styled.img`
  width: 135px;
  height: 135px;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
  @media screen and (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`;

const GridRemoveBtn = styled.button`
  border: none;
  background: transparent;
  display: flex;
  cursor: pointer;
  margin-left: 2px;
  padding: 0;
  @media screen and (max-width: 767px) {
    margin-left: 0px;
  }
`;

export default ImgBox;