import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOcrMode, setOcrResult } from 'store/modules/ocrSlice';
import styled from 'styled-components';

const GoogleVisionApiKey = process.env.REACT_APP_API_KEY;
const NodeServer = process.env.REACT_APP_NODE;

const ImgBox = ({ blob, el, idx, deleteImg, setIsOpenSpinner }) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(null);

  const analyzeImage = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(blob[idx]);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };

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
      const message =
        responseJson.responses[0].fullTextAnnotation.text +
        '\n여기서 제목, 주최, 장소(in korean), 시작날짜, 끝나는날짜, 연락처, 시작시간, 끝나는시간, 핵심키워드5개(in korean)를 JSON 형식으로 알려줘. 이때 키 값은 host, title, location, startDate, endDate, contact, startTime, endTime, keyword 이걸로 해야해. 날짜 형식은 "yyyy-MM-dd", 시간 형식은 "hh:mm" 이런 형식으로 줘야해.';

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
          <OcrBtn value={idx} onClick={analyzeImage}>
            자동 입력 하기
          </OcrBtn>
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
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;

const OcrBtn = styled.div`
  color: #759cff;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  margin-right: 17px;

  &:hover {
    cursor: pointer;
    color: #4f80ff;
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
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
    width: 100px;
    height: 100px;
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
