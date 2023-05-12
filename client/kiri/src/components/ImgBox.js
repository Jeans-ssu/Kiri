import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setOcrMode, setOcrResult } from 'store/modules/ocrSlice';
import styled from 'styled-components';

const GoogleVisionApiKey = process.env.REACT_APP_API_KEY;

const ImgBox = ({ el, idx, deleteImg, imageUrl }) => {
  const dispatch = useDispatch();

  const analyzeImage = async () => {
    try {
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
      //   setMessage(
      //     responseJson.responses[0].fullTextAnnotation.text +
      //       '\n여기서 주최, 장소, 일시, 대학교, 연락처, 시작시간, 끝나는 시간, 설명 을 JSON 형식으로 알려줘'
      //   );
      dispatch(
        setOcrResult(
          responseJson.responses[0].fullTextAnnotation.text +
            '\n여기서 주최, 장소, 일시, 대학교, 연락처, 시작시간, 끝나는 시간, 설명 을 JSON 형식으로 알려줘'
        )
      );
      dispatch(setOcrMode(true));
    } catch (error) {
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
