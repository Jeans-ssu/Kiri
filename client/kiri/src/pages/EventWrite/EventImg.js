import styled from 'styled-components';
import { useRef, useState } from 'react';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';
import ImgBox from 'components/ImgBox';

const EventImg = ({
  img,
  setImg,
  imgList,
  setImgList,
  errorMessage,
  setIsOpenSpinner,
}) => {
  const [blob, setBlob] = useState(new FormData());
  const imgArr = useRef([]);
  const accessToken = useSelector(selectAccessToken);
  setAuthHeader(accessToken);

  const [file, setFile] = useState();

  const uploadImg = (formData) => {
    axios
      .post('/api/posts/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setImgList(res.data);
      })
      .catch((err) => console.log('ERROR: ', err));
  };

  const addImage = (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      imgArr.current.push(e.target.files[i]);
    }
    for (let i = 0; i < imgArr.current.length; i++) {
      formData.append('files', imgArr.current[i]);
    }
    uploadImg(formData);

    const nowSelectImageList = e.target.files;
    console.log('nowselescs', img);
    const nowImageUrlList = [...img];
    const blobList = [...blob];
    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      const blobUrl = document.querySelector('input[type=file]').files[i];
      console.log('bloburl', blobUrl);
      nowImageUrlList.push(nowImageUrl);
      blobList.push(blobUrl);
    }
    if (nowImageUrlList.length > 10) {
      setImg(nowImageUrlList.slice(0, 10));
      setBlob(blobList.slice(0, 10));
      alert('이미지는 최대 10개만 첨부 가능합니다.');
    } else {
      setImg(nowImageUrlList);
      setBlob(blobList);
    }

    setFile(e.target.files);
  };

  const fileInput = useRef(null);

  const deleteImg = (idx) => {
    img.splice(idx, 1);
    imgList.splice(idx, 1);
    imgArr.current.splice(idx, 1);
    setImg([...img]);
    setImgList([...imgList]);
  };

  return (
    <EventEtcInputContainer>
      <EtcContainer>
        <EtcHeader>
          이미지 <span className="green">*</span>
        </EtcHeader>
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
        <ErrorMessageBox> {errorMessage.imgErrorMessage}</ErrorMessageBox>
      </EtcContainer>
      <PreviewBox>
        <GridImageBox>
          {img.length > 0
            ? img.length >= 6
              ? img?.map((el, idx) => {
                  return (
                    <ImgBox
                      key={idx}
                      el={el}
                      idx={idx}
                      deleteImg={deleteImg}
                      file={file}
                      setIsOpenSpinner={setIsOpenSpinner}
                      imglength={img.length}
                    />
                  );
                })
              : img?.map((el, idx) => {
                  return (
                    <ImgBox
                      blob={blob}
                      key={idx}
                      el={el}
                      idx={idx}
                      deleteImg={deleteImg}
                      file={file}
                      setIsOpenSpinner={setIsOpenSpinner}
                      imglength={img.length}
                    />
                  );
                })
            : ''}
        </GridImageBox>
      </PreviewBox>
    </EventEtcInputContainer>
  );
};

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  @media screen and (max-width: 767px) {
    margin: 15px auto 0 auto;
    width: 90%;
  }
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
  @media screen and (max-width: 767px) {
    margin-left: 0px;
    width: 82vw;
    .X {
      font-size: 15px;
    }
  }
`;

const GridImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 18px 18px;
  @media screen and (max-width: 767px) {
    grid-gap: 10px 10px;
    grid-template-columns: repeat(4, 100px);
  }
  @media screen and (max-width: 440px) {
    grid-template-columns: repeat(3, 100px);
  }
`;

const EtcContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

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
    @media screen and (max-width: 767px) {
      width: 60px;
      height: 24px;
      font-size: 11px;
    }
  }
`;

const EtcHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
  .green {
    color: ${({ theme }) => theme.colors.mainColor};
    font-size: 18px;
    margin-left: 3px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

export default EventImg;
