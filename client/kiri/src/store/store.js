import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/modules/counterSlice';

export const rootReducer = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
