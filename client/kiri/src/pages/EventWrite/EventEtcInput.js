import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const EventEtcInput = ({ link, setLink }) => {
  const [image, setImage] = useState([]);

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;
    const nowImageUrlList = [...image];
    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageUrlList.push(nowImageUrl);
      console.log('urllist', nowImageUrlList);
      console.log('length', nowImageUrlList.length);
    }
    if (nowImageUrlList.length > 10) {
      console.log('length 10 이상임');
      setImage(nowImageUrlList.slice(0, 10));
      alert('이미지는 최대 10개만 첨부 가능합니다.');
    } else {
      setImage(nowImageUrlList);
    }
  };

  const handleChangeInput = (e) => {
    setLink(e.target.value);
  };

  const fileInput = useRef(null);

  const deleteImg = (idx) => {
    image.splice(idx, 1);
    setImage([...image]);
    console.log('delete', image);
  };

  return (
    <EventEtcInputContainer>
      <EtcContainer>
        <EtcHeader>참고링크</EtcHeader>
        <LinkInput type="url" value={link} onChange={handleChangeInput} />
      </EtcContainer>
      <EtcContainer>
        <EtcHeader>이미지</EtcHeader>
        <label className="label" htmlFor="input-file">
          파일 선택
        </label>
        <ImgInput
          id="input-file"
          type="file"
          name="file"
          accept="image/*"
          ref={fileInput}
          multiple="multiple"
          onChange={addImage}
          style={{ display: 'none' }}
        />
      </EtcContainer>
      <PreviewBox>
        <GridImageBox>
          {image.length > 0
            ? image.length >= 6
              ? image.map((el, idx) => {
                  return (
                    <GridBox key={idx}>
                      <GridImagePreview key={idx} alt="img" src={el} />
                      <GridRemoveBtn onClick={() => deleteImg(idx)}>
                        <Icon className="X" icon="ic:round-close" />
                      </GridRemoveBtn>
                    </GridBox>
                  );
                })
              : image.map((el, idx) => {
                  return (
                    <GridBox key={idx}>
                      <GridImagePreview key={idx} alt="img" src={el} />
                      <GridRemoveBtn onClick={() => deleteImg(idx)}>
                        <Icon className="X" icon="ic:round-close" />
                      </GridRemoveBtn>
                    </GridBox>
                  );
                })
            : ''}{' '}
        </GridImageBox>
      </PreviewBox>
    </EventEtcInputContainer>
  );
};

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 5px;
    font-size: 13px;
    font-weight: 600;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      cursor: pointer;
    }
  }
`;
const EtcHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
`;
const LinkInput = styled.input`
  width: 350px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  outline: none;
`;

const ImgInput = styled.input`
  &::file-selector-button {
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    border-radius: 5px;
    font-size: 11px;
    font-weight: 600;
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      cursor: pointer;
    }
  }
`;

const PreviewBox = styled.div`
  display: flex;
  margin-left: 70px;

  .X {
    font-size: 17px;
  }
`;

const GridImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 18px 18px;
`;

const GridBox = styled.div`
  display: flex;
`;

const GridImagePreview = styled.img`
  width: 135px;
  height: 135px;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const GridRemoveBtn = styled.button`
  border: none;
  background: transparent;
  display: flex;
  cursor: pointer;
  margin-left: 2px;
  padding: 0;
`;

export default EventEtcInput;
