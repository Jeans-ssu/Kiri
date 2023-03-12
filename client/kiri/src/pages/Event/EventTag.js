import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setTagMode, setTagWord } from 'store/modules/tagSlice';

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
    console.log('resultcurrent', result.current);
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
      />
      <FilterLable
        className={check ? 'focused' : ''}
        onClick={lineCheck}
        htmlFor={tag}
      >
        {tag}
      </FilterLable>
    </>
  );
};

const FilterLable = styled.label`
  text-align: left;
  cursor: pointer;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 15px;
  margin: 0 8px 0px 0;
  background-color: #eaeaea;

  &:after {
    opacity: 0;
    color: #59b89d;
    font-weight: 700;
    width: 40px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
`;

const FilterInput = styled.input`
  appearance: none;
  &:checked + ${FilterLable} {
    color: #59b89d;
    font-weight: 700;
    width: 40px;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
    :after {
      opacity: 1;
    }
  }

  &:focus + ${FilterLable} {
    &:before {
      outline: 2px solid blue;
    }
  }
`;
