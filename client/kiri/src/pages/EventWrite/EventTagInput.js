import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOcrMode, selectOcrResult } from 'store/modules/ocrSlice';

export const EventTagInput = ({ setTag }) => {
  const [tagList, setTagList] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const ocrResult = useSelector(selectOcrResult);
  const ocrMode = useSelector(selectOcrMode);

  useEffect(() => {
    if (ocrResult.length !== 0) {
      setTagList(JSON.parse(ocrResult)?.keywords);
      setTag(JSON.parse(ocrResult)?.keywords);
    }
  }, [ocrMode]);

  const handleChangeTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if ((e.key === 'Enter' || e.charCode === 32) && tagList?.length <= 4) {
      if (tagInput !== '') {
        setTagList([...tagList, tagInput]);
        setTag([...tagList, tagInput]);
        setTagInput('');
      }
    }
  };

  const handleClickTag = (item) => {
    const filteredTagList = tagList.filter((el) => {
      return el !== item;
    });
    setTagList(filteredTagList);
    setTag(filteredTagList);
  };

  return (
    <EventTagInputContainer>
      <TagHeader>
        <div>태그</div>
        <div className="maximum">(최대 5개)</div>
      </TagHeader>
      <TagsContainer>
        <TagInput
          placeholder="태그를 입력하세요"
          maxLength={15}
          value={tagInput}
          onChange={handleChangeTagInput}
          onKeyPress={handleOnKeyPress}
        />
        {tagList?.map((el, idx) => {
          return (
            <Tag
              key={idx}
              onClick={() => {
                handleClickTag(el);
              }}
            >
              {el}
            </Tag>
          );
        })}
      </TagsContainer>
    </EventTagInputContainer>
  );
};

const EventTagInputContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  @media screen and (max-width: 767px) {
    margin: 15px auto 5px;
    width: 90%;
  }
`;

const TagHeader = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  width: 70px;
  margin-top: 7px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
  div.maximum {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 12px;
    @media screen and (max-width: 767px) {
      font-size: 10px;
    }
  }
`;

const TagsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;
`;

const TagInput = styled.input`
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  width: 120px;
  padding-bottom: 10px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const Tag = styled.button`
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.darkgray};
  border: 1px solid ${({ theme }) => theme.colors.mainColor};

  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;
