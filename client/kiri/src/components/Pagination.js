import { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ totalPosts, page, setPage }) => {
  const paginationLimit = 10;
  const pageCount = Math.ceil(totalPosts / paginationLimit);
  const pageNumberarr = [];
  const [currpage, setCurrPage] = useState(page);
  for (let i = 0; i < pageCount; i++) {
    pageNumberarr.push(i + 1);
  }
  const firstNum = currpage - (currpage % 5) + 1;
  const lastNum = currpage - (currpage % 5) + 5;

  return (
    <Container>
      <BoxContainer>
        <div className="leftBox">
          <ArrowButton
            onClick={() => {
              setPage(page - 1);
              setCurrPage(page - 2);
            }}
            disabled={page === 1}
          >
            <MdKeyboardArrowLeft />
          </ArrowButton>
        </div>
        <div className="numberbox">
          <NumberButton
            onClick={() => setPage(firstNum)}
            className={page === firstNum ? 'page' : null}
          >
            {firstNum}
          </NumberButton>
          {pageCount < 5
            ? pageCount === 1
              ? ''
              : Array(pageCount - 1)
                  .fill()
                  .map((_, i) => {
                    if (i <= 2) {
                      return (
                        <NumberButton
                          key={i + 1}
                          onClick={() => setPage(firstNum + 1 + i)}
                          className={page === firstNum + 1 + i ? 'page' : null}
                        >
                          {firstNum + 1 + i}
                        </NumberButton>
                      );
                    } else if (i >= 3) {
                      return (
                        <NumberButton
                          key={i + 1}
                          onClick={() => setPage(lastNum)}
                          className={page === lastNum ? 'page' : null}
                        >
                          {lastNum}
                        </NumberButton>
                      );
                    }
                  })
            : Array(4)
                .fill()
                .map((_, i) => {
                  if (i <= 2) {
                    return (
                      <NumberButton
                        key={i + 1}
                        onClick={() => setPage(firstNum + 1 + i)}
                        className={page === firstNum + 1 + i ? 'page' : null}
                      >
                        {firstNum + 1 + i}
                      </NumberButton>
                    );
                  } else if (i >= 3) {
                    return (
                      <NumberButton
                        key={i + 1}
                        onClick={() => setPage(lastNum)}
                        className={page === lastNum ? 'page' : null}
                      >
                        {lastNum}
                      </NumberButton>
                    );
                  }
                })}
        </div>
        <div className="rightBox">
          <ArrowButton
            onClick={() => {
              setPage(page + 1);
              setCurrPage(page);
            }}
            disabled={page === pageCount}
          >
            <MdKeyboardArrowRight />
          </ArrowButton>
        </div>
      </BoxContainer>
    </Container>
  );
};

const Container = styled.div`
  .page {
    //background-color: #d9d9d9;
    //border-radius: 50%;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
  }

  .numberbox {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
`;

const ArrowButton = styled.button`
  font-size: 20px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.mainColor};
  border: none;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  font-weight: 600;
`;

const NumberButton = styled.button`
  width: 30px;
  height: 30px;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

export default Pagination;
