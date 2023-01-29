import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  nickName: '',
  email: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
