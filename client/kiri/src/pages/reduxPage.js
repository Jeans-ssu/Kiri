import PageContainer from 'containers/PageContainer';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from 'store/modules/counterSlice';
import { useState } from 'react';

const ReduxPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReduxPage = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(2);

  const handleChangeInput = (e) => {
    setIncrementAmount(e.target.value);
  };

  return (
    <PageContainer header footer>
      <ReduxPageContainer>
        <div>{count}</div>
        <div>
          <input
            type="number"
            value={incrementAmount}
            onChange={handleChangeInput}
          ></input>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
          <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
            increase by amount
          </button>
          <button onClick={() => dispatch(incrementAsync(incrementAmount))}>
            Add Async
          </button>
        </div>
      </ReduxPageContainer>
    </PageContainer>
  );
};

export default ReduxPage;
