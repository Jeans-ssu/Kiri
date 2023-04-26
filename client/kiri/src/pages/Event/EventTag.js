import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setTagMode, setTagWord } from 'store/modules/tagSlice';
import theme from 'styles/theme';

const { yellow, blue, pink, orange, purple2, green_1 } = theme.colors;

export const EventTag = ({ tag, result, getEvent }) => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const lineCheck = () => {
    setCheck(!check);
  };

  function getCheckboxValue() {
    const query = 'input[name="event"]:checked';
    const selectedEls = document.querySelectorAll(query);
    let res = '';
    selectedEls.forEach((el) => {
      res += el.value + ',';
    });
    result.current = res;
    dispatch(setTagWord(result.current.slice(0, -1)));
    dispatch(setTagMode(true));
  }

  return (
    <>
      <FilterInput
        name="event"
        onClick={() => {
          getCheckboxValue();
          getEvent();
        }}
        type="checkbox"
        value={tag}
        id={tag}
        tag={tag}
        className={`${
          tag === '강연'
            ? 'lecture'
            : tag === '기타'
            ? ' etc'
            : tag === '공연'
            ? 'performance'
            : ''
        }`}
      />
      <FilterLable
        className={`${check ? 'focused ' : ''} 
        ${
          tag === '강연'
            ? 'lecture'
            : tag === '기타'
            ? ' etc'
            : tag === '공연'
            ? 'performance'
            : ''
        }        `}
        onClick={lineCheck}
        htmlFor={tag}
        tag={tag}
      >
        {tag}
      </FilterLable>
    </>
  );
};

const FilterLable = styled.label`
  text-align: left;
  cursor: pointer;
  width: 34px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  font-size: 12px;
  list-style: none;
  border-radius: 15px;
  margin: 0 2px 0px 0;
  background-color: #eaeaea;

  &:after {
    opacity: 0;
    color: #59b89d;
    color: white;
  }

  @media screen and (max-width: 767px) {
    margin: 0 0px 4px 0;
    width: 30px;
    height: 24px;
    font-size: 12px;
  }
`;

const FilterInput = styled.input`
  appearance: none;
  &:checked + ${FilterLable} {
    width: 34px;
    background-color: ${(props) =>
      props.tag === '축제'
        ? yellow
        : props.tag === '전시'
        ? blue
        : props.tag === '공연'
        ? pink
        : props.tag === '강연'
        ? orange
        : props.tag === '대회'
        ? purple2
        : green_1};
    color: white;
    :after {
      opacity: 1;
    }
    @media screen and (max-width: 767px) {
      margin: 0 0px 4px 0;
      width: 30px;
      height: 24px;
      font-size: 12px;
    }
  }

  &:focus + ${FilterLable} {
    &:before {
      outline: 2px solid blue;
    }
  }
  @media screen and (max-width: 374px) {
    .contest {
      margin-left: 100px;
    }
  }
`;
