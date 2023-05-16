import styled from 'styled-components';
import { useRef, useState } from 'react';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { selectAccessToken } from 'store/modules/authSlice';
import { setAuthHeader } from 'api/setAuthHeader';
import ImgBox from 'components/ImgBox';

const EventEtcInput = ({
  link,
  setLink,
  img,
  setImg,
  imgList,
  setImgList,
  errorMessage,
  setIsOpenSpinner,
}) => {
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
    const nowImageUrlList = [...img];
    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageUrlList.push(nowImageUrl);
    }
    if (nowImageUrlList.length > 10) {
      setImg(nowImageUrlList.slice(0, 10));
      alert('이미지는 최대 10개만 첨부 가능합니다.');
    } else {
      setImg(nowImageUrlList);
    }

    setFile(e.target.files);
  };

  const handleChangeInput = (e) => {
    setLink(e.target.value);
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
        <EtcHeader>참고링크</EtcHeader>
        <LinkInput type="url" value={link} onChange={handleChangeInput} />
      </EtcContainer>
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
              ? img.map((el, idx) => {
                  return (
                    <ImgBox
                      key={idx}
                      el={el}
                      idx={idx}
                      deleteImg={deleteImg}
                      file={file}
                      setIsOpenSpinner={setIsOpenSpinner}
                    />
                  );
                })
              : img.map((el, idx) => {
                  return (
                    <ImgBox
                      key={idx}
                      el={el}
                      idx={idx}
                      deleteImg={deleteImg}
                      file={file}
                      setIsOpenSpinner={setIsOpenSpinner}
                    />
                  );
                })
            : ''}
        </GridImageBox>
      </PreviewBox>
    </EventEtcInputContainer>
  );
};

const ErrorMessageBox = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const EventEtcInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    margin: 15px auto;
    width: 90%;
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
const LinkInput = styled.input`
  width: 350px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 3px;
  outline: none;

  @media screen and (max-width: 767px) {
    width: 65vw;
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
    margin-left: 10px;
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
    grid-gap: 18px 18px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export default EventEtcInput;
