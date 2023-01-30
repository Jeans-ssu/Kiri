import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  nickName: '',
  email: '',
  interest: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
