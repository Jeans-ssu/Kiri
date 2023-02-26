import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';

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
    font-size: 15px;
  }
`;

const ImgContainter = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin-right: 30px;
`;

const ImgPreview = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50, 50);
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  left: 65px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const EventEtcInput = ({ link, setLink }) => {
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
        {image.length > 0
          ? image.map((el, idx) => {
              return (
                <ImgContainter key={idx}>
                  <ImgPreview key={idx} alt="img" src={el} />
                  <DeleteButton onClick={() => deleteImg(idx)}>
                    <Icon className="X" icon="ic:round-close" />
                  </DeleteButton>
                </ImgContainter>
              );
            })
          : ''}
      </PreviewBox>
    </EventEtcInputContainer>
  );
};

export default EventEtcInput;
