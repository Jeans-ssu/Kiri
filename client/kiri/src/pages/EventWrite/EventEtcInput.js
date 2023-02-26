import styled from 'styled-components';
import { useRef, useState } from 'react';

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
`;

const ImgPreview = styled.img`
  width: 50px;
  height: 50px;
`;

const EventEtcInput = ({ link, setLink, img, setImg }) => {
  const [image, setImage] = useState([]);

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;
    const nowImageUrlList = [...image];
    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageUrlList.push(nowImageUrl);
    }
    setImage(nowImageUrlList);
  };

  const handleChangeInput = (e) => {
    setLink(e.target.value);
  };

  const fileInput = useRef(null);

  const handleChangeImgInput = (e) => {
    setImg({ ...img, image: e.target.files[0] });
    console.log('image', image);
  };

  console.log('image', image);

  return (
    <EventEtcInputContainer>
      <EtcContainer>
        <EtcHeader>참고링크</EtcHeader>
        <LinkInput type="url" value={link} onChange={handleChangeInput} />
      </EtcContainer>
      <EtcContainer>
        <EtcHeader>이미지</EtcHeader>
        <label htmlFor="input-file" onChange={addImage}>
          <ImgInput
            id="input-file"
            type="file"
            name="file"
            accept="image/*"
            ref={fileInput}
            multiple="multiple"
            onChange={handleChangeImgInput}
          />
        </label>
      </EtcContainer>
      <PreviewBox>
        {image.length > 0
          ? image.map((el, idx) => {
              return <ImgPreview key={idx} alt="img" src={el} />;
            })
          : ''}
      </PreviewBox>
    </EventEtcInputContainer>
  );
};

export default EventEtcInput;
