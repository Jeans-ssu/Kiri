import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const TOKEN_TIME_OUT = 24 * 60 * 60 * 3 * 1000; //3일

const initialState = {
  accessToken: null,
  authenticated: false,
  expireTime: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;

export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
