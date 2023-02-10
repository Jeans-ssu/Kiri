import { useState } from 'react';
import styled from 'styled-components';

export const EventTag = ({ tag, selectNavHandler, idx }) => {
  const [check, setCheck] = useState(false);

  const lineCheck = () => {
    setCheck(!check);
  };

  //   const removeTags = (indexToRemove) => {
  //     tags.splice(indexToRemove, 1);
  //     setTags([...tags]);
  //   };

  const [filterState, setFilterState] = useState({
    Tags: {
      Festival: false,
      Exhibit: false,
      Performance: false,
      Lecture: false,
      Competition: false,
      Extra: false,
    },
  });

  const handleFilter = (e) => {
    const Filter = e.target.id;
    setFilterState({
      Tags: { ...filterState.Tags, [Filter]: !filterState.Tags[Filter] },
    });
    console.log('filterstate', filterState);
  };

  return (
    <>
      <FilterInput
        type="checkbox"
        id={tag}
        onClick={() => {
          selectNavHandler(idx);
          handleFilter;
        }}
      />
      <FilterLable
        className={check ? 'focused' : ''}
        onClick={lineCheck}
        htmlFor={tag}
      >
        {tag}
        {/* {check ? (
          <button className="tag-close-icon" onClick={() => removeTags(idx)}>
            x
          </button>
        ) : (
          ''
        )} */}
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
